import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../service/invoice.service';
import { ProformaService } from '../../service/proforma.service';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  @ViewChild('content', { static: false }) el!: ElementRef

  constructor(private builder: FormBuilder, private service: InvoiceService, private serviceProforma: ProformaService,
    private router: Router, private toastr: ToastrService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();
    this.ShowInvoiceNumber();
    // this.addProduct();

    this.editInvoiceId = this.activeRoute.snapshot.paramMap.get('invoiceId');
    if (this.editInvoiceId != null) {
      this.pageTitle = "Edit Invoice"
      this.isEdit = true;
      this.SetEditInfo(this.editInvoiceId)
    }
    this.invoiceFromProformaId = this.activeRoute.snapshot.paramMap.get('proformaId');
    if (this.invoiceFromProformaId != null) {
      console.log(this.invoiceFromProformaId);

      this.pageTitle = "Invoice from proforma"
      this.isEdit = true;
      this.SetEditInfoProforma(this.invoiceFromProformaId)
    }
    this.breakpoint2 = (window.innerWidth <= 850) ? 1 : 2;
    this.breakpoint3 = (window.innerWidth <= 850) ? 1 : 3;
    this.breakpoint4 = (window.innerWidth <= 850) ? 1 : 4;
    this.breakpoint9 = (window.innerWidth <= 850) ? 3 : 10;
    this.colspan3 = (window.innerWidth <= 850) ? 2 : 3;
  }
  onResize(event: any) {
    this.breakpoint2 = (event.target.innerWidth <= 850) ? 1 : 2;
    this.breakpoint3 = (event.target.innerWidth <= 850) ? 1 : 3;
    this.breakpoint4 = (event.target.innerWidth <= 850) ? 1 : 4;
    this.breakpoint9 = (event.target.innerWidth <= 850) ? 3 : 10;
    this.colspan3 = (window.innerWidth <= 850) ? 2 : 3;
  }
  // breakpoints
  breakpoint2: any;
  breakpoint3: any;
  breakpoint4: any;
  breakpoint9: any;
  colspan3: any;
  //
  paymentType: string[] = ['Cash', 'Blik', 'Bank transfer'];
  paymentStatus: string[] = ['Paid', 'Unpaid',];
  pageTitle = "New invoice"
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editInvoiceId: any;
  invoiceFromProformaId: any;
  isEdit = false;
  isGeneratedShow: boolean = false;
  editInvoiceDetail: any;


  invoiceForm = this.builder.group({
    invoiceId: this.builder.control(0),
    invoiceNo: this.builder.control({ value: '', disabled: true }),
    placeOfIssue: this.builder.control(''),
    dateIssued: this.builder.control(new Date().toISOString()),
    dueDate: this.builder.control(new Date().toISOString()),
    customerId: this.builder.control({ value: 0, disabled: false }),
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
    products: this.builder.array([]),
    isGenerated: this.builder.control(false)
  });

  SetEditInfo(invoiceIdCode: any) {
    this.service.GetInvByCode(invoiceIdCode).subscribe(res => {
      let editData: any;
      editData = res;
      editData.products.forEach((product: any) => {
        this.products.push(this.builder.group({
          productCode: [product.productCode],
          productName: [product.productName],
          qty: [product.qty],
          unit: [product.unit],
          salesPrice: [product.salesPrice],
          vat: [product.vat],
          bruttoPrice: [product.bruttoPrice],
          nettoPrice: [product.nettoPrice],
        }));
      });
      if (editData != null) {
        this.invoiceForm.setValue({
          invoiceId: editData.invoiceId, invoiceNo: editData.invoiceNo, placeOfIssue: editData.placeOfIssue, dateIssued: editData.dateIssued, dueDate: editData.dueDate,
          customerId: editData.customerId, customerName: editData.customerName, customerNip: editData.customerNip, customerDeliveryAddress: editData.customerDeliveryAddress, customerCityCode: editData.customerCityCode,
          sellerId: editData.sellerId, sellerIdName: editData.sellerIdName, sellerNip: editData.sellerNip, sellerDeliveryAddress: editData.sellerDeliveryAddress, sellerCityCode: editData.sellerCityCode,
          total: editData.total, tax: editData.tax, netTotal: editData.netTotal,
          paymentStatus: editData.paymentStatus, paymentType: editData.paymentType, accountNumber: editData.accountNumber, paymentDescription: editData.paymentDescription,
          remarks: editData.remarks,
          products: [],
          isGenerated: editData.isGenerated
        })

      }
    })
  }


  SetEditInfoProforma(proformaId: any) {
    this.serviceProforma.GetProformaHeaderByCode(proformaId).subscribe(res => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.invoiceForm.setValue({
          invoiceId: editData.proformaId, invoiceNo: editData.proformaNo, placeOfIssue: editData.placeOfIssue, dateIssued: editData.dateIssued, dueDate: editData.dueDate,
          customerId: editData.customerId, customerName: editData.customerName, customerNip: editData.customerNip, customerDeliveryAddress: editData.customerDeliveryAddress, customerCityCode: editData.customerCityCode,
          sellerId: editData.sellerId, sellerIdName: editData.sellerIdName, sellerNip: editData.sellerNip, sellerDeliveryAddress: editData.sellerDeliveryAddress, sellerCityCode: editData.sellerCityCode,
          total: editData.total, tax: editData.tax, netTotal: editData.netTotal,
          paymentStatus: editData.paymentStatus, paymentType: editData.paymentType, accountNumber: editData.accountNumber, paymentDescription: editData.paymentDescription,
          remarks: editData.remarks,
          products: [],
          isGenerated: false
        })
      }
    })
  }
  get products() {
    return this.invoiceForm.controls["products"] as FormArray;
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
    })
    // let customerCode = this.invoiceForm.get("customerId")?.value;
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



  SaveInvoice() {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.getRawValue());
      if( this.invoiceFromProformaId != null){
        this.service.SaveInvoice(this.invoiceForm.getRawValue()).subscribe(() => {
          this.toastr.success('Created Successfully', 'Invoice No')
          this.router.navigate(['/invoice-list'])
        })
      }
      else if (this.isEdit ) {
        this.service.EditInvoice(this.invoiceForm.getRawValue()).subscribe(() => {
          this.toastr.success('Created Edited', 'Invoice No')
          this.router.navigate(['/invoice-list'])
        })
      } else {
        this.service.SaveInvoice(this.invoiceForm.getRawValue()).subscribe(() => {
          this.toastr.success('Created Successfully', 'Invoice No')
          this.router.navigate(['/invoice-list'])
        })
      }
    } else {
      this.toastr.warning('Please enter values in all mandatory field', 'Validation')
    }
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
        this.invoiceForm.get("customerDeliveryAddress")?.setValue(customData.customerAddress + ', ' + customData.customerCity)
        this.invoiceForm.get("customerName")?.setValue(customData.customerName)
        this.invoiceForm.get("customerNip")?.setValue(customData.customerNip)
      }
    })
  }
  ShowInvoiceNumber() {
    this.isGeneratedShow = this.invoiceForm.get("isGenerated")?.value as boolean;
  }

  ProductChange(index: any) {
    this.invoiceDetail = this.invoiceForm.controls["products"] as FormArray;
    this.invoiceProduct = this.invoiceDetail.at(index) as FormGroup;
     console.log(this.invoiceProduct.value);
    let productCode = this.invoiceProduct.get("productName")?.value;
    console.log(productCode);
    
    this.service.GetProductsByCode(productCode).subscribe(res => {
      let prodData: any;
      prodData = res;
      console.log(prodData);
      if (prodData != null) {
        this.invoiceProduct.get("productName")?.setValue(prodData.name)
        this.invoiceProduct.get("salesPrice")?.setValue(prodData.price)
        this.invoiceProduct.get("vat")?.setValue(prodData.vat)
        this.invoiceProduct.get("unit")?.setValue(prodData.unit)
        this.ItemCalculation(index);
      }
    })
  }

  ItemCalculation(index: any) {
    this.invoiceDetail = this.invoiceForm.controls["products"] as FormArray;
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
    let array = this.invoiceForm.getRawValue().products;
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
