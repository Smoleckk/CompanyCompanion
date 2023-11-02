import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerFormData } from '../models/customerFormData';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7037/api/Customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  getCustomerByCode(code: string): Observable<Customer> {
    return this.http.get<Customer>(this.apiUrl + code);
  }
  updateCustomerByCode(data: string, customer: CustomerFormData): Observable<Customer> {
    return this.http.put<Customer>(this.apiUrl + data, customer);
  }

  deleteCustomerByCode(code: string): Observable<Customer> {
    return this.http.delete<Customer>(this.apiUrl + code);
  }

  createCustomer(customer: CustomerFormData): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }
  getRegon(code: any): Observable<any> {
    return this.http.get(this.apiUrl+ "regon/" + code);
  }
}
