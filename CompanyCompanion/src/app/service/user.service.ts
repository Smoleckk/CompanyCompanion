import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiurl = 'https://localhost:7184/api/Auth/';
  constructor(private http: HttpClient) { }

  LoadUsers(){
    return this.http.get(this.apiurl + 'get-users');
  }
}
