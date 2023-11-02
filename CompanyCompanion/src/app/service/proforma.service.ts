import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProformaFormValue } from '../models/ProformaFormValue';

@Injectable({
  providedIn: 'root',
})
export class ProformaService {
  apiUrlProducts = 'https://localhost:7037/api/Products/';
  apiUrlProforma = 'https://localhost:7037/api/Proforma/';

  constructor(private http: HttpClient) {}

  GetAllProforma(): Observable<ProformaFormValue[]> {
    return this.http.get<ProformaFormValue[]>(this.apiUrlProforma + 'get-proformas-header');
  }
  GetProformaHeaderByCode(proformaId: string): Observable<ProformaFormValue> {
    return this.http.get<ProformaFormValue>(
      this.apiUrlProforma + 'get-proforma-header-by-code/' + proformaId
    );
  }
  RemoveProforma(proformaId: string): Observable<ProformaFormValue> {
    return this.http.delete<ProformaFormValue>(this.apiUrlProforma + proformaId);
  }
  SaveProforma(proformaData: ProformaFormValue): Observable<ProformaFormValue> {
    return this.http.post<ProformaFormValue>(this.apiUrlProforma + 'save-proforma', proformaData);
  }
  EditProforma(proformaData: ProformaFormValue): Observable<ProformaFormValue> {
    return this.http.put<ProformaFormValue>(
      this.apiUrlProforma + 'proformas/' + proformaData.proformaId,
      proformaData
    );
  }
}
