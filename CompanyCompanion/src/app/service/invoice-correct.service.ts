import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class InvoiceCorrectService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(ApiConfig.productMAgazineApiUrl);
  }
  getProductsByCode(code: any) {
    return this.http.get(ApiConfig.productMAgazineApiUrl + code);
  }
  getProductsByName(name: any) {
    return this.http.get(ApiConfig.productMAgazineApiUrl + 'name/' + name);
  }
  updateProductByCode(product: any) {
    return this.http.put(ApiConfig.productMAgazineApiUrl, product);
  }
  createProduct(product: any) {
    return this.http.post(ApiConfig.productMAgazineApiUrl, product);
  }
  deleteProduct(code: any) {
    return this.http.delete(ApiConfig.productMAgazineApiUrl + code);
  }

  getAllInvoice() {
    return this.http.get(
      ApiConfig.invoiceCorrectApiUrl + 'get-invoices-header'
    );
  }
  /////// review
  GetAllInvoicePaid() {
    return this.http.get(
      ApiConfig.invoiceCorrectApiUrl + 'get-invoices-header-paid'
    );
  }
  GetAllInvoiceDelay() {
    return this.http.get(
      ApiConfig.invoiceCorrectApiUrl + 'get-invoices-header-delay'
    );
  }
  GetAllInvoiceDraft() {
    return this.http.get(
      ApiConfig.invoiceCorrectApiUrl + 'get-invoices-header-draft'
    );
  }
  //////////
  getCustomerInvoices(code: any) {
    return this.http.get(
      ApiConfig.invoiceCorrectApiUrl + 'get-invoices-header/' + code
    );
  }
  getInvByCode(invoiceId: any) {
    return this.http.get(ApiConfig.invoiceCorrectApiUrl + invoiceId);
  }
  removeInvoice(invoiceId: any) {
    return this.http.delete(ApiConfig.invoiceCorrectApiUrl + invoiceId);
  }
  saveInvoice(invoiceData: any) {
    return this.http.post(
      ApiConfig.invoiceCorrectApiUrl + 'save-invoice',
      invoiceData
    );
  }
  editInvoice(invoiceData: any) {
    return this.http.put(
      ApiConfig.invoiceCorrectApiUrl +
        'invoices/' +
        invoiceData.invoiceCorrectId,
      invoiceData
    );
  }
}
