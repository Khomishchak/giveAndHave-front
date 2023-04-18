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
    const getUserUrl = "/api/get/user/current";

    return this.http.get<User>(getUserUrl);
  }

  public getPairInTransaction(transactionId: number) {
    const getPairInTransactionUrl = `/api/get/pairInTransaction/${transactionId}`;

    return this.http.get<User[]>(getPairInTransactionUrl);
  }

  public updateUser(user: User) {
    const updateUserUrl = "/api/update/user";

    return this.http.put<User>(updateUserUrl, user);
  }
}
