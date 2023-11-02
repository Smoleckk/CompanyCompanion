import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent {
  constructor(private router: Router) {}

  addInvoice(): void {
    this.router.navigateByUrl(`/create-invoice`);
  }
}
