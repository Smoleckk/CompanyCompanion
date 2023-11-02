import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { ProductMagazine } from 'src/app/models/productMagazine';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-update-product-popup',
  templateUrl: './update-product-popup.component.html',
  styleUrls: ['./update-product-popup.component.scss'],
})
export class UpdateProductPopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private productService: ProductService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateProductPopupComponent>,
    private readonly translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  updateform: FormGroup = this.builder.group({
    productMagazineId: ['', Validators.required],
    name: ['', Validators.required],
    price: ['', Validators.required],
    vat: ['', Validators.required],
    qty: ['', Validators.required],
    unit: ['', Validators.required],
    category: ['', Validators.required],
    remarks: ['', Validators.required],
  });
  fields = [
    {
      label: this.translocoService.translate('productFormHeader.name'),
      controlName: 'name',
      cssClass: 'full-width',
      type: 'text',
    },
    {
      label: this.translocoService.translate('productFormHeader.price'),
      controlName: 'price',
      cssClass: 'full-width',
      type: 'number',
    },
    {
      label: this.translocoService.translate('productFormHeader.vat'),
      controlName: 'vat',
      cssClass: 'full-width',
      type: 'number',
    },
    {
      label: this.translocoService.translate('productFormHeader.qty'),
      controlName: 'qty',
      cssClass: 'full-width',
      type: 'number',
    },
    {
      label: this.translocoService.translate('productFormHeader.unit'),
      controlName: 'unit',
      cssClass: 'full-width',
      type: 'text',
    },
    {
      label: this.translocoService.translate('productFormHeader.category'),
      controlName: 'category',
      cssClass: 'full-width',
      type: 'text',
    },
    {
      label: this.translocoService.translate('productFormHeader.remarks'),
      controlName: 'remarks',
      cssClass: 'full-width',
      type: 'text',
    },
  ];

  ngOnInit(): void {
    if (this.data.productMagazineId) {
      this.productService
        .getProductByCode(this.data.productMagazineId)
        .subscribe((editData: ProductMagazine) => {
          this.updateform.patchValue({
            ...editData,
          });
        });
    }
  }

  updateProduct(): void {
    if (this.updateform.valid) {
      this.productService
        .updateProductByCode(this.updateform.value)
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
}
