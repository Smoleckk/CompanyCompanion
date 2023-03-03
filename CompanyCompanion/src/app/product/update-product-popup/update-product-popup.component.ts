import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from 'src/app/service/invoice.service';

@Component({
  selector: 'app-update-product-popup',
  templateUrl: './update-product-popup.component.html',
  styleUrls: ['./update-product-popup.component.scss']
})
export class UpdateProductPopupComponent {
  constructor(private builder: FormBuilder, private service: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: any, private toastr: ToastrService,
    private dialog: MatDialogRef<UpdateProductPopupComponent>) {
  }

  editdata: any;
  ngOnInit(): void {
    if (this.data.code != null && this.data.code != '') {
      this.service.GetProductsByCode(this.data.code).subscribe(res => {
        this.editdata = res;
        this.updateform.setValue({ code: this.editdata.code, name: this.editdata.name, price: this.editdata.price, category: this.editdata.category, remarks: this.editdata.remarks });
      })
    }
  }

  updateform = this.builder.group({
    code: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    price: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    remarks: this.builder.control('', Validators.required)
  })
  updateProduct() {
    if (this.updateform.valid) {
      this.service.UpdateProductByCode(this.updateform.value).subscribe(() => {
        this.toastr.success('Updated successfully');
        this.dialog.close()
      })
    } else {
      this.toastr.warning('Please check data')
    }
  }
}
