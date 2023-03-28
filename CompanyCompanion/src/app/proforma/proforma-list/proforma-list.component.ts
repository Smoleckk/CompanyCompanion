import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProformaService } from 'src/app/service/proforma.service';
import { ProformaPrintPopupComponent } from '../proforma-print-popup/proforma-print-popup.component';
@Component({
  selector: 'app-proforma-list',
  templateUrl: './proforma-list.component.html',
  styleUrls: ['./proforma-list.component.scss']
})
export class ProformaListComponent implements OnInit {

  constructor(private service: ProformaService, private toastr: ToastrService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.LoadProforma();
  }

  proformaHeader: any;
  dataSource: any;
  displayedColumns: string[] = ['Proforma No', 'Customer', 'NetTotal', 'Action'];
  // , 'Remarks', 'Total', 'Tax',
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  LoadProforma() {
    this.service.GetAllProforma().subscribe(res => {
      console.log(res);
      
      this.proformaHeader = res;
      this.dataSource = new MatTableDataSource(this.proformaHeader);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
  ProformaRemove(proformaId: any) {
    if (confirm('Do you want to remove this Proforma :' + proformaId)) {
      this.service.RemoveProforma(proformaId).subscribe(res => {
        this.toastr.success('Deleted Successfully', 'Remove Proforma')
        this.LoadProforma();
      })
    }
  }
  ProformaEdit(proformaId: any) {
    this.router.navigateByUrl('/edit-proforma/' + proformaId)
  }
  GenerateInvoiceFormProforma(proformaId: any) {
    this.router.navigateByUrl('/invoice-from-proforma/' + proformaId)
  }
  ProformaDownload(code: any) {
    const popup = this.dialog.open(ProformaPrintPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        code: code
      }
    })
  }

}
