import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProformaService {
  apiUrlCustomer = 'https://localhost:7184/api/Customer/';
  apiUrlProducts = 'https://localhost:7184/api/Products/';
  apiUrlProforma = 'https://localhost:7184/api/Proforma/';

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
  UpdateProductByCode(product: any) {
    return this.http.put(this.apiUrlProducts + 'update-product-by-code', product);
  }
  CreateProduct(product: any) {
    return this.http.post(this.apiUrlProducts + 'save-product', product);
  }

  GetAllProforma() {
    return this.http.get(this.apiUrlProforma + 'get-proformas-header')
  }
  GetProformaHeaderByCode(proformaId: any) {
    return this.http.get(this.apiUrlProforma + 'get-proforma-header-by-code?code=' + proformaId)
  }
  RemoveProforma(proformaId: any) {
    return this.http.delete(this.apiUrlProforma + 'delete-proforma?code=' + proformaId);
  }
  SaveProforma(proformaData: any) {
    return this.http.post(this.apiUrlProforma + 'save-proforma', proformaData);

  }
}