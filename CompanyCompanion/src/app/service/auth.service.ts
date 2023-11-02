import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from '../models/userLogin';
import { UserRegister } from '../models/userRegister';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7037/api/Auth/';

  constructor(private http: HttpClient) {}

  proceedLogin(usercred: UserLogin): Observable<any> {
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
    return this.http.post<UserRegister>(this.apiUrl + 'register', usercred);
  }
///// depreceted
  getByName(username: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'get-by-username', username);
  }

  updateUser(username: any, inputdata: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + username, inputdata);
  }
  ///////
}
