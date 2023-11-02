import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { CustomerFormData } from '../models/customerFormData';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(ApiConfig.customerApiUrl);
  }

  getCustomerByCode(code: string): Observable<Customer> {
    return this.http.get<Customer>(ApiConfig.customerApiUrl + code);
  }
  updateCustomerByCode(
    data: string,
    customer: CustomerFormData
  ): Observable<Customer> {
    return this.http.put<Customer>(ApiConfig.customerApiUrl + data, customer);
  }

  deleteCustomerByCode(code: string): Observable<Customer> {
    return this.http.delete<Customer>(ApiConfig.customerApiUrl + code);
  }

  createCustomer(customer: CustomerFormData): Observable<Customer> {
    return this.http.post<Customer>(ApiConfig.customerApiUrl, customer);
  }
  getRegon(code: any): Observable<any> {
    return this.http.get(ApiConfig.customerApiUrl + 'regon/' + code);
  }
}
