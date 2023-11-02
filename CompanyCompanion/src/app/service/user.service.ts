import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserFormData } from '../models/userFormData';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://localhost:7037/api/User/';

  constructor(private http: HttpClient) {}

  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  createUser(user: UserFormData): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(this.apiUrl + userId);
  }
}
