import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrlCustomer = 'https://localhost:7037/api/Customer/';
  apiUrlProducts = 'https://localhost:7037/api/ProductMagazines/';
  apiUrlInvoice = 'https://localhost:7037/api/Invoice/';

  constructor(private http: HttpClient) { }


  GetCustomers():Observable<any> {
    return this.http.get(this.apiUrlCustomer);
  }

  GetCustomerByCode(code: any) {
    return this.http.get(this.apiUrlCustomer + code);
  }
  DeleteCustomerByCode(code: any) {
    return this.http.delete(this.apiUrlCustomer + code);
  }

  // UpdateCustomerByCode(customer:any){
  //   return this.http.put(this.apiUrlCustomer +'update-customer-by-code',customer);
  // }

  CreateCustomer(customer:any){
    return this.http.post(this.apiUrlCustomer,customer);
  }
}
