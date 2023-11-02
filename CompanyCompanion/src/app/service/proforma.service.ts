import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProformaFormValue } from '../models/ProformaFormValue';

@Injectable({
  providedIn: 'root',
})
export class ProformaService {
  apiUrlCustomer = 'https://localhost:7037/api/Customer/';
  apiUrlProducts = 'https://localhost:7037/api/Products/';
  apiUrlProforma = 'https://localhost:7037/api/Proforma/';

  constructor(private http: HttpClient) {}

  GetCustomer() {
    return this.http.get(this.apiUrlCustomer + 'get-customers');
  }
  getCustomerByCode(code: any) {
    return this.http.get(
      this.apiUrlCustomer + 'get-customers-by-code?code=' + code
    );
  }

  GetProducts() {
    return this.http.get(this.apiUrlProducts + 'get-products');
  }
  GetProductsByCode(code: any) {
    return this.http.get(
      this.apiUrlProducts + 'get-products-by-code?code=' + code
    );
  }
  UpdateProductByCode(product: any) {
    return this.http.put(
      this.apiUrlProducts + 'update-product-by-code',
      product
    );
  }
  CreateProduct(product: any) {
    return this.http.post(this.apiUrlProducts + 'save-product', product);
  }

  GetAllProforma() {
    return this.http.get(this.apiUrlProforma + 'get-proformas-header');
  }
  GetProformaHeaderByCode(proformaId: string): Observable<ProformaFormValue> {
    return this.http.get<ProformaFormValue>(
      this.apiUrlProforma + 'get-proforma-header-by-code/' + proformaId
    );
  }
  RemoveProforma(proformaId: any): Observable<void> {
    return this.http.delete<void>(this.apiUrlProforma + proformaId);
  }
  SaveProforma(proformaData: any) {
    return this.http.post(this.apiUrlProforma + 'save-proforma', proformaData);
  }
  EditProforma(proformaData: any) {
    return this.http.put(
      this.apiUrlProforma + 'proformas/' + proformaData.proformaId,
      proformaData
    );
  }
}
