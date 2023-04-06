import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-create-product-popup',
  templateUrl: './create-product-popup.component.html',
  styleUrls: ['./create-product-popup.component.scss']
})
export class CreateProductPopupComponent {
  constructor(private builder: FormBuilder, private service: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<CreateProductPopupComponent>) {
  }

  editdata: any;
  ngOnInit(): void {
  }

  createform = this.builder.group({
    name: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    vat: this.builder.control('', Validators.required),
    qty: this.builder.control('', Validators.required),
    unit: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    remarks: this.builder.control('', Validators.required)
  })
  saveProduct() {
    if (this.createform.valid) {
      console.log(this.createform.value);
      
      this.service.CreateProduct(this.createform.value).subscribe(() => {
        this.toastr.success('Updated successfully');
        this.dialog.close()
      })
    } else {
      this.toastr.warning('Please check data')
    }
  }
}

