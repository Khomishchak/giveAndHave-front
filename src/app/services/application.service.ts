import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../models/application';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) { }

  public getNewMessagesAmount(user: User): Observable<number> {

    const getRequestedUsersUrl = `/api/get/new-messages-amount/${user.id}`
    
    return this.http.get<number>(getRequestedUsersUrl);
  }

  public getRequestedUsers(user: User): Observable<Application[]> {

    const getRequestedUsersUrl = `/api/get/tasks-requests/${user.id}`
    
    return this.http.get<Application[]>(getRequestedUsersUrl);
  }

  public acceptUser (taskId: number, user: User): Observable<void> {
    const acceptUserUrl = `/api/accept/user-for-task/${taskId}`;
    console.log(acceptUserUrl);
    console.log(user);
    return this.http.post<void>(acceptUserUrl, user);
  }
}
