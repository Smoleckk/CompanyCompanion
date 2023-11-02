import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartInvoice } from '../models/chartInvoice';
import { Observable } from 'rxjs';
import { ChartProduct } from '../models/chartProduct';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  apiUrlInvoice = 'https://localhost:7037/api/Dashboard/';

  constructor(private http: HttpClient) {}

  getInvoicePaidStatus(): Observable<ChartInvoice> {
    return this.http.get<ChartInvoice>(this.apiUrlInvoice + 'invoice-paid-status');
  }
  getInvoicePaidTotalStatus(): Observable<ChartInvoice>  {
    return this.http.get<ChartInvoice>(this.apiUrlInvoice + 'invoice-paid-total-status');
  }
  getInvoiceIssueDateStatus(): Observable<ChartInvoice>  {
    return this.http.get<ChartInvoice>(this.apiUrlInvoice + 'invoice-date-issued-status');
  }
  getInvoiceNumberCustomerStatus(): Observable<ChartInvoice>  {
    return this.http.get<ChartInvoice>(this.apiUrlInvoice + 'invoice-number-customer-status');
  }
  getProductStatus():Observable<ChartProduct> {
    return this.http.get<ChartProduct>(this.apiUrlInvoice + 'product-status');
  }
}
