import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { CustomerCreatePopupComponent } from 'src/app/customer/customer-create-popup/customer-create-popup.component';
import { ProfileService } from 'src/app/service/profile.service';
import { InvoiceService } from '../../service/invoice.service';
import { ProformaService } from '../../service/proforma.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.scss'],
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private builder: FormBuilder,
    private service: InvoiceService,
    private serviceProforma: ProformaService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService,
    private dialog: MatDialog,
    private readonly translocoService: TranslocoService
  ) {}
  ngOnInit(): void {
    this.getCustomers();
    this.showInvoiceNumber();
    this.getProfile();
    this.calculateBreakpoints(window.innerWidth);
    this.editInvoiceId = this.activeRoute.snapshot.paramMap.get('invoiceId');
    this.invoiceFromProformaId =
      this.activeRoute.snapshot.paramMap.get('proformaId');

    if (this.editInvoiceId != null) {
      this.pageTitle = 'Edit Invoice';
      this.isEdit = true;
      this.SetEditInfo(this.editInvoiceId);
    }

    if (this.invoiceFromProformaId != null) {
      this.pageTitle = 'Invoice from proforma';
      this.isEdit = true;
      this.SetEditInfoProforma(this.invoiceFromProformaId);
    }
  }
  onResize(event: any) {
    this.calculateBreakpoints(event.target.innerWidth);
  }
  breakpoint2: any;
  breakpoint3: any;
  breakpoint4: any;
  breakpoint9: any;
  colspan3: any;

  issuedStatus = [
    {
      name: this.translocoService.translate('invoiceFormSelect.issued'),
      value: true,
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.notIssued'),
      value: false,
    },
  ];

  paymentStatus = [
    {
      name: this.translocoService.translate('invoiceFormSelect.paid'),
      value: 'Paid',
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.unpaid'),
      value: 'Unpaid',
    },
  ];

  paymentType = [
    {
      name: this.translocoService.translate('invoiceFormSelect.cash'),
      value: 'Cash',
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.blik'),
      value: 'Blik',
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.bankTransfer'),
      value: 'Bank transfer',
    },
  ];
  pageTitle = 'New invoice';
  invoiceDetail!: FormArray<any>;
  getCustomer: any;
  editInvoiceId: any;
  invoiceFromProformaId: any;
  isEdit = false;
  invoiceNoIsEdit: any;
  isGeneratedShow: boolean = false;
  editInvoiceDetail: any;
  customerFullName: any = '';
  customerHoldOnlyName: any = '';
  isTempInvoiceNumber: any = false;

  invoiceForm = this.builder.group({
    invoiceId: [0],
    invoiceNo: [''],
    placeOfIssue: [''],
    dateIssued: [''],
    dueDate: [''],
    invoiceDate: [''],
    customerName: [''],
    customerNip: [''],
    customerDeliveryAddress: [''],
    customerCityCode: [''],
    sellerId: [''],
    sellerIdName: [''],
    sellerNip: [''],
    sellerDeliveryAddress: [''],
    sellerCityCode: [''],
    total: [''],
    tax: [''],
    netTotal: [''],
    paymentStatus: [''],
    paymentType: [''],
    accountNumber: [''],
    paymentDescription: [''],
    remarks: [''],
    products: this.builder.array([]),
    isGenerated: [false],
  });
  SetEditInfo(invoiceIdCode: any) {
    this.service.GetInvByCode(invoiceIdCode).subscribe((editData: any) => {
      if (editData != null) {
        this.invoiceNoIsEdit = editData.invoiceNo;
        this.isTempInvoiceNumber = this.invoiceNoIsEdit.indexOf('Temp') === 0;
        this.customerFullName = this.formatCustomerFullName(editData);
        this.customerHoldOnlyName = editData.customerName;
        this.invoiceForm.patchValue({
          ...editData,
          products: [],
        });
        editData.products.forEach((product: any) => {
          this.products.push(this.createProductFormGroup(product));
        });
      }
    });
  }

  SetEditInfoProforma(proformaId: any) {
    this.serviceProforma
      .GetProformaHeaderByCode(proformaId)
      .subscribe((editData: any) => {
        if (editData != null) {
          this.customerFullName = this.formatCustomerFullName(editData);
          this.customerHoldOnlyName = editData.customerName;
          this.invoiceForm.patchValue({
            ...editData,
            // products: editData.products,
            invoiceId: editData.proformaId,
            invoiceNo: editData.proformaNo,
          });
        }
        editData.products.forEach((product: any) => {
          this.products.push(this.createProductFormGroup(product));
        });
      });
  }
  get products() {
    return this.invoiceForm.controls['products'] as FormArray;
  }
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

  SaveInvoice() {
    console.log(this.invoiceForm.value);
    
    this.invoiceForm.markAllAsTouched();
    if (this.invoiceForm.valid) {
      if (this.invoiceFromProformaId != null) {
        this.service
          .SaveInvoice(this.invoiceForm.getRawValue())
          .subscribe(() => {
            this.toastr.success(
              this.translocoService.translate('toaster.toasterCreatedSuccess')
            );
            this.router.navigate(['/invoice-list']);
          });
      } else if (this.isEdit) {
        this.service
          .EditInvoice(this.invoiceForm.getRawValue())
          .subscribe(() => {
            this.toastr.success(
              this.translocoService.translate('toaster.toasterUpdateSuccess')
            );
            this.router.navigate(['/invoice-list']);
          });
      } else {
        this.service
          .SaveInvoice(this.invoiceForm.getRawValue())
          .subscribe(() => {
            this.toastr.success(
              this.translocoService.translate('toaster.toasterCreatedSuccess')
            );
            this.router.navigate(['/invoice-list']);
          });
      }
    } else {
      this.toastr.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }

  getCustomers() {
    this.service.GetCustomer().subscribe((res) => {
      this.getCustomer = res;
    });
  }

  CustomerChange(event: any) {
    this.service.getCustomerByCode(event.value).subscribe((customData: any) => {
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
        this.customerFullName = this.formatCustomerFullName(customData);
        this.customerHoldOnlyName = customData.customerName;
      }
    });
  }
  showInvoiceNumber() {
    this.isGeneratedShow = this.invoiceForm.get('isGenerated')
      ?.value as boolean;
  }
  createProductFormGroup(product: any): FormGroup {
    return this.builder.group({
      productCode: [product.productCode],
      productName: [product.productName],
      qty: [product.qty],
      unit: [product.unit],
      salesPrice: [product.salesPrice],
      vat: [product.vat],
      bruttoPrice: [product.bruttoPrice],
      nettoPrice: [product.nettoPrice],
    });
  }
  formatCustomerFullName(editData: any): string {
    const customerFullName =
      editData.customerName +
      '<br>' +
      editData.customerDeliveryAddress +
      '<br>' +
      editData.customerCityCode +
      '<br> NIP: ' +
      editData.customerNip;
    return customerFullName;
  }
  calculateBreakpoints(windowWidth: number): void {
    this.breakpoint2 = windowWidth <= 850 ? 1 : 2;
    this.breakpoint3 = windowWidth <= 850 ? 1 : 3;
    this.breakpoint4 = windowWidth <= 850 ? 2 : 4;
    this.breakpoint9 = windowWidth <= 850 ? 3 : 9;
    this.colspan3 = windowWidth <= 850 ? 2 : 3;
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
