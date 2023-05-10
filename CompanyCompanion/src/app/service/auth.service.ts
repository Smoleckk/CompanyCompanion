import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7037/api/Auth/';

  constructor(private http: HttpClient) {}

  proceedLogin(usercred: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login', usercred);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  haveAccess(): boolean {
    const loggintoken = localStorage.getItem('token') || '';
    if (loggintoken !== '') {
      const _extractedtoken = loggintoken.split('.')[1];
      const _atodata = atob(_extractedtoken);
      const _finaldata = JSON.parse(_atodata);
      const role = _finaldata[Object.keys(_finaldata)[1]];
      // //console.log(_finaldata[Object.keys(_finaldata)[1]]);
      if (role === 'Admin') {
        return true;
      }
    }
    return false;
  }

  proceedRegister(usercred: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'register', usercred);
  }

  getByName(username: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'get-by-username', username);
  }

  updateUser(username: any, inputdata: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + '/' + username, inputdata);
  }
}
