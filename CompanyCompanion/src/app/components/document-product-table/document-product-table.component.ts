import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InvoiceService } from '../../service/invoice.service';
import { ProductService } from 'src/app/service/product.service';
import { ProductMagazine } from 'src/app/models/productMagazine';
import { Invoice } from 'src/app/models/invoice';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-document-product-table',
  templateUrl: './document-product-table.component.html',
  styleUrls: ['./document-product-table.component.scss'],
})
export class DocumentProductTableComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private productService: ProductService
  ) {}

  @Input() invoiceForm: FormGroup;
  @Input() editInvoiceId: string;
  @Input() invoiceFromProformaId: string;
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getProduct: ProductMagazine[];
  breakpoint2: number;
  breakpoint3: number;
  breakpoint4: number;
  breakpoint9: number;
  colspan3: number;

  ngOnInit(): void {
    this.getProducts();
    if (this.editInvoiceId != null || this.invoiceFromProformaId != null) {
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
      qty: 1,
      unit: [],
      salesPrice: 0,
      vat: 0,
      bruttoPrice: [],
      nettoPrice: [],
    });
    this.products.push(detailForm);
  }

  deleteProduct(lessonIndex: number) {
    this.products.removeAt(lessonIndex);
    this.summaryCalculation();
  }
  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      this.getProduct = res;
    });
  }

  productChange(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let productCode = this.invoiceProduct.get('productName')?.value;

    this.productService.getProductsByName(productCode).subscribe((res) => {
      let prodData: any;
      prodData = res;
      if (prodData != null) {
        this.invoiceProduct
          .get('productCode')
          ?.patchValue(prodData.productCode);
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
    let totalBrutto: number = qty * price * (1 + vat / 100);
    let totalNetto: number = qty * price;
    this.invoiceProduct
      .get('bruttoPrice')
      ?.patchValue(
        parseFloat((Math.round(totalBrutto * 100) / 100).toFixed(2))
      );

    this.invoiceProduct
      .get('nettoPrice')
      ?.patchValue(parseFloat((Math.round(totalNetto * 100) / 100).toFixed(2)));

    this.summaryCalculation();
  }
  summaryCalculation() {
    let array = this.invoiceForm.getRawValue().products;

    let sumTotalBrutto: number = 0;
    let sumTotalNetto: number = 0;
    array.forEach((x: Product) => {
      sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
    });
    array.forEach((x: Product) => {
      sumTotalNetto = sumTotalNetto + x.nettoPrice;
    });
    this.invoiceForm
      .get('total')
      ?.patchValue((Math.round(sumTotalBrutto * 100) / 100).toFixed(2));
    const calculatedTax = sumTotalBrutto - sumTotalNetto;
    this.invoiceForm
      .get('tax')
      ?.patchValue((Math.round(calculatedTax * 100) / 100).toFixed(2));
    this.invoiceForm.get('netTotal')?.patchValue(sumTotalNetto);
  }
}
