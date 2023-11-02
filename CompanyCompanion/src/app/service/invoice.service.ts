import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}
  getAllInvoice(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(
      ApiConfig.invoiceApiUrl + 'get-invoices-header'
    );
  }

  getFewInvoice(few: string, isCustomer: string): Observable<Invoice[]> {
    if (isCustomer !== undefined) {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header/' + isCustomer
      );
    }
    if (few === 'all') {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header'
      );
    }
    if (few === 'paid') {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header-paid'
      );
    }
    if (few === 'delay') {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header-delay'
      );
    }
    if (few === 'draft') {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header-draft'
      );
    } else {
      return this.http.get<Invoice[]>(
        ApiConfig.invoiceApiUrl + 'get-invoices-header'
      );
    }
  }

  getInvByCode(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(ApiConfig.invoiceApiUrl + invoiceId);
  }
  removeInvoice(invoiceId: string): Observable<Invoice> {
    return this.http.delete<Invoice>(ApiConfig.invoiceApiUrl + invoiceId);
  }
  saveInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(
      ApiConfig.invoiceApiUrl + 'save-invoice',
      invoiceData
    );
  }
  editInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(
      ApiConfig.invoiceApiUrl + 'invoices/' + invoiceData.invoiceId,
      invoiceData
    );
  }
}
