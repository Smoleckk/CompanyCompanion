import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-document-product-table',
  templateUrl: './document-product-table.component.html',
  styleUrls: ['./document-product-table.component.scss'],
})
export class DocumentProductTableComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: InvoiceService) {}

  @Input() invoiceForm: any;
  @Input() editInvoiceId: any;
  @Input() invoiceFromProformaId: any;
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getProduct: any;
  breakpoint2: any;
  breakpoint3: any;
  breakpoint4: any;
  breakpoint9: any;
  colspan3: any;

  ngOnInit(): void {
    this.getProducts();
    console.log(this.editInvoiceId);
    
    if (this.editInvoiceId != null || this.invoiceFromProformaId!=null) {

    } else {   
      this.addProduct();
    }
    this.calculateBreakpoints(window.innerWidth);
  }

  onResize(event: any) {
    this.calculateBreakpoints(event.target.innerWidth);
  }

  calculateBreakpoints(windowWidth: number): void {
    this.breakpoint2 = windowWidth <= 850 ? 1 : 2;
    this.breakpoint3 = windowWidth <= 850 ? 1 : 3;
    this.breakpoint4 = windowWidth <= 850 ? 2 : 4;
    this.breakpoint9 = windowWidth <= 850 ? 3 : 9;
    this.colspan3 = windowWidth <= 850 ? 2 : 3;
  }

  get products() {
    return this.invoiceForm.controls['products'] as FormArray;
  }

  addProduct() {
    const detailForm = this.builder.group({
      productCode: [],
      productName: [],
      qty: [],
      unit: [],
      salesPrice: [],
      vat: [],
      bruttoPrice: { value: '', disabled: true },
      nettoPrice: { value: '', disabled: true },
    });
    this.products.push(detailForm);
  }

  deleteProduct(lessonIndex: number) {
    this.products.removeAt(lessonIndex);
    this.summaryCalculation();
  }
  getProducts() {
    this.service.GetProducts().subscribe((res) => {
      this.getProduct = res;
    });
  }

  productChange(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let productCode = this.invoiceProduct.get('productName')?.value;

    this.service.GetProductsByName(productCode).subscribe((res) => {
      let prodData: any;
      prodData = res;
      if (prodData != null) {
        this.invoiceProduct.get('productCode')?.patchValue(prodData.productCode);
        this.invoiceProduct.get('productName')?.patchValue(prodData.name);
        this.invoiceProduct.get('salesPrice')?.patchValue(prodData.price);
        this.invoiceProduct.get('vat')?.patchValue(prodData.vat);
        this.invoiceProduct.get('unit')?.patchValue(prodData.unit);
        this.itemCalculation(index);
      }
    });
  }

  itemCalculation(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let qty = this.invoiceProduct.get('qty')?.value;
    let price = this.invoiceProduct.get('salesPrice')?.value;
    let vat = this.invoiceProduct.get('vat')?.value;
    let totalBrutto = qty * price * (1 + vat / 100);
    let totalNetto = qty * price;
    this.invoiceProduct.get('bruttoPrice')?.patchValue(totalBrutto);
    this.invoiceProduct.get('nettoPrice')?.patchValue(totalNetto);

    this.summaryCalculation();
  }
  summaryCalculation() {
    let array = this.invoiceForm.getRawValue().products;
    let sumTotalBrutto = 0;
    let sumTotalNetto = 0;
    array.forEach((x: any) => {
      sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
    });
    array.forEach((x: any) => {
      sumTotalNetto = sumTotalNetto + x.nettoPrice;
    });

    this.invoiceForm.get('total')?.patchValue(sumTotalBrutto);
    const calculatedTax = sumTotalBrutto - sumTotalNetto;
    this.invoiceForm.get('tax')?.patchValue(calculatedTax.toFixed(2));
    this.invoiceForm.get('netTotal')?.patchValue(sumTotalNetto);
  }
}
