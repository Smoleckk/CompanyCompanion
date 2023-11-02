import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserFormData } from '../models/userFormData';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(ApiConfig.userApiUrl);
  }

  createUser(user: UserFormData): Observable<User> {
    return this.http.post<User>(ApiConfig.userApiUrl, user);
  }
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(ApiConfig.userApiUrl + userId);
  }
}
