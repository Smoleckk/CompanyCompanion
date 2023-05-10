import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  createform = this.builder.group({
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  saveCustomer() {
    if (this.createform.valid) {
      this.service.createCustomer(this.createform.value).subscribe(() => {
        this.toastr.success('Created successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please check data');
    }
  }
}
