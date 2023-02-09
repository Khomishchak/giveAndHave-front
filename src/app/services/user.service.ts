import { useAnimation } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {

    const url = '/api/get/user/all';

    return this.http.get<User[]>(url);
  }

  public getUser() {
    const getUserURL = "/api/get/user";

    return this.http.get<User>(getUserURL);
  }
}
