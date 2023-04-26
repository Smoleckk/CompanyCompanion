import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  apiUrlInvoice = 'https://localhost:7037/api/Dashboard/';

  constructor(private http: HttpClient) {}

  getInvoicePaidStatus() {
    return this.http.get(this.apiUrlInvoice + 'invoice-paid-status');
  }
  getInvoicePaidTotalStatus() {
    return this.http.get(this.apiUrlInvoice + 'invoice-paid-total-status');
  }
  getInvoiceIssueDateStatus() {
    return this.http.get(this.apiUrlInvoice + 'invoice-date-issued-status');
  }
  getInvoiceNumberCustomerStatus() {
    return this.http.get(this.apiUrlInvoice + 'invoice-number-customer-status');
  }
  getProductStatus() {
    return this.http.get(this.apiUrlInvoice + 'product-status');
  }
}
