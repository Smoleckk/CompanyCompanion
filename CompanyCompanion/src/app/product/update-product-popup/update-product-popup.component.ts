import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslocoService } from '@ngneat/transloco';
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
    productMagazineId: ['', Validators.required],
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
    private dialog: MatDialogRef<UpdateProductPopupComponent>,
    private readonly translocoService: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.productMagazineId) {
      this.service
        .GetProductsByCode(this.data.productMagazineId)
        .subscribe((res) => {
          this.editdata = res;
          this.updateform.patchValue({
            productMagazineId: this.editdata.productMagazineId,
            name: this.editdata.name,
            price: this.editdata.price,
            vat: this.editdata.vat,
            qty: this.editdata.qty,
            unit: this.editdata.unit,
            category: this.editdata.category,
            remarks: this.editdata.remarks,
          });
        });
    }
  }

  updateProduct(): void {
    if (this.updateform.valid) {
      this.service.UpdateProductByCode(this.updateform.value).subscribe(() => {
        this.toastr.success(this.translocoService.translate('toaster.toasterUpdateSuccess'));
        this.dialog.close();
      });
    } else {
      this.toastr.warning(this.translocoService.translate('toaster.toasterWrongInputData'));
    }
  }
}
