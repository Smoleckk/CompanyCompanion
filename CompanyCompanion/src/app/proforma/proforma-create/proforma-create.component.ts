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
import { InvoiceService } from 'src/app/service/invoice.service';
import { ProfileService } from 'src/app/service/profile.service';
import { ProformaService } from '../../service/proforma.service';

@Component({
  selector: 'app-proforma-create',
  templateUrl: './proforma-create.component.html',
  styleUrls: ['./proforma-create.component.scss'],
})
export class ProformaCreateComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private serviceProforma: ProformaService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getCustomers();
    this.GetProducts();
    this.ShowProformaNumber();
    this.getProfile();

    this.editProformaId = this.activeRoute.snapshot.paramMap.get('proformaId');
    if (this.editProformaId != null) {
      this.pageTitle = 'Edit Proforma';
      this.isEdit = true;
      this.SetEditInfo(this.editProformaId);
    } else {
      this.addProduct();

    }
    this.proformaFromProformaId =
      this.activeRoute.snapshot.paramMap.get('proformaId');
    if (this.proformaFromProformaId != null) {
      console.log(this.proformaFromProformaId);

      this.pageTitle = 'Proforma from proforma';
      this.isEdit = true;
      this.SetEditInfoProforma(this.proformaFromProformaId);
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
    { name: 'Not issued', value: false }
  ];

  paymentStatus: string[] = ['Paid', 'Unpaid'];
  paymentType: string[] = ['Cash', 'Blik', 'Bank transfer'];
  pageTitle = 'New proforma';
  proformaDetail!: FormArray<any>;
  proformaProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editProformaId: any;
  proformaFromProformaId: any;
  isEdit = false;
  isGeneratedShow: boolean = false;
  editProformaDetail: any;

  proformaForm = this.builder.group({
    proformaId: this.builder.control("0"),
    proformaNo: this.builder.control({ value: '', disabled: true }),
    placeOfIssue: this.builder.control(''),
    dateIssued: this.builder.control(
      (new Date().toISOString())
    ),
    dueDate: this.builder.control(new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString()),
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
    paymentStatus: this.builder.control('', Validators.required),
    paymentType: this.builder.control(''),
    accountNumber: this.builder.control(''),
    paymentDescription: this.builder.control(''),
    remarks: this.builder.control(''),
    products: this.builder.array([]),
    isGenerated: this.builder.control(false),
  });

  SetEditInfo(proformaIdCode: any) {
    this.serviceProforma.GetProformaHeaderByCode(proformaIdCode).subscribe((res) => {
      let editData: any;
      editData = res;
      console.log(proformaIdCode);
      console.log(editData);

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
          })
        );
      });
      if (editData != null) {
        this.proformaForm.patchValue({
          proformaId: editData.proformaId,
          proformaNo: editData.proformaNo,
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
          isGenerated: editData.isGenerated,
        });
      }
    });
  }

  SetEditInfoProforma(proformaId: any) {
    this.serviceProforma
      .GetProformaHeaderByCode(proformaId)
      .subscribe((res) => {
        let editData: any;
        editData = res;
        if (editData != null) {
          this.proformaForm.patchValue({
            proformaId: editData.proformaId,
            proformaNo: editData.proformaNo,
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
            isGenerated: false,
          });
        }
      });
  }
  get products() {
    return this.proformaForm.controls['products'] as FormArray;
  }
  getProfile() {
    this.profileService.getProfile().subscribe((res) => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.proformaForm.get('sellerIdName')?.patchValue(customData.name);
        this.proformaForm.get('sellerNip')?.patchValue(customData.nip);
        this.proformaForm
          .get('sellerDeliveryAddress')
          ?.patchValue(customData.city);
        this.proformaForm.get('sellerCityCode')?.patchValue(customData.cityCode);
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
    });
    // let customerCode = this.proformaForm.get("customerId")?.value;
    // if (customerCode != null && customerCode != '') {
    this.products.push(detailForm);
    // } else {
    // this.toastr.warning('Please select the customer', 'Validation')
    // }
  }

  deletePProduct(lessonIndex: number) {
    this.products.removeAt(lessonIndex);
    this.SummaryCalculation();
  }

  // SaveProforma() {
  //   if (this.proformaForm.valid) {
  //     console.log(this.proformaForm.getRawValue());

  //     this.serviceProforma
  //       .SaveProforma(this.proformaForm.getRawValue())
  //       .subscribe((res) => {
  //         if (this.isEdit) {
  //           this.toastr.success('Created Edited', 'Proforma No');
  //         } else {
  //           this.toastr.success('Created Successfully', 'Proforma No');
  //         }
  //         this.router.navigate(['/proforma-list']);
  //       });
  //   } else {
  //     this.toastr.warning(
  //       'Please enter values in all mandatory field',
  //       'Validation'
  //     );
  //   }
  //   // console.log(this.proformaForm.value);
  // }
  SaveProforma() {
    if (this.proformaForm.valid) {
      console.log(this.proformaForm.getRawValue());
      if (this.isEdit) {
        this.serviceProforma
          .EditProforma(this.proformaForm.getRawValue())
          .subscribe(() => {
            this.toastr.success('Created Edited', 'Proforma No');
            this.router.navigate(['/proforma-list']);
          });
      } else {
        this.serviceProforma
          .SaveProforma(this.proformaForm.getRawValue())
          .subscribe(() => {
            this.toastr.success('Created Successfully', 'Proforma No');
            this.router.navigate(['/proforma-list']);
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

  customerFullName: any = '';

  CustomerChange(event: any) {
    // let customerCode = this.proformaForm.get('customerName')?.value;
    this.service.getCustomerByCode(event.value).subscribe((res) => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.proformaForm.get('customerDeliveryAddress')?.patchValue(customData.customerAddress);
        this.proformaForm.get('customerCityCode')?.patchValue(customData.customerCity);
        this.proformaForm.get('customerName')?.patchValue(customData.customerName);
        this.proformaForm.get('customerNip')?.patchValue(customData.customerNip);
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
  ShowProformaNumber() {
    this.isGeneratedShow = this.proformaForm.get('isGenerated')
      ?.value as boolean;
  }

  ProductChange(index: any) {
    this.proformaDetail = this.proformaForm.controls['products'] as FormArray;
    this.proformaProduct = this.proformaDetail.at(index) as FormGroup;
    console.log(this.proformaProduct.value);
    let productCode = this.proformaProduct.get('productName')?.value;
    console.log(productCode);

    this.service.GetProductsByName(productCode).subscribe((res) => {
      let prodData: any;
      prodData = res;
      console.log(prodData);
      if (prodData != null) {
        this.proformaProduct.get('productName')?.patchValue(prodData.name);
        this.proformaProduct.get('salesPrice')?.patchValue(prodData.price);
        this.proformaProduct.get('vat')?.patchValue(prodData.vat);
        this.proformaProduct.get('unit')?.patchValue(prodData.unit);
        this.ItemCalculation(index);
      }
    });
  }

  ItemCalculation(index: any) {
    this.proformaDetail = this.proformaForm.controls['products'] as FormArray;
    this.proformaProduct = this.proformaDetail.at(index) as FormGroup;
    let qty = this.proformaProduct.get('qty')?.value;
    let price = this.proformaProduct.get('salesPrice')?.value;
    let vat = this.proformaProduct.get('vat')?.value;
    let totalBrutto = qty * price * (1 + vat / 100);;
    let totalNetto = qty * price;
    this.proformaProduct.get('bruttoPrice')?.patchValue(totalBrutto);
    this.proformaProduct.get('nettoPrice')?.patchValue(totalNetto);

    this.SummaryCalculation();
  }
  SummaryCalculation() {
    let array = this.proformaForm.getRawValue().products;
    let sumTotalBrutto = 0;
    let sumTotalNetto = 0;
    array.forEach((x: any) => {
      sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
    });
    array.forEach((x: any) => {
      sumTotalNetto = sumTotalNetto + x.nettoPrice;
    });

    this.proformaForm.get('total')?.patchValue(sumTotalBrutto);
    this.proformaForm.get('tax')?.patchValue(sumTotalBrutto - sumTotalNetto);
    this.proformaForm.get('netTotal')?.patchValue(sumTotalNetto);
  }
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
