import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiurl = 'https://localhost:7037/api/Auth/';
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
  HaveAccess() {
    var loggintoken = localStorage.getItem('token') || '';
    if(loggintoken!=''){
      var _extractedtoken = loggintoken.split('.')[1];
      var _atodata = atob(_extractedtoken);
      var _finaldata = JSON.parse(_atodata);
      var role = _finaldata[Object.keys(_finaldata)[1]];
      console.log(_finaldata[Object.keys(_finaldata)[1]]);
      if (role == 'Admin') {
        return true;
      }
    }
    return false;
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
