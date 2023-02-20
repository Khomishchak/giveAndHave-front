import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { TaskService } from '../services/task.service';


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[];

  constructor(private http: HttpClient,
    private taskService: TaskService) { }

  ngOnInit(): void {
    
    this.getTasks();
  }

  private getTasks() {
    
    return this.taskService.findAllTasks().subscribe(
      data => {
        this.tasks = data
        console.log(this.tasks);
      }
    );
  }

  performAction(task: Task){
  
  }

}
