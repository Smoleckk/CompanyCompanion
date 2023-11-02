import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProformaService } from 'src/app/service/proforma.service';
import { ProformaPrintPopupComponent } from '../proforma-print-popup/proforma-print-popup.component';
import { TranslocoService } from '@ngneat/transloco';
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
    private readonly translocoService: TranslocoService,
    private dialog: MatDialog
  ) {}
  dataSource: any;

  displayedColumns: string[] = [
    'proformaNo',
    'customerName',
    'dueDate',
    'dateIssued',
    'total',
    'action',
  ];
  
  columns = [
    {
      matColumnDef: 'proformaNo',
      matHeaderCellDef: this.translocoService.translate('invoiceTableHeader.invoiceNo'),
      matCellDef: 'proformaNo',
    },
    {
      matColumnDef: 'customerName',
      matHeaderCellDef: this.translocoService.translate('invoiceTableHeader.customerName'),
      matCellDef: 'customerName',
    },
    {
      matColumnDef: 'total',
      matHeaderCellDef: this.translocoService.translate('invoiceTableHeader.total'),
      matCellDef: 'total',
    },
    {
      matColumnDef: 'dueDate',
      matHeaderCellDef: this.translocoService.translate('invoiceTableHeader.dueDate'),
      matCellDef: 'dueDate',
    },
    {
      matColumnDef: 'dateIssued',
      matHeaderCellDef: this.translocoService.translate('invoiceTableHeader.dateIssued'),
      matCellDef: 'dateIssued',
    },
  ];
  actionButtons = [
    { color: 'primary', icon: 'edit', function: (element:any) => this.proformaEdit(element.proformaId) },
    { color: 'primary', icon: 'print', function: (element:any) => this.proformaDownload(element.proformaId) },
    { color: 'warn', icon: 'delete', function: (element:any) => this.proformaRemove(element.proformaId) },
    { color: 'primary', icon: 'bookmarks', function: (element:any) => this.generateInvoiceFormProforma(element.proformaId) }
  ];

  ngOnInit(): void {
    this.loadProforma();
    
    this.onResize();
    window.addEventListener('resize', () => {
      this.onResize();
    });
  }

  onResize() {
    if (window.innerWidth <= 850) {
      this.displayedColumns = ['proformaNo', 'customerName', 'action'];
    } else {
      this.displayedColumns = [
        'proformaNo',
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
  loadProforma() {
    this.service.getAllProforma().subscribe((proformas) => {
      this.dataSource = new MatTableDataSource(proformas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  proformaRemove(proformaId: string) {
    if (confirm('Do you want to remove this Proforma :' + proformaId)) {
      this.service.removeProforma(proformaId).subscribe(() => {
        this.toastr.success('Deleted Successfully', 'Remove Proforma');
        this.loadProforma();
      });
    }
  }
  proformaEdit(proformaId: string) {
    this.router.navigateByUrl('/edit-proforma/' + proformaId);
  }
  generateInvoiceFormProforma(proformaId: string) {
    this.router.navigateByUrl('/invoice-from-proforma/' + proformaId);
  }
  addProforma(): void {
    this.router.navigateByUrl(`/create-proforma`);
  }
  proformaDownload(code: string) {
    this.dialog.open(ProformaPrintPopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
      data: {
        code: code,
      },
    });
  }
}
