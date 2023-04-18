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

  public getFreelancers(): Observable<User[]> {

    const url = '/api/get/user/all';

    return this.http.get<User[]>(url);
  }

  public getUser() {
    const getUserURL = "/api/get/user/current";

    return this.http.get<User>(getUserURL);
  }

  public getPairInTransaction(transactionId: number) {
    const getPairInTransaction = `/api/get/pairInTransaction/${transactionId}`;

    return this.http.get<User[]>(getPairInTransaction);
  }
}
