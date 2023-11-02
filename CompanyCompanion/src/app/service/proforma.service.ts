import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProformaFormValue } from '../models/ProformaFormValue';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class ProformaService {
  constructor(private http: HttpClient) {}

  getAllProforma(): Observable<ProformaFormValue[]> {
    return this.http.get<ProformaFormValue[]>(
      ApiConfig.proformaApiUrl + 'get-proformas-header'
    );
  }
  getProformaHeaderByCode(proformaId: string): Observable<ProformaFormValue> {
    return this.http.get<ProformaFormValue>(
      ApiConfig.proformaApiUrl + 'get-proforma-header-by-code/' + proformaId
    );
  }
  removeProforma(proformaId: string): Observable<ProformaFormValue> {
    return this.http.delete<ProformaFormValue>(
      ApiConfig.proformaApiUrl + proformaId
    );
  }
  saveProforma(proformaData: ProformaFormValue): Observable<ProformaFormValue> {
    return this.http.post<ProformaFormValue>(
      ApiConfig.proformaApiUrl + 'save-proforma',
      proformaData
    );
  }
  editProforma(proformaData: ProformaFormValue): Observable<ProformaFormValue> {
    return this.http.put<ProformaFormValue>(
      ApiConfig.proformaApiUrl + 'proformas/' + proformaData.proformaId,
      proformaData
    );
  }
}
