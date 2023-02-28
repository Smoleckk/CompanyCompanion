import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  apiUrlCustomer = 'https://localhost:7184/api/Customer/';
  apiUrlProducts = 'https://localhost:7184/api/Products/';
  apiUrlInvoice = 'https://localhost:7184/api/Invoice/';

  constructor(private http: HttpClient) { }

  GetCustomer() {
    return this.http.get(this.apiUrlCustomer + 'get-customers');
  }
  GetCustomerByCode(code: any) {
    return this.http.get(this.apiUrlCustomer + 'get-customers-by-code?code=' + code);
  }

  GetProducts() {
    return this.http.get(this.apiUrlProducts + 'get-products');
  }
  GetProductsByCode(code: any) {
    return this.http.get(this.apiUrlProducts + 'get-products-by-code?code=' + code);
  }

  GetAllInvoice(){
    return this.http.get(this.apiUrlInvoice+'get-invoices-header')
  }
  GetInvHeaderByCode(invoiceNo:any){
    return this.http.get(this.apiUrlInvoice+'get-invoice-header-by-code?code='+invoiceNo)
  }
  RemoveInvoice(invoiceNo:any){
    return this.http.delete(this.apiUrlInvoice + 'delete-invoice?code=' + invoiceNo);
  }
  SaveInvoice(invoiceData:any){
    return this.http.post(this.apiUrlInvoice + 'save-invoice',invoiceData);
  
  }

}
