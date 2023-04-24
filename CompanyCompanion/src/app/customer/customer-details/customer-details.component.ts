import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
import { InvoiceService } from '../../service/invoice.service';
import { ProformaService } from '../../service/proforma.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss'],
})
export class CustomerDetailsComponent implements OnInit {
  constructor(
    private builder: FormBuilder,
    private service: CustomerService,
    private router: Router,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {

    this.editcustomerId = this.activeRoute.snapshot.paramMap.get('customerId');
    if (this.editcustomerId != null) {
      // this.pageTitle = 'Edit Customer';
      this.isEdit = true;
      this.SetEditInfo(this.editcustomerId);
    }
  }
  pageTitle = 'Customer details';
  invoiceDetail!: FormArray<any>;
  editcustomerId: any;
  isEdit = false;

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
      console.log(editData);
      
      if (editData != null) {
        this.customerForm.setValue({
          customerId: editData.customerId,
          customerName: editData.customerName,
          customerNip: editData.customerNip,
          customerCity: editData.customerCity,
          customerAddress: editData.customerAddress,
        });
      }
    });
  }

  // SaveInvoice() {
  //   if (this.customerForm.valid) {
  //     console.log(this.customerForm.getRawValue());
  //     if (this.editcustomerId != null) {
  //       this.service
  //         .SaveInvoice(this.customerForm.getRawValue())
  //         .subscribe(() => {
  //           this.toastr.success('Created Successfully', 'Invoice No');
  //           this.router.navigate(['/invoice-list']);
  //         });
  //     }
  //   } else {
  //     this.toastr.warning(
  //       'Please enter values in all mandatory field',
  //       'Validation'
  //     );
  //   }
  // }

}
