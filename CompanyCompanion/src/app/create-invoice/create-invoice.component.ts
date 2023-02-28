import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss']
})
export class CreateInvoiceComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: InvoiceService,
    private router: Router, private toastr: ToastrService, private activeRoute: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.GetCustomers();
    this.GetProducts();

    this.editInvoiceNo = this.activeRoute.snapshot.paramMap.get('invoiceno');
    if (this.editInvoiceNo != null) {
      this.pageTitle = "Edit Invoice"
      this.isEdit = true;
      this.SetEditInfo(this.editInvoiceNo)
    }
  }

  pageTitle = "Create Invoice"
  invoiceDetail!: FormArray<any>;
  invoiceProduct!: FormGroup<any>;
  getCustomer: any;
  getProduct: any;
  editInvoiceNo: any;
  isEdit = false;

  invoiceForm = this.builder.group({
    invoiceNo: this.builder.control('', Validators.required),
    customerId: this.builder.control('', Validators.required),
    customerName: this.builder.control('', Validators.required),
    deliveryAddress: this.builder.control('', Validators.required),
    remarks: this.builder.control('', Validators.required),
    total: this.builder.control({ value: 0, disabled: true }),
    tax: this.builder.control({ value: 0, disabled: true }),
    netTotal: this.builder.control({ value: 0, disabled: true }),
    details: this.builder.array([])
  });

  get details() {
    return this.invoiceForm.controls["details"] as FormArray;
  }

  addProduct() {
    const detailForm = this.builder.group({
      invoiceNo: this.builder.control(''),
      productCode: this.builder.control('', Validators.required),
      productName: this.builder.control(''),
      qty: this.builder.control(1),
      salesPrice: this.builder.control(0),
      total: this.builder.control({ value: 0, disabled: true }),
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
  }

  SetEditInfo(invoiceNo: any) {
    this.service.GetInvHeaderByCode(invoiceNo).subscribe(res => {
      let editData: any;
      editData = res;
      if (editData != null) {
        this.invoiceForm.setValue({
          invoiceNo: editData.invoiceNo, customerId: editData.customerId,
          customerName: editData.customerName, deliveryAddress: editData.deliveryAddress, remarks: editData.remarks,
          total: editData.total, tax: editData.tax, netTotal: editData.netTotal, details: []
        })
      }
    })
  }

  SaveInvoice() {
    if (this.invoiceForm.valid) {
      this.service.SaveInvoice(this.invoiceForm.getRawValue()).subscribe(res => {
        this.toastr.success('Created Successfully', 'Invoice No')
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
        this.invoiceForm.get("deliveryAddress")?.setValue(customData.address + ' ,' + customData.phone + ' ,' + customData.email)
        this.invoiceForm.get("customerName")?.setValue(customData.name)
      }
    })
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
    let total = qty * price;
    this.invoiceProduct.get("total")?.setValue(total)

    this.SummaryCalculation();
  }
  SummaryCalculation() {
    let array = this.invoiceForm.getRawValue().details;
    let sumTotal = 0;
    array.forEach((x: any) => {
      sumTotal = sumTotal + x.total;
    });

    //tax 
    // let sumTax=((7/100)*sumTotal).toPrecision(2);
    let sumTax = (7 / 100) * sumTotal;
    let netTotal = sumTotal + sumTax;

    this.invoiceForm.get("total")?.setValue(sumTotal)
    this.invoiceForm.get("tax")?.setValue(sumTax)
    this.invoiceForm.get("netTotal")?.setValue(netTotal)

  }
}
