import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_URL ="login";

  constructor(private httpClient: HttpClient) { }

  loginUser(userObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/users/login`, userObj);
  }

  registerUser(userObj:any) {
    return this.httpClient.post<any[]>(`${environment.apiBaseUrl}/users`, userObj);
  }  
  

  isLoggedIn():boolean {
    let authToken = localStorage.getItem('x-auth-token');
    let adminId = localStorage.getItem('x-admin-id');
    let fullName = localStorage.getItem('x-admin-name');
    return !(!authToken && !adminId && !fullName);
  }
  
  getfullName() {
    return localStorage.getItem('x-admin-name');
  }

  getAuthToken() {
    return localStorage.getItem('x-auth-token') ;
  }

  logOut() {
    localStorage.clear();
  }

}
