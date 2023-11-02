import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  apiUrlInvoice = 'https://localhost:7037/api/Invoice/';

  constructor(private http: HttpClient) {}
  getAllInvoice(): Observable<Invoice[]>  {
    return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header');
  }
  
  getFewInvoice(few: string, isCustomer: string): Observable<Invoice[]> {
    if (isCustomer !== undefined) {
      return this.http.get<Invoice[]>(
        this.apiUrlInvoice + 'get-invoices-header/' + isCustomer
      );
    }
    if (few === 'all') {
      return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header');
    }
    if (few === 'paid') {
      return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header-paid');
    }
    if (few === 'delay') {
      return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header-delay');
    }
    if (few === 'draft') {
      return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header-draft');
    } else {
      return this.http.get<Invoice[]>(this.apiUrlInvoice + 'get-invoices-header');
    }
  }

  getInvByCode(invoiceId: string): Observable<Invoice> {
    return this.http.get<Invoice>(this.apiUrlInvoice + invoiceId);
  }
  removeInvoice(invoiceId: string): Observable<Invoice> {
    return this.http.delete<Invoice>(this.apiUrlInvoice + invoiceId);
  }
  saveInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(this.apiUrlInvoice + 'save-invoice', invoiceData);
  }
  editInvoice(invoiceData: Invoice): Observable<Invoice> {
    return this.http.put<Invoice>(
      this.apiUrlInvoice + 'invoices/' + invoiceData.invoiceId,
      invoiceData
    );
  }
}
