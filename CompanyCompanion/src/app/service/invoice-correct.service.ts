import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InvoiceCorrectService {
  // apiUrlCustomer = 'https://localhost:7037/api/Customer/';
  apiUrlProducts = 'https://localhost:7037/api/ProductMagazines/';
  apiUrlInvoice = 'https://localhost:7037/api/InvoiceCorrect/';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(this.apiUrlProducts);
  }
  getProductsByCode(code: any) {
    return this.http.get(this.apiUrlProducts + code);
  }
  getProductsByName(name: any) {
    return this.http.get(this.apiUrlProducts + 'name/' + name);
  }
  updateProductByCode(product: any) {
    return this.http.put(this.apiUrlProducts, product);
  }
  createProduct(product: any) {
    return this.http.post(this.apiUrlProducts, product);
  }
  deleteProduct(code: any) {
    return this.http.delete(this.apiUrlProducts + code);
  }

  getAllInvoice() {
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
  getCustomerInvoices(code: any) {
    return this.http.get(this.apiUrlInvoice + 'get-invoices-header/' + code);
  }
  getInvByCode(invoiceId: any) {
    return this.http.get(this.apiUrlInvoice + invoiceId);
  }
  removeInvoice(invoiceId: any) {
    return this.http.delete(this.apiUrlInvoice + invoiceId);
  }
  saveInvoice(invoiceData: any) {
    return this.http.post(this.apiUrlInvoice + 'save-invoice', invoiceData);
  }
  editInvoice(invoiceData: any) {
    return this.http.put(
      this.apiUrlInvoice + 'invoices/' + invoiceData.invoiceCorrectId,
      invoiceData
    );
  }
}
