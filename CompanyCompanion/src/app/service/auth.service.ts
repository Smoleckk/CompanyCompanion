import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl = 'https://localhost:7184/api/Auth/';
  constructor(private http: HttpClient) { }

  proceedLogin(usercred: any) {
    return this.http.post(this.apiurl+'login', usercred)
  }
  IsLoggedIn(){
    return localStorage.getItem('token')!=null;
  }
  GetToken(){
    return localStorage.getItem('token') || '';
  }
  proceedRegister(usercred: any) {
    return this.http.post(this.apiurl+'register', usercred)
  }


  GetByName(username:any){
    return this.http.post(this.apiurl+'get-by-username', username)
  }
  updateuser(username:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+username,inputdata);
  }
}
