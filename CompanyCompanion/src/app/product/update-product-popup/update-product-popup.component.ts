import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-update-product-popup',
  templateUrl: './update-product-popup.component.html',
  styleUrls: ['./update-product-popup.component.scss'],
})
export class UpdateProductPopupComponent implements OnInit {
  editdata: any;
  updateform = this.builder.group({
    code: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    category: ['', Validators.required],
    remarks: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.code) {
      this.service.GetProductsByCode(this.data.code).subscribe((res) => {
        this.editdata = res;
        this.updateform.patchValue({
          code: this.editdata.code,
          name: this.editdata.name,
          price: this.editdata.price,
          category: this.editdata.category,
          remarks: this.editdata.remarks,
        });
      });
    }
  }

  updateProduct(): void {
    if (this.updateform.valid) {
      this.service.UpdateProductByCode(this.updateform.value).subscribe(() => {
        this.toastr.success('Product updated successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please check the data');
    }
  }
}
