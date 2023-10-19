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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { InvoicePrintPopupComponent } from 'src/app/invoice/invoice-print-popup/invoice-print-popup.component';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from '../../service/invoice.service';
import { ProformaService } from '../../service/proforma.service';
import { CustomerUpdatePopupComponent } from '../customer-update-popup/customer-update-popup.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute,
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.editCustomerId = this.activeRoute.snapshot.paramMap.get('customerId');
    if (this.editCustomerId != null) {
      // this.pageTitle = 'Edit Customer';
      this.isEdit = true;
      this.SetEditInfo(this.editCustomerId);
    }
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'invoiceNo',
    'customerName',
    'dueDate',
    'dateIssued',
    'total',
    'action',
  ];
  columns: any = [
    {
      matColumnDef: 'invoiceNo',
      matHeaderCellDef: 'Invoice number',
      matCellDef: 'invoiceNo',
    },
    {
      matColumnDef: 'customerName',
      matHeaderCellDef: 'Customer',
      matCellDef: 'customerName',
    },
    {
      matColumnDef: 'total',
      matHeaderCellDef: 'Brutto total',
      matCellDef: 'total',
    },
    {
      matColumnDef: 'dueDate',
      matHeaderCellDef: 'Due date',
      matCellDef: 'dueDate',
    },
    {
      matColumnDef: 'dateIssued',
      matHeaderCellDef: 'Issued date',
      matCellDef: 'dateIssued',
    },
  ];

  actionButtons = [
    { color: 'primary', icon: 'print', function: (element:any) => this.downloadInvoice(element.invoiceId) },
    { color: 'primary', icon: 'edit', function: (element:any) => this.editInvoice(element.invoiceId) },
    { color: 'warn', icon: 'delete', function: (element:any) => this.removeInvoice(element.invoiceId) }
  ];
  
  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['invoiceNo', 'customerName', 'action'];
    } else {
      this.displayedColumns = [
        'invoiceNo',
        'customerName',
        'dueDate',
        'dateIssued',
        'total',
        'action',
      ];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  pageTitle = 'Customer details';
  invoiceDetail!: FormArray<any>;
  editCustomerId: any;
  isEdit = false;
  customerInvoices: any;

  customerForm = this.builder.group({
    customerId: ['', Validators.required],
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  SetEditInfo(customerIdCode: any) {
    this.service.getCustomerByCode(customerIdCode).subscribe((res) => {
      let editData: any;
      editData = res;

      if (editData != null) {
        this.customerForm.setValue({
          customerId: editData.customerId,
          customerName: editData.customerName,
          customerNip: editData.customerNip,
          customerCity: editData.customerCity,
          customerAddress: editData.customerAddress,
        });
        this.loadInvoices();
      }
    });
  }

  loadInvoices(): void {
    let getCustomerName = this.customerForm.get('customerName')?.value;

    this.invoiceService
      .GetCustomerInvoices(getCustomerName)
      .subscribe((invoices: any) => {
        this.dataSource.data = invoices;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
  removeInvoice(invoiceId: any): void {
    if (confirm('Do you want to remove this invoice: ' + invoiceId)) {
      this.invoiceService.RemoveInvoice(invoiceId).subscribe(() => {
        this.toastrService.success('Deleted successfully', 'Remove Invoice');
        this.loadInvoices();
      });
    }
  }
  editInvoice(invoiceId: any): void {
    this.router.navigateByUrl(`/edit-invoice/${invoiceId}`);
  }
  
  updateCustomer(): void {
    const popup = this.dialog.open(CustomerUpdatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      data: this.editCustomerId,
    });

    popup.afterClosed().subscribe(() => {
      this.SetEditInfo(this.editCustomerId);
    });
  }
  downloadInvoice(code: any): void {
    const popup = this.dialog.open(InvoicePrintPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '700px',
      data: {
        code: code,
      },
    });
  }
}
