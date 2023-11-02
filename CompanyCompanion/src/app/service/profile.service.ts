import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/userProfile';
import { Observable } from 'rxjs';
import { ApiConfig } from '../config/apiConfig';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(ApiConfig.profileApiUrl);
  }

  updateProfile(template: string) {
    return this.http.put(ApiConfig.profileApiUrl + template, template);
  }
}
