import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ChartInvoice } from '../models/chartInvoice';
import { Observable } from 'rxjs';
import { ChartProduct } from '../models/chartProduct';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  constructor(private http: HttpClient) {}

  getInvoicePaidStatus(): Observable<ChartInvoice> {
    return this.http.get<ChartInvoice>(
      ApiConfig.dashboardApiUrl + 'invoice-paid-status'
    );
  }
  getInvoicePaidTotalStatus(): Observable<ChartInvoice> {
    return this.http.get<ChartInvoice>(
      ApiConfig.dashboardApiUrl + 'invoice-paid-total-status'
    );
  }
  getInvoiceIssueDateStatus(): Observable<ChartInvoice> {
    return this.http.get<ChartInvoice>(
      ApiConfig.dashboardApiUrl + 'invoice-date-issued-status'
    );
  }
  getInvoiceNumberCustomerStatus(): Observable<ChartInvoice> {
    return this.http.get<ChartInvoice>(
      ApiConfig.dashboardApiUrl + 'invoice-number-customer-status'
    );
  }
  getProductStatus(): Observable<ChartProduct> {
    return this.http.get<ChartProduct>(
      ApiConfig.dashboardApiUrl + 'product-status'
    );
  }
}
