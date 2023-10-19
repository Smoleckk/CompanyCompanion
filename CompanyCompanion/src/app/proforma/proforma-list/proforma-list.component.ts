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
  styleUrls: ['./proforma-list.component.scss'],
})
export class ProformaListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private service: ProformaService,
    private toastr: ToastrService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  proformaHeader: any;
  dataSource: any;

  displayedColumns: string[] = [
    'proformaNo',
    'customer',
    'dueDate',
    'dateIssued',
    'total',
    'action',
  ];
  columns: any = [
    {
      matColumnDef: 'proformaNo',
      matHeaderCellDef: 'Proforma number',
      matCellDef: 'proformaNo',
    },
    {
      matColumnDef: 'customer',
      matHeaderCellDef: 'Customer',
      matCellDef: 'customer',
    },
    {
      matColumnDef: 'dueDate',
      matHeaderCellDef: 'Due Date',
      matCellDef: 'dueDate',
    },
    {
      matColumnDef: 'dateIssued',
      matHeaderCellDef: 'Issued date',
      matCellDef: 'dateIssued',
    },
    {
      matColumnDef: 'total',
      matHeaderCellDef: 'Brutto total',
      matCellDef: 'total',
    },
  ];
  actionButtons = [
    { color: 'primary', icon: 'edit', function: (element:any) => this.ProformaEdit(element.proformaId) },
    { color: 'primary', icon: 'print', function: (element:any) => this.ProformaDownload(element.proformaId) },
    { color: 'warn', icon: 'delete', function: (element:any) => this.ProformaRemove(element.proformaId) },
    { color: 'primary', icon: 'bookmarks', function: (element:any) => this.GenerateInvoiceFormProforma(element.proformaId) }
  ];

  ngOnInit(): void {
    this.LoadProforma();

    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['proformaNo', 'customer', 'action'];
    } else {
      this.displayedColumns = [
        'proformaNo',
        'customer',
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
  LoadProforma() {
    this.service.GetAllProforma().subscribe((res) => {
      console.log(res);
      this.proformaHeader = res;
      this.dataSource = new MatTableDataSource(this.proformaHeader);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  ProformaRemove(proformaId: any) {
    if (confirm('Do you want to remove this Proforma :' + proformaId)) {
      this.service.RemoveProforma(proformaId).subscribe((res) => {
        this.toastr.success('Deleted Successfully', 'Remove Proforma');
        this.LoadProforma();
      });
    }
  }
  ProformaEdit(proformaId: any) {
    this.router.navigateByUrl('/edit-proforma/' + proformaId);
  }
  GenerateInvoiceFormProforma(proformaId: any) {
    this.router.navigateByUrl('/invoice-from-proforma/' + proformaId);
  }
  addProforma(): void {
    this.router.navigateByUrl(`/create-proforma`);
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
}
