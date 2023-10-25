import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-create-product-popup',
  templateUrl: './create-product-popup.component.html',
  styleUrls: ['./create-product-popup.component.scss'],
})
export class CreateProductPopupComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<CreateProductPopupComponent>,
    private readonly translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}

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

  fields = [
    {  label: this.translocoService.translate('productFormHeader.name'), controlName: 'name', cssClass: 'full-width' ,type: 'text'},
    {  label: this.translocoService.translate('productFormHeader.price'), controlName: 'price', cssClass: 'full-width', type: 'number' },
    {  label: this.translocoService.translate('productFormHeader.vat'), controlName: 'vat', cssClass: 'full-width', type: 'number' },
    {  label: this.translocoService.translate('productFormHeader.qty'), controlName: 'qty', cssClass: 'full-width', type: 'number' },
    {  label: this.translocoService.translate('productFormHeader.unit'), controlName: 'unit', cssClass: 'full-width',type: 'text' },
    {  label: this.translocoService.translate('productFormHeader.category'), controlName: 'category', cssClass: 'full-width',type: 'text' },
    {  label: this.translocoService.translate('productFormHeader.remarks'), controlName: 'remarks', cssClass: 'full-width',type: 'text' }
  ];


  saveProduct(): void {
    if (this.createform.valid) {
      this.service.CreateProduct(this.createform.value).subscribe(() => {
        this.toastr.success(this.translocoService.translate('toaster.toasterCreatedSuccess'));
        this.dialog.close();
      });
    } else {
      this.toastr.warning(this.translocoService.translate('toaster.toasterWrongInputData'));
    }
  }
}
