import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http: HttpClient ) { }

  public postTask(task: Task, userId: number): Observable<void>{

    const postTaskUrl = `/api/post/task/${userId}`;

    return this.http.post<void>(postTaskUrl, task);
  }

  public findAllTasks(): Observable<Task[]> {

    const getAllTasksUrl = '/api/get/task/all';

    return this.http.get<Task[]>(getAllTasksUrl);
  }
}
