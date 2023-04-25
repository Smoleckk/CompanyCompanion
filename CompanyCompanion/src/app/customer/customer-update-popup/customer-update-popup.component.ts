import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-customer-update-popup',
  templateUrl: './customer-update-popup.component.html',
  styleUrls: ['./customer-update-popup.component.scss']
})
export class CustomerUpdatePopupComponent implements OnInit {
  editdata: any;
  updateform = this.builder.group({
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<CustomerUpdatePopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    if (this.data) {
      this.service
        .getCustomerByCode(this.data)
        .subscribe((res) => {
          this.editdata = res;
          console.log(this.editdata);
          
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
      this.service.updateCustomerByCode(this.data,this.updateform.value).subscribe(() => {
        this.toastr.success('Product updated successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please check the data');
    }
  }
}
