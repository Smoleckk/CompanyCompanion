import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private apiUrl = 'https://localhost:7037/api/Customer/';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getCustomerByCode(code: any): Observable<any> {
    return this.http.get(this.apiUrl + code);
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
}
