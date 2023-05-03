import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegistrationRequest } from '../models/registration-request';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public saveUser(request: RegistrationRequest): Observable<any> {
    
    const saveUserUrl = '/api/auth/register';

    return this.http.post<any>(saveUserUrl, request);
  }
}
