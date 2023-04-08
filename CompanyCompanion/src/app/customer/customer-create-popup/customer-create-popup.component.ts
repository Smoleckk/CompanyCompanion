import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-customer-create-popup',
  templateUrl: './customer-create-popup.component.html',
  styleUrls: ['./customer-create-popup.component.scss']
})
export class CustomerCreatePopupComponent {
  constructor(private builder: FormBuilder, private service: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<CustomerCreatePopupComponent>) {
  }

  editdata: any;
  ngOnInit(): void {
  }

  createform = this.builder.group({
    customerName: this.builder.control('', Validators.required),
    customerNip: this.builder.control('', Validators.required),
    customerCity: this.builder.control('', Validators.required),
    customerAddress: this.builder.control('', Validators.required)
  })

  SaveCustomer() {
    if (this.createform.valid) {
      console.log(this.createform.value);
      
      this.service.CreateCustomer(this.createform.value).subscribe(() => {
        this.toastr.success('Created successfully');
        this.dialog.close()
      })
    } else {
      this.toastr.warning('Please check data')
    }
  }
}