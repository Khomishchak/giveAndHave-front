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

  public getAllTasks(): Observable<Task[]> {

    const getAllTasksUrl = '/api/get/task/all';

    return this.http.get<Task[]>(getAllTasksUrl);
  }

  public postRequestForTask(userId: number, taskId: number): Observable<void> {

    const postRequestForTaskUrl = `/api/post/request/task/${userId}/${taskId}`;

    return this.http.post<void>(postRequestForTaskUrl, {});
  }

  public getAllTaskIdsByUserIdUrl(userId: number): Observable<number[]> {

    const getAllTaskIdsByUserIdUrl = `/api/get/task_id/all/${userId}`;

    return this.http.get<number[]>(getAllTaskIdsByUserIdUrl);
  }
}
