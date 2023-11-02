import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { CustomerCreatePopupComponent } from 'src/app/customer/customer-create-popup/customer-create-popup.component';
import { InvoiceService } from 'src/app/service/invoice.service';
import { ProfileService } from 'src/app/service/profile.service';
import { ProformaService } from '../../service/proforma.service';
import { TranslocoService } from '@ngneat/transloco';
import { PaymentStatus } from 'src/app/models/paymentStatus';
import { IssuedStatus } from 'src/app/models/issuedStatus';
import { PaymentType } from 'src/app/models/paymentType';
import { ProformaFormValue } from 'src/app/models/ProformaFormValue';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Product } from 'src/app/models/product';
import { UserProfile } from 'src/app/models/userProfile';

@Component({
  selector: 'app-proforma-create',
  templateUrl: './proforma-create.component.html',
  styleUrls: ['./proforma-create.component.scss'],
})
export class ProformaCreateComponent implements OnInit {
  @ViewChild('content', { static: false }) el!: ElementRef;

  constructor(
    private builder: FormBuilder,
    private customerService: CustomerService,
    private invoiceService: InvoiceService,
    private serviceProforma: ProformaService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private profileService: ProfileService,
    private readonly translocoService: TranslocoService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getCustomers();
    this.showInvoiceNumber();
    this.getProfile();
    this.calculateBreakpoints(window.innerWidth);
    this.editProformaId = this.activeRoute.snapshot.paramMap.get(
      'proformaId'
    ) as string;

    if (this.editProformaId != null) {
      this.isEdit = true;
      this.SetEditInfo(this.editProformaId);
    }
  }
  onResize(event: any) {
    this.calculateBreakpoints(event.target.innerWidth);
  }
  breakpoint2: number;
  breakpoint3: number;
  breakpoint4: number;
  breakpoint9: number;
  colspan3: number;

  issuedStatus: IssuedStatus[] = [
    {
      name: this.translocoService.translate('invoiceFormSelect.issued'),
      value: true,
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.notIssued'),
      value: false,
    },
  ];

  paymentStatus: PaymentStatus[] = [
    {
      name: this.translocoService.translate('invoiceFormSelect.paid'),
      value: 'Paid',
    },
    {
      name: this.translocoService.translate('invoiceFormSelect.unpaid'),
      value: 'Unpaid',
    },
  ];

  paymentType: PaymentType[] = [
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

  getCustomer: Customer[];
  editProformaId: string;
  isEdit:boolean = false;
  isGeneratedShow: boolean = false;
  customerFullName: string = '';
  customerHoldOnlyName: string = '';
  proformaNoIsEdit: string;
  isTempProformaNumber: boolean = false;

  proformaForm :FormGroup = this.builder.group({
    proformaId: [0],
    proformaNo: [''],
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

  SetEditInfo(invoiceIdCode: string): void {
    this.serviceProforma
      .GetProformaHeaderByCode(invoiceIdCode)
      .subscribe((editData: ProformaFormValue) => {
        if (editData != null) {
          this.proformaNoIsEdit = editData.proformaNo;
          this.isTempProformaNumber =
            this.proformaNoIsEdit.indexOf('Temp') === 0;
          this.customerFullName = this.formatCustomerFullName(editData);
          this.customerHoldOnlyName = editData.customerName;
          this.proformaForm.patchValue({
            ...editData,
            products: [],
          });
          editData.products.forEach((product: Product) => {
            this.products.push(this.createProductFormGroup(product));
          });
        }
      });
  }

  SaveProforma(): void {
    if (this.proformaForm.valid) {
      if (this.isEdit) {
        this.serviceProforma
          .EditProforma(this.proformaForm.getRawValue())
          .subscribe(() => {
            this.translocoService.translate('toaster.toasterUpdateSuccess');
            this.router.navigate(['/proforma-list']);
          });
      } else {
        this.serviceProforma
          .SaveProforma(this.proformaForm.getRawValue())
          .subscribe(() => {
            this.translocoService.translate('toaster.toasterCreatedSuccess');
            this.router.navigate(['/proforma-list']);
          });
      }
    } else {
      this.toastr.warning(
        this.translocoService.translate('toaster.toasterWrongInputData')
      );
    }
  }

  ShowProformaNumber(): void {
    this.isGeneratedShow = this.proformaForm.get('isGenerated')
      ?.value as boolean;
  }

  SetEditInfoProforma(proformaId: string) {
    this.serviceProforma
      .GetProformaHeaderByCode(proformaId)
      .subscribe((editData: ProformaFormValue) => {
        if (editData != null) {
          this.customerFullName = this.formatCustomerFullName(editData);
          this.customerHoldOnlyName = editData.customerName;
          this.proformaForm.patchValue({
            ...editData,
            // products: editData.products,
            proformaId: editData.proformaId,
            proformaNo: editData.proformaNo,
          });
        }
        editData.products.forEach((product: any) => {
          this.products.push(this.createProductFormGroup(product));
        });
      });
  }
  get products() {
    return this.proformaForm.controls['products'] as FormArray;
  }
  getProfile() {
    this.profileService.getProfile().subscribe((profile:UserProfile) => {
      if (profile != null) {
        this.proformaForm.get('sellerIdName')?.patchValue(profile.name);
        this.proformaForm.get('sellerNip')?.patchValue(profile.nip);
        this.proformaForm
          .get('sellerDeliveryAddress')
          ?.patchValue(profile.city);
        this.proformaForm
          .get('sellerCityCode')
          ?.patchValue(profile.cityCode);
      }
    });
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe((res: Customer[]) => {
      this.getCustomer = res;
    });
  }

  CustomerChange(event: any) {
    this.customerService
      .getCustomerByCode(event.value)
      .subscribe((customData: Customer) => {
        if (customData != null) {
          this.proformaForm
            .get('customerDeliveryAddress')
            ?.patchValue(customData.customerAddress);
          this.proformaForm
            .get('customerCityCode')
            ?.patchValue(customData.customerCity);
          this.proformaForm
            .get('customerName')
            ?.patchValue(customData.customerName);
          this.proformaForm
            .get('customerNip')
            ?.patchValue(customData.customerNip);
          this.customerFullName = this.formatCustomerFullName(customData);
          this.customerHoldOnlyName = customData.customerName;
        }
      });
  }
  showInvoiceNumber(): void {
    this.isGeneratedShow = this.proformaForm.get('isGenerated')
      ?.value as boolean;
  }
  createProductFormGroup(product: Product): FormGroup {
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
  makePdf(): void {
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
