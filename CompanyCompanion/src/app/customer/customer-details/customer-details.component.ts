import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/service/customer.service';
import { CustomerUpdatePopupComponent } from '../customer-update-popup/customer-update-popup.component';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  isCustomer: string;
  editCustomerId: string;

  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  customerForm :FormGroup = this.builder.group({
    customerId: ['', Validators.required],
    customerName: ['', Validators.required],
    customerNip: ['', Validators.required],
    customerCity: ['', Validators.required],
    customerAddress: ['', Validators.required],
  });

  ngOnInit(): void {
    this.editCustomerId = this.activeRoute.snapshot.paramMap.get('customerId') as string;
    if (this.editCustomerId != null) {
      this.setEditInfo(this.editCustomerId);
    }
  }

  setEditInfo(customerIdCode: any) {
    this.service.getCustomerByCode(customerIdCode).subscribe((editData:Customer) => {
      if (editData != null) {
        this.customerForm.setValue({
          ...editData,
        });
      }
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
      this.setEditInfo(this.editCustomerId);
    });
  }
}
