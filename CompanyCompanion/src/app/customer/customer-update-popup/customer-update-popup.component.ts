import { Component, Inject, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  editdata: any;
  updateform = this.builder.group({
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

  ngOnInit(): void {
    if (this.data) {
      this.service.getCustomerByCode(this.data).subscribe((res) => {
        this.editdata = res;
        this.updateform.patchValue({
          customerName: this.editdata.customerName,
          customerNip: this.editdata.customerNip,
          customerCity: this.editdata.customerCity,
          customerAddress: this.editdata.customerAddress,
        });
      });
    }
  }

  updateCustomer(): void {
    if (this.updateform.valid) {
      this.service
        .updateCustomerByCode(this.data, this.updateform.value)
        .subscribe(() => {
          this.toastr.success(this.translocoService.translate('toaster.toasterUpdateSuccess'));
          this.dialog.close();
        });
    } else {
      this.toastr.warning(this.translocoService.translate('toaster.toasterWrongInputData'));
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
        this.toastr.success(this.translocoService.translate('toaster.regonSuccess'));
        console.log(data);
      },
      () => {
        this.toastr.error(this.translocoService.translate('toaster.toasterFailed'));
      }
    );
  }
}
