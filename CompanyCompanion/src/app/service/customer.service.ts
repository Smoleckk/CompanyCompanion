import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7037/api/Customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerByCode(code: any): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + code);
  }
  updateCustomerByCode(data: any, customer: any): Observable<any> {
    return this.http.put(this.apiUrl + data, customer);
  }

  deleteCustomerByCode(code: any): Observable<any> {
    return this.http.delete(this.apiUrl + code);
  }

  createCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }
  getRegon(code: any): Observable<any> {
    return this.http.get(this.apiUrl+ "regon/" + code);
  }
}
