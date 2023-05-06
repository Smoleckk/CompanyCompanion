import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  apiUrlPrfile = 'https://localhost:7037/api/Profile/';

  constructor(private http: HttpClient) {}

  getProfile() {
    return this.http.get(this.apiUrlPrfile);
  }
  updateProfile(template:string) {
    return this.http.put(this.apiUrlPrfile + template,template );
  }
}
