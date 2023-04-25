import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChartService {
  apiUrlInvoice = 'https://localhost:7037/api/Invoice/';

  constructor(private http: HttpClient) {}

  GetChartInvoiceData() {
    return this.http.get(this.apiUrlInvoice + 'chart');
  }
}
