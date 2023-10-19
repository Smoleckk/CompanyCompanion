import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoicePrintPopupComponent } from '../invoice-print-popup/invoice-print-popup.component';
import { InvoiceService } from '../../service/invoice.service';
import { InvoicePrintSecondPopupComponent } from '../invoice-print-second-popup/invoice-print-second-popup.component';
import { ProfileService } from 'src/app/service/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ProformaService } from 'src/app/service/proforma.service';
import { ProformaPrintPopupComponent } from 'src/app/proforma/proforma-print-popup/proforma-print-popup.component';

@Component({
  selector: 'app-invoice-review',
  templateUrl: './invoice-review.component.html',
  styleUrls: ['./invoice-review.component.scss'],
})
export class InvoiceReviewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private builder: FormBuilder,
    private profileService: ProfileService,
    private proformaService: ProformaService
  ) {}

  dataSource = new MatTableDataSource<any>();
  dataSourceDelay = new MatTableDataSource<any>();
  dataSourceDraft = new MatTableDataSource<any>();
  isDataSource: any;
  isDataSourceDelay: any;
  isDataSourceDraft: any;

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


  ngOnInit(): void {
    this.loadInvoices();
    this.SetEditInfo();
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }
  profileForm = this.builder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    name: ['', Validators.required],
    nip: ['', Validators.required],
    city: ['', Validators.required],
    cityCode: ['', Validators.required],
    template: ['', Validators.required],
  });

  SetEditInfo() {
    this.profileService.getProfile().subscribe((res) => {
      let editData: any;
      editData = res;

      if (editData != null) {
        this.profileForm.setValue({
          username: editData.username,
          email: editData.email,
          name: editData.name,
          nip: editData.nip,
          city: editData.city,
          cityCode: editData.cityCode,
          template: editData.template,
        });
      }
    });
  }
  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['invoiceNo', 'customerName', 'dueDate'];
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
  applyFilterDelay(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDelay.filter = filterValue.trim().toLowerCase();
  }
  applyFilterDraft(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDelay.filter = filterValue.trim().toLowerCase();
  }
  loadInvoices(): void {
    this.invoiceService.GetAllInvoicePaid().subscribe((invoices: any) => {
      this.isDataSource = invoices;
      this.dataSource.data = invoices;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // this.proformaService.GetAllProforma().subscribe((res: any) => {
    //   const data = this.dataSource.data;
    //   for (var product of res) {
    //     data.push(product);
    //   }
    //   this.dataSource.data = data;
    //   this.isDataSource = data;
    //   this.dataSource.data = data;
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
    this.invoiceService.GetAllInvoiceDelay().subscribe((invoices: any) => {
      this.isDataSourceDelay = invoices;
      this.dataSourceDelay.data = invoices;
      this.dataSourceDelay.paginator = this.paginator;
      this.dataSourceDelay.sort = this.sort;
    });
    this.invoiceService.GetAllInvoiceDraft().subscribe((invoices: any) => {
      this.isDataSourceDraft = invoices;
      this.dataSourceDraft.data = invoices;
      this.dataSourceDraft.paginator = this.paginator;
      this.dataSourceDraft.sort = this.sort;
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
  ProformaRemove(proformaId: any) {
    if (confirm('Do you want to remove this Proforma :' + proformaId)) {
      this.proformaService.RemoveProforma(proformaId).subscribe((res) => {
        this.toastrService.success('Deleted Successfully', 'Remove Proforma');
        this.loadInvoices();
      });
    }
  }
  ProformaEdit(proformaId: any) {
    this.router.navigateByUrl('/edit-proforma/' + proformaId);
  }
  ProformaDownload(code: any) {
    const popup = this.dialog.open(ProformaPrintPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        code: code,
      },
    });
  }

  downloadInvoice(code: any): void {
    if (this.profileForm.value.template == 'first') {
      const popup = this.dialog.open(InvoicePrintPopupComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: {
          code: code,
        },
      });
    } else {
      const popup = this.dialog.open(InvoicePrintSecondPopupComponent, {
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '500ms',
        width: '50%',
        data: {
          code: code,
        },
      });
    }
  }
}
