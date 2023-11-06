import { Component, Inject, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerFormData } from 'src/app/models/customerFormData';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-customer-update-popup',
  templateUrl: './customer-update-popup.component.html',
  styleUrls: ['./customer-update-popup.component.scss'],
})
export class CustomerUpdatePopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,
    private readonly translocoService: TranslocoService,
    private dialog: MatDialogRef<CustomerUpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
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

  updateform: FormGroup = this.builder.group({
    customerName: ['', Validators.required],
    customerNip: [, [Validators.required, this.nipValidator]],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  ngOnInit(): void {
    if (this.data) {
      this.service.getCustomerByCode(this.data).subscribe((editData) => {
        this.updateform.patchValue({
          ...editData,
        });
      });
    }
  }

  updateCustomer(): void {
    if (this.updateform.valid) {
      this.service
        .updateCustomerByCode(this.data, this.updateform.value)
        .subscribe(() => {
          this.toastr.success(
            this.translocoService.translate('toaster.toasterUpdateSuccess')
          );
          this.dialog.close();
        });
    } else {
      this.toastr.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }

  getRegon() {
    this.service.getRegon(this.updateform.value.customerNip).subscribe(
      (data) => {
        this.updateform.patchValue({
          customerName: data.nazwa,
          customerNip: data.nip,
          customerCity: data.ulica + ' ' + data.nrNieruchomosci,
          customerAddress: data.kodPocztowy + ' ' + data.miejscowosc,
        });
        this.toastr.success(
          this.translocoService.translate('toaster.regonSuccess')
        );
      },
      () => {
        this.toastr.error(
          this.translocoService.translate('toaster.toasterFailed')
        );
      }
    );
  }
}
