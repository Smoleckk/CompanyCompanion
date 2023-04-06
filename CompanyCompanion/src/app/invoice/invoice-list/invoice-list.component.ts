import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoicePrintPopupComponent } from '../invoice-print-popup/invoice-print-popup.component';
import { InvoiceService } from '../../service/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  constructor(private service: InvoiceService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.LoadInvoice();
  }
  invoiceHeader: any;
  dataSource: any;
  displayedColumns: string[] = ['Invoice No', 'Customer', 'NetTotal', 'Action'];
  // 'Remarks', 'Total', 'Tax',
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  LoadInvoice() {
    this.service.GetAllInvoice().subscribe(res => {
       console.log(res);
      
      this.invoiceHeader = res;
      this.dataSource = new MatTableDataSource(this.invoiceHeader);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  InvoiceRemove(invoiceId: any) {
    if (confirm('Do you want to remove this Invoice :' + invoiceId)) {
      this.service.RemoveInvoice(invoiceId).subscribe(res => {
        this.toastr.success('Deleted Successfully', 'Remove Invoice')
        this.LoadInvoice();
      })
    }
  }
  InvoiceEdit(invoiceId: any) {
    this.router.navigateByUrl('/edit-invoice/' + invoiceId)
  }
  InvoiceDownload(code: any) {
    console.log(code);
    
    const popup = this.dialog.open(InvoicePrintPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        code: code
      }
    })
  }

}
