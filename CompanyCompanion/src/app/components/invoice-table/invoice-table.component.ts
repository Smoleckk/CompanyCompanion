import { Component, Input, ViewChild, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../../service/invoice.service';
import { ProfileService } from 'src/app/service/profile.service';
import { FormBuilder, Validators } from '@angular/forms';
import { InvoicePrintPopupComponent } from 'src/app/invoice/invoice-print-popup/invoice-print-popup.component';
import { InvoicePrintSecondPopupComponent } from 'src/app/invoice/invoice-print-second-popup/invoice-print-second-popup.component';
import { TranslocoService } from '@ngneat/transloco';
import { Invoice } from 'src/app/models/invoice';
import { UserProfile } from 'src/app/models/userProfile';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss'],
})
export class InvoiceTableComponent {
  @Input() few: string;
  @Input() isCustomer: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog,
    private builder: FormBuilder,
    private readonly translocoService: TranslocoService,
    private profileService: ProfileService
  ) {}

  dataSource = new MatTableDataSource<Invoice>();

  displayedColumns: string[] = [
    'invoiceNo',
    'customerName',
    'dueDate',
    'dateIssued',
    'total',
    'action',
  ];
  columns = [
    {
      matColumnDef: 'invoiceNo',
      matHeaderCellDef: this.translocoService.translate(
        'invoiceTableHeader.invoiceNo'
      ),
      matCellDef: 'invoiceNo',
    },
    {
      matColumnDef: 'customerName',
      matHeaderCellDef: this.translocoService.translate(
        'invoiceTableHeader.customerName'
      ),
      matCellDef: 'customerName',
    },
    {
      matColumnDef: 'total',
      matHeaderCellDef: this.translocoService.translate(
        'invoiceTableHeader.total'
      ),
      matCellDef: 'total',
    },
    {
      matColumnDef: 'dueDate',
      matHeaderCellDef: this.translocoService.translate(
        'invoiceTableHeader.dueDate'
      ),
      matCellDef: 'dueDate',
    },
    {
      matColumnDef: 'dateIssued',
      matHeaderCellDef: this.translocoService.translate(
        'invoiceTableHeader.dateIssued'
      ),
      matCellDef: 'dateIssued',
    },
  ];

  actionButtons = [
    {
      color: 'primary',
      icon: 'print',
      function: (element: any) => this.downloadInvoice(element.invoiceId),
    },
    {
      color: 'primary',
      icon: 'edit',
      function: (element: any) => this.editInvoice(element.invoiceId),
    },
    {
      color: 'warn',
      icon: 'delete',
      function: (element: any) => this.removeInvoice(element.invoiceId),
    },
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
    template: ['', Validators.required],
  });

  SetEditInfo() {
    this.profileService.getProfile().subscribe((editData: UserProfile) => {
      if (editData != null) {
        this.profileForm.setValue({
          template: editData.template,
        });
      }
    });
  }
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
  loadInvoices(): void {
    this.invoiceService
      .getFewInvoice(this.few, this.isCustomer)
      .subscribe((invoices: Invoice[]) => {
        this.dataSource.data = invoices;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  public removeInvoice(invoiceId: any): void {
    if (
      confirm(
        this.translocoService.translate('toaster.toasterConfirm') + invoiceId
      )
    ) {
      this.invoiceService.removeInvoice(invoiceId).subscribe(() => {
        this.toastrService.success(
          this.translocoService.translate('toaster.toasterDeletedSuccess')
        );
        this.loadInvoices();
      });
    }
  }

  editInvoice(invoiceId: any): void {
    this.router.navigateByUrl(`/edit-invoice/${invoiceId}`);
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
