import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { CustomerCreatePopupComponent } from 'src/app/customer/customer-create-popup/customer-create-popup.component';
import { InvoiceCorrectService } from 'src/app/service/invoice-correct.service';
import { ProfileService } from 'src/app/service/profile.service';

@Component({
  selector: 'app-invoice-correct-create',
  templateUrl: './invoice-correct-create.component.html',
  styleUrls: ['./invoice-correct-create.component.scss'],
})
export class InvoiceCorrectCreateComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private builder: FormBuilder,
    private service: InvoiceCorrectService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getCustomers();
    this.GetProducts();
    this.getProfile();

    this.editInvoiceId = this.activeRoute.snapshot.paramMap.get('invoiceId');
    if (this.editInvoiceId != null) {
      this.pageTitle = 'Edit Invoice';
      this.isEdit = true;
      this.SetEditInfo(this.editInvoiceId);
    } else {
      this.addProduct();
    }

    this.breakpoint2 = window.innerWidth <= 850 ? 1 : 2;
    this.breakpoint3 = window.innerWidth <= 850 ? 1 : 3;
    this.breakpoint4 = window.innerWidth <= 850 ? 2 : 4;
    this.breakpoint9 = window.innerWidth <= 850 ? 3 : 9;
    this.colspan3 = window.innerWidth <= 850 ? 2 : 3;
  }
  onResize(event: any) {
    this.breakpoint2 = event.target.innerWidth <= 850 ? 1 : 2;
    this.breakpoint3 = event.target.innerWidth <= 850 ? 1 : 3;
    this.breakpoint4 = event.target.innerWidth <= 850 ? 2 : 4;
    this.breakpoint9 = event.target.innerWidth <= 850 ? 3 : 9;
    this.colspan3 = window.innerWidth <= 850 ? 2 : 3;
  }
  // breakpoints
  breakpoint2: any;
  breakpoint3: any;
  breakpoint4: any;
  breakpoint9: any;
  colspan3: any;
  //

  issuedStatus = [
    { name: 'Issued', value: true },
    { name: 'Not issued', value: false },
  ];

  paymentStatus: string[] = ['Paid', 'Unpaid'];
  paymentType: string[] = ['Cash', 'Blik', 'Bank transfer'];
  pageTitle = 'New invoice';
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editInvoiceId: any;
  invoiceFromProformaId: any;
  isEdit = false;
  invoiceNoIsEdit: any;
  isGeneratedShow: boolean = false;
  editInvoiceDetail: any;
  customerFullName: any = '';

  invoiceForm = this.builder.group({
    invoiceCorrectId: this.builder.control(0),
    invoiceCorrectNo: this.builder.control({ value: '', disabled: true }),
    invoiceCorrectNoFrom: this.builder.control(''),
    invoiceDateCorrect: this.builder.control(''),
    issueCorrect: this.builder.control(''),
    placeOfIssue: this.builder.control(''),
    dateIssued: this.builder.control(new Date().toISOString()),
    dueDate: this.builder.control(
      new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()
    ),
    invoiceDate: this.builder.control(new Date().toISOString()),
    customerName: this.builder.control({ value: '', disabled: true }),
    customerNip: this.builder.control({ value: '', disabled: true }),
    customerDeliveryAddress: this.builder.control({
      value: '',
      disabled: true,
    }),
    customerCityCode: this.builder.control(''),
    sellerId: this.builder.control({ value: '', disabled: true }),
    sellerIdName: this.builder.control({ value: '', disabled: true }),
    sellerNip: this.builder.control({ value: '', disabled: true }),
    sellerDeliveryAddress: this.builder.control({ value: '', disabled: true }),
    sellerCityCode: this.builder.control({ value: '', disabled: true }),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    totalCorrect: this.builder.control({ value: 0, disabled: true }),
    taxCorrect: this.builder.control({ value: 0, disabled: true }),
    netTotalCorrect: this.builder.control({ value: 0, disabled: true }),
    paymentStatus: this.builder.control('', Validators.required),
    paymentType: this.builder.control(''),
    accountNumber: this.builder.control(''),
    paymentDescription: this.builder.control(''),
    remarks: this.builder.control(''),
    products: this.builder.array([]),
    // productsCorrect: this.builder.array([]),
    isGenerated: this.builder.control(false),
  });

  SetEditInfo(invoiceIdCode: any) {
    this.service.GetInvByCode(invoiceIdCode).subscribe((res) => {
      let editData: any;
      console.log(res);

      editData = res;
      this.invoiceNoIsEdit = editData.invoiceCorrectNo;

      this.customerFullName =
        editData.customerName +
        '<br>' +
        editData.customerDeliveryAddress +
        '<br>' +
        editData.customerCityCode +
        '<br> NIP: ' +
        editData.customerNip;

      editData.products.forEach((product: any) => {
        this.products.push(
          this.builder.group({
            productCode: [product.productCode],
            productName: [product.productName],
            qty: [product.qty],
            unit: [product.unit],
            salesPrice: [product.salesPrice],
            vat: [product.vat],
            bruttoPrice: [product.bruttoPrice],
            nettoPrice: [product.nettoPrice],
            isActual: [product.isActual],
          })
        );
      });
      this.SummaryCalculation();

      if (editData != null) {
        this.invoiceForm.patchValue({
          invoiceCorrectId: editData.invoiceCorrectId,
          invoiceCorrectNo: editData.invoiceCorrectNo,
          invoiceCorrectNoFrom: editData.invoiceCorrectNoFrom,
          invoiceDateCorrect: editData.invoiceDateCorrect,
          issueCorrect: editData.issueCorrect,
          placeOfIssue: editData.placeOfIssue,
          dateIssued: editData.dateIssued,
          dueDate: editData.dueDate,
          invoiceDate: editData.invoiceDate,
          customerName: editData.customerName,
          customerNip: editData.customerNip,
          customerDeliveryAddress: editData.customerDeliveryAddress,
          customerCityCode: editData.customerCityCode,
          sellerId: editData.sellerId,
          sellerIdName: editData.sellerIdName,
          sellerNip: editData.sellerNip,
          sellerDeliveryAddress: editData.sellerDeliveryAddress,
          sellerCityCode: editData.sellerCityCode,
          total: editData.total,
          tax: editData.tax,
          netTotal: editData.netTotal,
          paymentStatus: editData.paymentStatus,
          paymentType: editData.paymentType,
          accountNumber: editData.accountNumber,
          paymentDescription: editData.paymentDescription,
          remarks: editData.remarks,
          products: [],
          // productsCorrect: [],
          isGenerated: editData.isGenerated,
        });
      }
      this.showInvoiceNumber();
    });
  }

  get products() {
    return this.invoiceForm.controls['products'] as FormArray;
  }
  // get productsCorrect() {
  //   return this.invoiceForm.controls['productsCorrect'] as FormArray;
  // }
  getProfile() {
    this.profileService.getProfile().subscribe((res) => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.invoiceForm.get('sellerIdName')?.patchValue(customData.name);
        this.invoiceForm.get('sellerNip')?.patchValue(customData.nip);
        this.invoiceForm
          .get('sellerDeliveryAddress')
          ?.patchValue(customData.city);
        this.invoiceForm.get('sellerCityCode')?.patchValue(customData.cityCode);
      }
    });
  }

  addProduct() {
    const detailForm = this.builder.group({
      productCode: this.builder.control(''),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      unit: this.builder.control(''),
      salesPrice: this.builder.control(0),
      vat: this.builder.control(0),
      bruttoPrice: this.builder.control({ value: 0, disabled: true }),
      nettoPrice: this.builder.control({ value: 0, disabled: true }),
      isActual: false,
    });
    // let customerCode = this.invoiceForm.get("customerId")?.value;
    // if (customerCode != null && customerCode != '') {
    this.products.push(detailForm);
    // } else {
    // this.toastr.warning('Please select the customer', 'Validation')
    // }

    const detailFormCorrect = this.builder.group({
      productCode: this.builder.control(''),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      unit: this.builder.control(''),
      salesPrice: this.builder.control(0),
      vat: this.builder.control(0),
      bruttoPrice: this.builder.control({ value: 0, disabled: true }),
      nettoPrice: this.builder.control({ value: 0, disabled: true }),
      isActual: true,
    });
    this.products.push(detailFormCorrect);

    // let customerCode = this.invoiceForm.get("customerId")?.value;
    // if (customerCode != null && customerCode != '') {
    // this.productsCorrect.push(detailFormCorrect);
  }

  deletePProduct(lessonIndex: number) {
    this.products.removeAt(lessonIndex + 1);
    this.products.removeAt(lessonIndex);
    this.SummaryCalculation();
  }

  SaveInvoice() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.getRawValue());

      if (this.isEdit) {
        this.service
          .EditInvoice(this.invoiceForm.getRawValue())
          .subscribe(() => {
            this.toastr.success('Created Edited', 'Invoice No');
            this.router.navigate(['/invoice-correct-list']);
          });
      } else {
        this.service
          .SaveInvoice(this.invoiceForm.getRawValue())
          .subscribe(() => {
            this.toastr.success('Created Successfully', 'Invoice No');
            this.router.navigate(['/invoice-correct-list']);
          });
      }
    } else {
      this.toastr.warning(
        'Please enter values in all mandatory field',
        'Validation'
      );
    }
  }

  getCustomers() {
    this.service.GetCustomer().subscribe((res) => {
      this.getCustomer = res;
    });
  }
  GetProducts() {
    this.service.GetProducts().subscribe((res) => {
      this.getProduct = res;
    });
  }

  CustomerChange(event: any) {
    // let customerCode = this.invoiceForm.get('customerName')?.value;
    this.service.getCustomerByCode(event.value).subscribe((res) => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.invoiceForm
          .get('customerDeliveryAddress')
          ?.patchValue(customData.customerAddress);
        this.invoiceForm
          .get('customerCityCode')
          ?.patchValue(customData.customerCity);
        this.invoiceForm
          .get('customerName')
          ?.patchValue(customData.customerName);
        this.invoiceForm.get('customerNip')?.patchValue(customData.customerNip);
        this.customerFullName =
          customData.customerName +
          '<br>' +
          customData.customerAddress +
          '<br>' +
          customData.customerCity +
          '<br> NIP: ' +
          customData.customerNip;
      }
    });
  }
  showInvoiceNumber() {
    this.isGeneratedShow = this.invoiceForm.get('isGenerated')
      ?.value as boolean;
  }
  calcBruttoCorrect(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;

    let index1 = this.invoiceDetail.at(index - 1).get('bruttoPrice')?.value;
    index1 = index1 !== null ? index1 : 0;

    let index2 = this.invoiceDetail.at(index).get('bruttoPrice')?.value;
    index2 = index2 !== null ? index2 : 0;

    return index2 - index1;
  }
  calcNettoCorrect(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;

    let index1 = this.invoiceDetail.at(index - 1).get('nettoPrice')?.value;
    index1 = index1 !== null ? index1 : 0;

    let index2 = this.invoiceDetail.at(index).get('nettoPrice')?.value;
    index2 = index2 !== null ? index2 : 0;

    return index2 - index1;
  }

  ProductChange(index: any) {
    console.log(index);

    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let productCode = this.invoiceProduct.get('productName')?.value;

    this.service.GetProductsByName(productCode).subscribe((res) => {
      let prodData: any;
      prodData = res;
      if (prodData != null) {
        this.invoiceProduct.get('productName')?.patchValue(prodData.name);
        this.invoiceProduct.get('salesPrice')?.patchValue(prodData.price);
        this.invoiceProduct.get('vat')?.patchValue(prodData.vat);
        this.invoiceProduct.get('unit')?.patchValue(prodData.unit);
        this.ItemCalculation(index);
      }
    });
  }

  ItemCalculation(index: any) {
    this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let qty = this.invoiceProduct.get('qty')?.value;
    let price = this.invoiceProduct.get('salesPrice')?.value;
    let vat = this.invoiceProduct.get('vat')?.value;
    let totalBrutto = qty * price * (1 + vat / 100);
    totalBrutto = Number(totalBrutto.toFixed(2));
    let totalNetto = qty * price;
    this.invoiceProduct.get('bruttoPrice')?.patchValue(totalBrutto);
    this.invoiceProduct.get('nettoPrice')?.patchValue(totalNetto);

    this.SummaryCalculation();
  }
  SummaryCalculation() {
    let array = this.invoiceForm.getRawValue().products;
    let sumTotalBrutto = 0;
    let sumTotalNetto = 0;
    array.forEach((x: any) => {
      if (!x.isActual) {
        sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
      }
    });
    array.forEach((x: any) => {
      if (!x.isActual) {
        sumTotalNetto = sumTotalNetto + x.nettoPrice;
      }
    });
    this.invoiceForm
      .get('total')
      ?.patchValue(Number(sumTotalBrutto.toFixed(2)));
    this.invoiceForm
      .get('tax')
      ?.patchValue(Number((sumTotalBrutto - sumTotalNetto).toFixed(2)));
    this.invoiceForm
      .get('netTotal')
      ?.patchValue(Number(sumTotalNetto.toFixed(2)));

    sumTotalBrutto = 0;
    sumTotalNetto = 0;
    array.forEach((x: any) => {
      if (x.isActual) {
        sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
      }
    });
    array.forEach((x: any) => {
      if (x.isActual) {
        sumTotalNetto = sumTotalNetto + x.nettoPrice;
      }
    });
    this.invoiceForm
      .get('totalCorrect')
      ?.patchValue(Number(sumTotalBrutto.toFixed(2)));
    this.invoiceForm
      .get('taxCorrect')
      ?.patchValue(Number((sumTotalBrutto - sumTotalNetto).toFixed(2)));
    this.invoiceForm
      .get('netTotalCorrect')
      ?.patchValue(Number(sumTotalNetto.toFixed(2)));
  }

  ///////////
  // ProductCorrectChange(index: any) {
  //   this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
  //   this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
  //   let productCode = this.invoiceProduct.get('productName')?.value;

  //   this.service.GetProductsByName(productCode).subscribe((res) => {
  //     let prodData: any;
  //     prodData = res;
  //     if (prodData != null) {
  //       this.invoiceProduct.get('productName')?.patchValue(prodData.name);
  //       this.invoiceProduct.get('salesPrice')?.patchValue(prodData.price);
  //       this.invoiceProduct.get('vat')?.patchValue(prodData.vat);
  //       this.invoiceProduct.get('unit')?.patchValue(prodData.unit);
  //       this.ItemCorrectCalculation(index);
  //     }
  //   });
  // }

  // ItemCorrectCalculation(index: any) {
  //   this.invoiceDetail = this.invoiceForm.controls['products'] as FormArray;
  //   this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
  //   let qty = this.invoiceProduct.get('qty')?.value;
  //   let price = this.invoiceProduct.get('salesPrice')?.value;
  //   let vat = this.invoiceProduct.get('vat')?.value;
  //   let totalBrutto = qty * price * (1 + vat / 100);
  //   let totalNetto = qty * price;
  //   this.invoiceProduct.get('bruttoPrice')?.patchValue(totalBrutto);
  //   this.invoiceProduct.get('nettoPrice')?.patchValue(totalNetto);

  //   this.SummaryCorrectCalculation();
  // }
  // SummaryCorrectCalculation() {
  //   let array = this.invoiceForm.getRawValue().products;
  //   let sumTotalBrutto = 0;
  //   let sumTotalNetto = 0;
  //   array.forEach((x: any) => {
  //     sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
  //   });
  //   array.forEach((x: any) => {
  //     sumTotalNetto = sumTotalNetto + x.nettoPrice;
  //   });

  //   this.invoiceForm.get('totalCorrect')?.patchValue(sumTotalBrutto);
  //   this.invoiceForm.get('taxCorrect')?.patchValue(sumTotalBrutto - sumTotalNetto);
  //   this.invoiceForm.get('netTotalCorrect')?.patchValue(sumTotalNetto);
  // }
  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFont('helvetica');
    pdf.setFontSize(9);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('sample.pdf');
      },
    });
  }

  createCustomer(): void {
    const popup = this.dialog.open(CustomerCreatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '40%',
    });
    popup.afterClosed().subscribe(() => {
      this.getCustomers();
    });
  }
}
