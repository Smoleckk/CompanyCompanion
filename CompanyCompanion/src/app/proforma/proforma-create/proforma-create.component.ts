import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
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
    private service: ProformaService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getCustomers();
    this.GetProducts();
    this.ShowProformaNumber();
    this.addProduct();

    this.editProformaId = this.activeRoute.snapshot.paramMap.get('proformaId');
    if (this.editProformaId != null) {
      this.pageTitle = 'Edit Proforma';
      this.isEdit = true;
      this.SetEditInfo(this.editProformaId);
    }
    this.breakpoint2 = window.innerWidth <= 850 ? 1 : 2;
    this.breakpoint3 = window.innerWidth <= 850 ? 1 : 3;
    this.breakpoint4 = window.innerWidth <= 850 ? 1 : 4;
    this.breakpoint9 = window.innerWidth <= 850 ? 3 : 10;
    this.colspan3 = window.innerWidth <= 850 ? 2 : 3;
  }
  onResize(event: any) {
    this.breakpoint2 = event.target.innerWidth <= 850 ? 1 : 2;
    this.breakpoint3 = event.target.innerWidth <= 850 ? 1 : 3;
    this.breakpoint4 = event.target.innerWidth <= 850 ? 1 : 4;
    this.breakpoint9 = event.target.innerWidth <= 850 ? 3 : 10;
    this.colspan3 = window.innerWidth <= 850 ? 2 : 3;
  }
  // breakpoints
  breakpoint2: any;
  breakpoint3: any;
  breakpoint4: any;
  breakpoint9: any;
  colspan3: any;

  paymentType: string[] = ['Cash', 'Blik', 'Bank transfer'];
  paymentStatus: string[] = ['Paid', 'Unpaid'];
  pageTitle = 'Create Proforma';
  proformaDetail!: FormArray<any>;
  proformaProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editProformaId: any;
  isEdit = false;
  isGeneratedShow: boolean = false;
  editProformaDetail: any;

  proformaForm = this.builder.group({
    proformaId: this.builder.control(''),
    proformaNo: this.builder.control({ value: '', disabled: true }),
    placeOfIssue: this.builder.control(''),
    dateIssued: this.builder.control(''),
    dueDate: this.builder.control(''),
    customerId: this.builder.control(''),
    customerName: this.builder.control(''),
    customerNip: this.builder.control(''),
    customerDeliveryAddress: this.builder.control(''),
    customerCityCode: this.builder.control(''),
    sellerId: this.builder.control(''),
    sellerIdName: this.builder.control(''),
    sellerNip: this.builder.control(''),
    sellerDeliveryAddress: this.builder.control(''),
    sellerCityCode: this.builder.control(''),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    paymentStatus: this.builder.control(''),
    paymentType: this.builder.control(''),
    accountNumber: this.builder.control(''),
    paymentDescription: this.builder.control(''),
    remarks: this.builder.control(''),
    details: this.builder.array([]),
    isGenerated: this.builder.control(false),
  });

  SetEditInfo(proformaId: any) {
    this.service.GetProformaHeaderByCode(proformaId).subscribe((res) => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.proformaForm.setValue({
          proformaId: editData.proformaId,
          proformaNo: editData.proformaNo,
          placeOfIssue: editData.placeOfIssue,
          dateIssued: editData.dateIssued,
          dueDate: editData.dueDate,
          customerId: editData.customerId,
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
          details: [],
          isGenerated: editData.isGenerated,
        });
      }
    });
  }
  get details() {
    return this.proformaForm.controls['details'] as FormArray;
  }

  addProduct() {
    const detailForm = this.builder.group({
      proformaNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      unit: this.builder.control('Sztuka'),
      salesPrice: this.builder.control(0),
      vat: this.builder.control(0),
      bruttoPrice: this.builder.control({ value: 0, disabled: true }),
      nettoPrice: this.builder.control({ value: 0, disabled: true }),
    });
    // let customerCode = this.proformaForm.get("customerId")?.value;
    // if (customerCode != null && customerCode != '') {
    this.details.push(detailForm);
    // } else {
    // this.toastr.warning('Please select the customer', 'Validation')
    // }
  }

  deletePProduct(lessonIndex: number) {
    this.details.removeAt(lessonIndex);
    this.SummaryCalculation();
  }

  SaveProforma() {
    if (this.proformaForm.valid) {
      this.service
        .SaveProforma(this.proformaForm.getRawValue())
        .subscribe((res) => {
          if (this.isEdit) {
            this.toastr.success('Created Edited', 'Proforma No');
          } else {
            this.toastr.success('Created Successfully', 'Proforma No');
          }
          this.router.navigate(['/proforma-list']);
        });
    } else {
      this.toastr.warning(
        'Please enter values in all mandatory field',
        'Validation'
      );
    }
    // console.log(this.proformaForm.value);
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
  CustomerChange() {
    let customerCode = this.proformaForm.get('customerId')?.value;
    this.service.getCustomerByCode(customerCode).subscribe((res) => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.proformaForm
          .get('customerDeliveryAddress')
          ?.setValue(
            customData.address +
              ' ,' +
              customData.phone +
              ' ,' +
              customData.email
          );
        this.proformaForm.get('customerName')?.setValue(customData.name);
      }
    });
  }
  ShowProformaNumber() {
    this.isGeneratedShow = this.proformaForm.get('isGenerated')
      ?.value as boolean;
  }

  ProductChange(index: any) {
    this.proformaDetail = this.proformaForm.controls['details'] as FormArray;
    this.proformaProduct = this.proformaDetail.at(index) as FormGroup;
    let productCode = this.proformaProduct.get('productCode')?.value;
    this.service.GetProductsByCode(productCode).subscribe((res) => {
      let prodData: any;
      prodData = res;
      console.log(prodData);
      if (prodData != null) {
        this.proformaProduct.get('productName')?.setValue(prodData.name);
        this.proformaProduct.get('salesPrice')?.setValue(prodData.price);
        this.ItemCalculation(index);
      }
    });
  }

  ItemCalculation(index: any) {
    this.proformaDetail = this.proformaForm.controls['details'] as FormArray;
    this.proformaProduct = this.proformaDetail.at(index) as FormGroup;
    let qty = this.proformaProduct.get('qty')?.value;
    let price = this.proformaProduct.get('salesPrice')?.value;
    let vat = this.proformaProduct.get('vat')?.value;
    let totalBrutto = qty * price;
    let totalNetto = qty * price * (1 + vat / 100);
    this.proformaProduct.get('bruttoPrice')?.setValue(totalBrutto);
    this.proformaProduct.get('nettoPrice')?.setValue(totalNetto);

    this.SummaryCalculation();
  }
  SummaryCalculation() {
    let array = this.proformaForm.getRawValue().details;
    let sumTotalBrutto = 0;
    let sumTotalNetto = 0;
    array.forEach((x: any) => {
      sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
    });
    array.forEach((x: any) => {
      sumTotalNetto = sumTotalNetto + x.nettoPrice;
    });

    this.proformaForm.get('total')?.setValue(sumTotalBrutto);
    this.proformaForm.get('tax')?.setValue(sumTotalNetto - sumTotalBrutto);
    this.proformaForm.get('netTotal')?.setValue(sumTotalNetto);
  }
}
