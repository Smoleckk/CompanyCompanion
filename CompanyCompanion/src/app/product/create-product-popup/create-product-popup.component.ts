import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-create-product-popup',
  templateUrl: './create-product-popup.component.html',
  styleUrls: ['./create-product-popup.component.scss'],
})
export class CreateProductPopupComponent implements OnInit {
  editdata: any;
  createform = this.builder.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    vat: ['', Validators.required],
    qty: ['', Validators.required],
    unit: ['', Validators.required],
    category: ['', Validators.required],
    remarks: ['', Validators.required],
  });

  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<CreateProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  saveProduct(): void {
    if (this.createform.valid) {
      this.service.CreateProduct(this.createform.value).subscribe(() => {
        this.toastr.success('Updated successfully');
        this.dialog.close();
      });
    } else {
      this.toastr.warning('Please check data');
    }
  }
}
