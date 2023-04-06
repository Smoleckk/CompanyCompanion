import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  apiUrlCustomer = 'https://localhost:7037/api/Customer/';
  apiUrlProducts = 'https://localhost:7037/api/Products/';
  apiUrlInvoice = 'https://localhost:7037/api/Invoice/';

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
  UpdateProductByCode(product:any){
    return this.http.put(this.apiUrlProducts +'update-product-by-code',product);
  }
  CreateProduct(product:any){
    return this.http.post(this.apiUrlProducts +'save-product',product);
  }

  GetAllInvoice(){
    return this.http.get(this.apiUrlInvoice+'get-invoices-header')
  }
  GetInvByCode(invoiceId:any){
    return this.http.get(this.apiUrlInvoice+'get-invoice-by-code?code='+invoiceId)
  }
  RemoveInvoice(invoiceId:any){
    return this.http.delete(this.apiUrlInvoice + 'delete-invoice?code=' + invoiceId);
  }
  SaveInvoice(invoiceData:any){
    return this.http.post(this.apiUrlInvoice + 'save-invoice',invoiceData);
  }
  EditInvoice(invoiceData:any){
    return this.http.put(this.apiUrlInvoice + 'invoices/'+invoiceData.invoiceId,invoiceData);
  }

}
