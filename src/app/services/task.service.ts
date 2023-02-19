import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient ) { }

  public postTask(task: Task, userId: number): Observable<void>{

    const postTaskUrl = `/api/post/task/${userId}`;

    return this.http.post<void>(postTaskUrl, task);
  }
}
