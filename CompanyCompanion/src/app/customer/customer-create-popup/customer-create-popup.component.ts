import { Component, Inject, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from 'src/app/service/invoice.service';

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

  createform = this.builder.group({
    customerName: ['', Validators.required],
    customerNip: [
      ,
      [
        Validators.required,
        (control: AbstractControl) => {
          const value = control.value;
          if (value && (isNaN(value) || value.toString().length !== 10)) {
            return { invalidNip: true };
          }

          return null;
        },
      ],
    ],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  saveCustomer() {
    if (this.createform && this.createform.valid) {
      this.service.createCustomer(this.createform.value).subscribe(
        () => {
          this.toastr.success(this.translocoService.translate('login.toasterCreatedSuccess'));
          this.dialog.close();
        },
        (error) => {
          this.toastr.error(this.translocoService.translate('login.toasterFailed'));
        }
      );
    } else {
      this.toastr.warning(this.translocoService.translate('login.toasterWrongInputData'));
    }
  }
  getRegon() {
    this.service.getRegon(this.createform.value.customerNip).subscribe(
      (data) => {
        this.createform.patchValue({
          customerName: data.nazwa,
          customerNip: data.nip,
          customerCity: data.ulica + ' ' + data.nrNieruchomosci,
          customerAddress: data.kodPocztowy + ' ' + data.miejscowosc,
        });
        this.toastr.success(this.translocoService.translate('login.regonSuccess'));
        console.log(data);
      },
      (error) => {
        this.toastr.error(this.translocoService.translate('login.toasterFailed'));
      }
    );
  }
}
