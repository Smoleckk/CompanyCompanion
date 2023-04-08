import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiurlUser = 'https://localhost:7037/api/User/';
  constructor(private http: HttpClient) { }

  LoadUsers():Observable<User>{
    return this.http.get<User>(this.apiurlUser);
  }

  CreateUser(user:any){
    return this.http.post(this.apiurlUser,user);
  }
}
