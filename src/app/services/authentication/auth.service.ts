import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { endpoints } from 'src/app/endpoints/endpoints';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createToken(): Observable<Object> {
    return this.http.get(`${endpoints.CREATE_TOKEN}`);
  }

  authenticate(token: any): Observable<Object> {
    return this.http.get(`${endpoints.AUTHENTICATE}/${token}`);
  }

  validateWithLogin(token: any, formData: any): Observable<Object> {
    return this.http.post(endpoints.VALIDATE_WITH_LOGIN, {
      username: formData.username,
      password: formData.password,
      request_token: token,
    });
  }

  authenticationSession(token: any): Observable<Object> {
    return this.http.post(endpoints.AUTHENTICATION_SESSION, {
      request_token: token,
    });
  }
}
