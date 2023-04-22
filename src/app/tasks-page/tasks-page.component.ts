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
  currentUserTaskIds: number[];

  taskId: number;

  constructor(private http: HttpClient,
    private taskService: TaskService,
    private userService: UserService) { }

  ngOnInit() {
    
    this.init();
  }

  private init() {
    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
      
      this.taskService.getAllTaskIdsByUserIdUrl(this.currentUser.id).subscribe(tasksData => {
        this.currentUserTaskIds = tasksData;

        this.taskService.getAllTasks().subscribe(
          data => {
            this.tasks = data;
            console.log(this.currentUserTaskIds);
            this.tasks.forEach(task => {
              console.log(`task = ${task.id}`)
              this.currentUserTaskIds.includes(task.id) ? task.isUsersTask = false : task.isUsersTask = true;
            })
            console.log(this.tasks);
          }
        );
      })
    })
  }

  private getTasks() {
    
    
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
}
