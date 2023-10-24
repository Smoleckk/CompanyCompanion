import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerUpdatePopupComponent } from '../customer-update-popup/customer-update-popup.component';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}
  isCustomer: string;

  ngOnInit(): void {
    this.editCustomerId = this.activeRoute.snapshot.paramMap.get('customerId');
    if (this.editCustomerId != null) {
      this.SetEditInfo(this.editCustomerId);
    }
  }
  dataSource = new MatTableDataSource<any>();

  editCustomerId: any;

  customerForm = this.builder.group({
    customerId: ['', Validators.required],
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  SetEditInfo(customerIdCode: any) {
    this.service.getCustomerByCode(customerIdCode).subscribe((res) => {
      let editData: any;
      editData = res;

      if (editData != null) {
        this.customerForm.setValue({
          customerId: editData.customerId,
          customerName: editData.customerName,
          customerNip: editData.customerNip,
          customerCity: editData.customerCity,
          customerAddress: editData.customerAddress,
        });
      }
      console.log(editData.customerName);
      this.isCustomer = editData.customerName || '';
    });
  }

  updateCustomer(): void {
    const popup = this.dialog.open(CustomerUpdatePopupComponent, {
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width: '40%',
      data: this.editCustomerId,
    });

    popup.afterClosed().subscribe(() => {
      this.SetEditInfo(this.editCustomerId);
    });
  }
}
