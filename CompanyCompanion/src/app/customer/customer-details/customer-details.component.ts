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

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['Invoice No', 'Customer', 'Action'];
    } else {
      this.displayedColumns = ['Invoice No', 'Customer','DueDate','DateIssued', 'Total', 'Action'];
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

  customerForm = this.builder.group({
    customerId: ['', Validators.required],
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });
  customerInvoices: any;

  SetEditInfo(customerIdCode: any) {
    this.service.getCustomerByCode(customerIdCode).subscribe((res) => {
      let editData: any;
      editData = res;
      // console.log(editData);

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
  updateCustomer(): void {
    console.log(this.editCustomerId);
    
    const popup = this.dialog.open(CustomerUpdatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      data:  this.editCustomerId,
    });

    popup.afterClosed().subscribe(() => {
      this.SetEditInfo(this.editCustomerId);
    });
  }

  /////////////////
  displayedColumns: string[] = ['Invoice No', 'Customer','DueDate','DateIssued', 'Total', 'Action'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loadInvoices(): void {
    let getCustomerName = this.customerForm.get('customerName')?.value;

    this.invoiceService
      .GetCustomerInvoices(getCustomerName)
      .subscribe((invoices: any) => {
        // console.log(invoices);

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
