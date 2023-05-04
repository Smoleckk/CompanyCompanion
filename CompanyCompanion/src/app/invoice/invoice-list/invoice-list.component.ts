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

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  constructor(
    private invoiceService: InvoiceService,
    private toastrService: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  displayedColumns: string[] = ['Invoice No', 'Customer', 'NetTotal', 'Action'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.loadInvoices();
    
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });

  }

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['Invoice No', 'Customer', 'Action'];
    } else {
      this.displayedColumns = ['Invoice No', 'Customer', 'NetTotal', 'Action'];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  loadInvoices(): void {
    this.invoiceService.GetAllInvoice().subscribe((invoices: any) => {
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
      width: '50%',
      data: {
        code: code,
      },
    });
  }
  downloadInvoiceSecond(code: any): void {
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
