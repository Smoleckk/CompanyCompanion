import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../service/invoice.service';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(private builder: FormBuilder, private service: InvoiceService,
    private router: Router, private toastr: ToastrService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();
    this.ShowInvoiceNumber();

    this.editInvoiceId = this.activeRoute.snapshot.paramMap.get('invoiceId');
    if (this.editInvoiceId != null) {
      this.pageTitle = "Edit Invoice"
      this.isEdit = true;
      this.SetEditInfo(this.editInvoiceId)
    }

  }

  pageTitle = "Create Invoice"
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editInvoiceId: any;
  isEdit = false;
  isGeneratedShow: boolean = false;
  editInvoiceDetail: any;

  invoiceForm = this.builder.group({
    invoiceNo: this.builder.control(''),
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
    isGenerated: this.builder.control(false)
  });

  SetEditInfo(invoiceId: any) {
    this.service.GetInvHeaderByCode(invoiceId).subscribe(res => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.invoiceForm.setValue({
          invoiceNo: editData.invoiceNo, placeOfIssue: editData.placeOfIssue, dateIssued: editData.dateIssued, dueDate: editData.dueDate,
          customerId: editData.customerId, customerName: editData.customerName, customerNip: editData.customerNip, customerDeliveryAddress: editData.customerDeliveryAddress, customerCityCode: editData.customerCityCode,
          sellerId: editData.sellerId, sellerIdName: editData.sellerIdName, sellerNip: editData.sellerNip, sellerDeliveryAddress: editData.sellerDeliveryAddress, sellerCityCode: editData.sellerCityCode,
          total: editData.total, tax: editData.tax, netTotal: editData.netTotal,
          paymentStatus: editData.paymentStatus, paymentType: editData.paymentType, accountNumber: editData.accountNumber, paymentDescription: editData.paymentDescription,
          remarks: editData.remarks,
          details: [],
          isGenerated: editData.isGenerated
        })
      }
    })
  }
  get details() {
    return this.invoiceForm.controls["details"] as FormArray;
  }

  addProduct() {
    const detailForm = this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      unit: this.builder.control('Sztuka'),
      salesPrice: this.builder.control(0),
      vat: this.builder.control(0),
      bruttoPrice: this.builder.control({ value: 0, disabled: true }),
      nettoPrice: this.builder.control({ value: 0, disabled: true }),
    })
    let customerCode = this.invoiceForm.get("customerId")?.value;
    if (customerCode != null && customerCode != '') {
      this.details.push(detailForm);
    } else {
      this.toastr.warning('Please select the customer', 'Validation')
    }
  }

  deletePProduct(lessonIndex: number) {
    this.details.removeAt(lessonIndex);
    this.SummaryCalculation();
  }



  SaveInvoice() {
    if (this.invoiceForm.valid) {
      this.service.SaveInvoice(this.invoiceForm.getRawValue()).subscribe(res => {
        if (this.isEdit) {
          this.toastr.success('Created Edited', 'Invoice No')
        } else {
          this.toastr.success('Created Successfully', 'Invoice No')
        }
        this.router.navigate(['/invoice-list'])
      })
    } else {
      this.toastr.warning('Please enter values in all mandatory field', 'Validation')
    }
    // console.log(this.invoiceForm.value);
  }

  GetCustomers() {
    this.service.GetCustomer().subscribe(res => {
      this.getCustomer = res;
    })
  }
  GetProducts() {
    this.service.GetProducts().subscribe(res => {
      this.getProduct = res;
    })
  }
  CustomerChange() {
    let customerCode = this.invoiceForm.get("customerId")?.value;
    this.service.GetCustomerByCode(customerCode).subscribe(res => {
      let customData: any;
      customData = res;
      if (customData != null) {
        this.invoiceForm.get("customerDeliveryAddress")?.setValue(customData.address + ' ,' + customData.phone + ' ,' + customData.email)
        this.invoiceForm.get("customerName")?.setValue(customData.name)
      }
    })
  }
  ShowInvoiceNumber() {
    this.isGeneratedShow = this.invoiceForm.get("isGenerated")?.value as boolean;
  }

  ProductChange(index: any) {
    this.invoiceDetail = this.invoiceForm.controls["details"] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let productCode = this.invoiceProduct.get("productCode")?.value;
    this.service.GetProductsByCode(productCode).subscribe(res => {
      let prodData: any;
      prodData = res;
      console.log(prodData);
      if (prodData != null) {
        this.invoiceProduct.get("productName")?.setValue(prodData.name)
        this.invoiceProduct.get("salesPrice")?.setValue(prodData.price)
        this.ItemCalculation(index);
      }
    })
  }

  ItemCalculation(index: any) {
    this.invoiceDetail = this.invoiceForm.controls["details"] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
    let qty = this.invoiceProduct.get("qty")?.value;
    let price = this.invoiceProduct.get("salesPrice")?.value;
    let vat = this.invoiceProduct.get("vat")?.value;
    let totalBrutto = qty * price;
    let totalNetto = qty * price * (1 + (vat / 100));
    this.invoiceProduct.get("bruttoPrice")?.setValue(totalBrutto)
    this.invoiceProduct.get("nettoPrice")?.setValue(totalNetto)

    this.SummaryCalculation();
  }
  SummaryCalculation() {
    let array = this.invoiceForm.getRawValue().details;
    let sumTotalBrutto = 0;
    let sumTotalNetto = 0;
    array.forEach((x: any) => {
      sumTotalBrutto = sumTotalBrutto + x.bruttoPrice;
    });
    array.forEach((x: any) => {
      sumTotalNetto = sumTotalNetto + x.nettoPrice;
    });

    this.invoiceForm.get("total")?.setValue(sumTotalBrutto)
    this.invoiceForm.get("tax")?.setValue(sumTotalNetto - sumTotalBrutto)
    this.invoiceForm.get("netTotal")?.setValue(sumTotalNetto)

  }
  makePdf() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.setFont("helvetica");
    pdf.setFontSize(9);
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save("sample.pdf")
      }
    })
  }


}
