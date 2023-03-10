import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  constructor(private service: InvoiceService, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.LoadInvoice();
  }

  invoiceHeader: any;
  dataSource: any;
  displayedColumns: string[] = ['Invoice No', 'Customer', 'Remarks', 'Total', 'Tax', 'NetTotal', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  LoadInvoice() {
    this.service.GetAllInvoice().subscribe(res => {
      this.invoiceHeader = res;
      this.dataSource = new MatTableDataSource(this.invoiceHeader);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  InvoiceRemove(invoiceNo: any) {
    if (confirm('Do you want to remove this Invoice :' + invoiceNo)) {
      this.service.RemoveInvoice(invoiceNo).subscribe(res => {
        this.toastr.success('Deleted Successfully', 'Remove Invoice')
        this.LoadInvoice();
      })
    }
  }
  InvoiceEdit(invoiceNo: any) {
    this.router.navigateByUrl('/edit-invoice/' + invoiceNo)
  }


}
