import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  apiUrlCustomer = 'https://localhost:7037/api/Customer/';
  apiUrlProducts = 'https://localhost:7037/api/ProductMagazines/';
  apiUrlInvoice = 'https://localhost:7037/api/Invoice/';

  constructor(private http: HttpClient) {}

  GetCustomer() {
    return this.http.get(this.apiUrlCustomer);
  }
  getCustomerByCode(code: any) {
    return this.http.get(this.apiUrlCustomer + code);
  }

  GetProducts() {
    return this.http.get(this.apiUrlProducts);
  }
  GetProductsByCode(code: any) {
    return this.http.get(this.apiUrlProducts + code);
  }
  GetProductsByName(name: any) {
    return this.http.get(this.apiUrlProducts + 'name/' + name);
  }
  UpdateProductByCode(product: any) {
    return this.http.put(this.apiUrlProducts, product);
  }
  CreateProduct(product: any) {
    return this.http.post(this.apiUrlProducts, product);
  }
  deleteProduct(code: any) {
    return this.http.delete(this.apiUrlProducts + code);
  }

  GetAllInvoice() {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header');
  }
  /////// review
  GetAllInvoicePaid() {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header-paid');
  }
  GetAllInvoiceDelay() {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header-delay');
  }
  GetAllInvoiceDraft() {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header-draft');
  }
  //////////
  GetCustomerInvoices(code: any) {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header/' + code);
  }
  GetInvByCode(invoiceId: any) {
    return this.http.get(this.apiUrlInvoice + invoiceId);
  }
  RemoveInvoice(invoiceId: any) {
    return this.http.delete(this.apiUrlInvoice + invoiceId);
  }
  SaveInvoice(invoiceData: any) {
    return this.http.post(this.apiUrlInvoice + 'save-invoice', invoiceData);
  }
  EditInvoice(invoiceData: any) {
    return this.http.put(
      this.apiUrlInvoice + 'invoices/' + invoiceData.invoiceId,
      invoiceData
    );
  }
}
