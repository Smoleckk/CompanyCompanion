import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';
import { ApiConfig } from '../config/apiConfig';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  proceedLogin(usercred: UserLogin): Observable<any> {
    return this.http.post<any>(ApiConfig.authApiUrl + 'login', usercred);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  haveAccess(): boolean {
    const loggintoken = localStorage.getItem('token') || '';
    if (loggintoken !== '' && loggintoken!== undefined && loggintoken !== null) {
      const _extractedtoken = loggintoken.split('.')[1];
      const _atodata = atob(_extractedtoken);
      const _finaldata = JSON.parse(_atodata);
      const role = _finaldata[Object.keys(_finaldata)[1]];
      if (role === 'Admin') {
        return true;
      }
    }
    return false;
  }

  proceedRegister(usercred: UserRegister): Observable<UserRegister> {
    return this.http.post<UserRegister>(ApiConfig.authApiUrl + 'register', usercred);
  }
///// depreceted
  getByName(username: any): Observable<any> {
    return this.http.post<any>(ApiConfig.authApiUrl + 'get-by-username', username);
  }

  updateUser(username: any, inputdata: any): Observable<any> {
    return this.http.put<any>(ApiConfig.authApiUrl + username, inputdata);
  }
  ///////
}
