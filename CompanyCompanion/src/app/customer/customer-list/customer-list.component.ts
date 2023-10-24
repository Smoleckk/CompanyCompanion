import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerCreatePopupComponent } from '../customer-create-popup/customer-create-popup.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private router: Router,
    private readonly translocoService: TranslocoService

  ) {}

  customerData: any;
  dataSource = new MatTableDataSource<any>();

  displayedColumns: string[] = [
    'customerName',
    'customerNip',
    'customerCity',
    'customerAddress',
    'action',
  ];
  columns: any = [
    {
      matColumnDef: 'customerName',
      matHeaderCellDef: this.translocoService.translate('customerTableHeader.customerName'),
      matCellDef: 'customerName',
    },
    {
      matColumnDef: 'customerNip',
      matHeaderCellDef: this.translocoService.translate('customerTableHeader.customerNip'),
      matCellDef: 'customerNip',
    },
    {
      matColumnDef: 'customerCity',
      matHeaderCellDef: this.translocoService.translate('customerTableHeader.customerCity'),
      matCellDef: 'customerCity',
    },
    {
      matColumnDef: 'customerAddress',
      matHeaderCellDef: this.translocoService.translate('customerTableHeader.customerAddress'),
      matCellDef: 'customerAddress',
    },
  ];
  actionButtons = [
    {
      color: 'primary',
      icon: 'info',
      function: (element: any) => this.detailsCustomer(element.customerId),
    },
    {
      color: 'warn',
      icon: 'delete',
      function: (element: any) => this.deleteCustomer(element.customerId),
    },
  ];

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.service.getCustomers().subscribe((data) => {
      this.customerData = data;
      this.dataSource = new MatTableDataSource(this.customerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteCustomer(code: any): void {
    this.service.deleteCustomerByCode(code).subscribe(() => {
      this.toastr.success('Deleted successfully');
      this.loadCustomers();
    });
  }
  detailsCustomer(code: any): void {
    this.router.navigateByUrl('/customer/' + code);
  }

  createCustomer(): void {
    const popup = this.dialog.open(CustomerCreatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '700px',
    });
    popup.afterClosed().subscribe(() => {
      this.loadCustomers();
    });
  }
}
