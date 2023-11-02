import { Component, Inject, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { CustomerFormData } from 'src/app/models/customerFormData';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-create-popup',
  templateUrl: './customer-create-popup.component.html',
  styleUrls: ['./customer-create-popup.component.scss'],
})
export class CustomerCreatePopupComponent {
  editdata: any;

  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<CustomerCreatePopupComponent>,
    private readonly translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  nipValidator: ValidatorFn = (control: AbstractControl) => {
    const value = control.value;
    if (!value) {
      return null; // Wartość jest opcjonalna, więc nie ma błędu
    }

    const pattern = /^\d{10}$/; // Wyrażenie regularne na 10 cyfr
    if (!pattern.test(value)) {
      return { invalidNip: true }; // Nieprawidłowy NIP
    }

    return null;
  };

  createForm: FormGroup = this.builder.group({
    customerName: ['', Validators.required],
    customerNip: [, [Validators.required, this.nipValidator]],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  saveCustomer() {
    if (this.createForm && this.createForm.valid) {
      this.service.createCustomer(this.createForm.value).subscribe(
        () => {
          this.toastr.success(this.translocoService.translate('login.toasterCreatedSuccess'));
          this.dialog.close();
        },
        () => {
          this.toastr.error(this.translocoService.translate('login.toasterFailed'));
        }
      );
    } else {
      this.toastr.warning(this.translocoService.translate('login.toasterWrongInputData'));
    }
  }
  getRegon() {
    this.service.getRegon(this.createForm.value.customerNip).subscribe(
      (data) => {
        this.createForm.patchValue({
          customerName: data.nazwa,
          customerNip: data.nip,
          customerCity: data.ulica + ' ' + data.nrNieruchomosci,
          customerAddress: data.kodPocztowy + ' ' + data.miejscowosc,
        });
        this.toastr.success(this.translocoService.translate('login.regonSuccess'));
      },
      () => {
        this.toastr.error(this.translocoService.translate('login.toasterFailed'));
      }
    );
  }
}
