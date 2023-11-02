import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/userProfile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrlPrfile = 'https://localhost:7037/api/Profile/';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.apiUrlPrfile);
  }
  
  updateProfile(template: string) {
    return this.http.put(this.apiUrlPrfile + template, template);
  }
}
