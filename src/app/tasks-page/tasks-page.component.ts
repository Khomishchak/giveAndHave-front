import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task';
import { User } from '../models/user';
import { TaskService } from '../services/task.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-tasks-page',
  templateUrl: './tasks-page.component.html',
  styleUrls: ['./tasks-page.component.css']
})
export class TasksPageComponent implements OnInit {

  tasks: Task[];
  currentUser: User;

  taskId: number;

  constructor(private http: HttpClient,
    private taskService: TaskService,
    private userService: UserService) { }

  ngOnInit(): void {
    
    this.getTasks();
    this.getCurrentUser();
  }

  private getTasks() {
    
    return this.taskService.findAllTasks().subscribe(
      data => {
        this.tasks = data
      }
    );
  }

  performAction(task: Task){
  
  }

  onOpen(mode: any) {

    const container = document.getElementById('invisable_buttons');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(mode == 'requestForTaskModal') {
      button.setAttribute('data-bs-target', '#requestForTaskModal');
    }else if(mode == 'successfullyRequestedForTaskModal') {
      button.setAttribute('data-bs-target', '#successfullyRequestedForTaskModal');
    }

    container?.appendChild(button);
    button.click();
  }

  openRequestForTaskModal(id: number) {

    this.taskId = id;
    
    this.onOpen('requestForTaskModal');
  }

  sendTaskRequest() {
    this.taskService.postRequestForTask(this.currentUser.id, this.taskId).subscribe(() => {
      document.getElementById('request-task-form')?.click();
    })

    this.onOpen('successfullyRequestedForTaskModal');
  }

  private getCurrentUser() {
    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
    })
  }
}
