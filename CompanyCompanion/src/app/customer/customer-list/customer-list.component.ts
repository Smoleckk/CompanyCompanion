import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerCreatePopupComponent } from '../customer-create-popup/customer-create-popup.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
})
export class CustomerListComponent {
  constructor(
    private service: CustomerService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.LoadCustomers();
  }
  customerData: any;
  dataSource: any;
  displayedColumns: string[] = [
    'customerName',
    'customerNip',
    'customerCity',
    'customerAddress',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {}

  LoadCustomers() {
    this.service.GetCustomers().subscribe((data) => {
      console.log(data);

      this.customerData = data;
      this.dataSource = new MatTableDataSource(this.customerData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  DeleteCustomer(code: any) {
    this.service.DeleteCustomerByCode(code).subscribe(() => {
      this.toastr.success('Deleted successfully');
      this.LoadCustomers();
    });
  }

  // UpdateProduct(code: any) {
  //   const popup = this.dialog.open(UpdateProductPopupComponent, {
  //     enterAnimationDuration: '1000ms',
  //     exitAnimationDuration: '500ms',
  //     width: '50%',
  //     data: {
  //       code: code
  //     }
  //   })
  //   popup.afterClosed().subscribe(() => {
  //     this.LoadCustomers();
  //   })
  // }
  CreateCustomer() {
    const popup = this.dialog.open(CustomerCreatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '50%',
    });
    popup.afterClosed().subscribe(() => {
      this.LoadCustomers();
    });
  }
}
