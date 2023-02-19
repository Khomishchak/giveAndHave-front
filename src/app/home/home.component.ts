import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { TaskService } from '../services/task.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;
  balance: number;

  showModal: boolean = false;

  transactions: Transaction[];
  freelancers: User[];
  actions = ['Post Task', 'Take Task'];

  constructor(private router: Router,
    private userService: UserService,
    private transactionService: TransactionService,
    private taskService: TaskService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
      this.balance = this.currentUser.balance;
    })

    this.userService.getFreelancers().subscribe(data => {
        this.freelancers = data;
      }
    )

    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    })
  }

  performAction(action: any) {

    const container = document.getElementById('mainContainer');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(action === 'Post Task') {
      button.setAttribute('data-bs-target', '#postTaskModal');
    }else if(action == 'Take Task') {

    } 

    container?.appendChild(button);
    button.click();
  }


  onPostTask(postForm: NgForm){
    document.getElementById('post-task-form')?.click();

    this.taskService.postTask(postForm.value, this.currentUser.id).subscribe();

    postForm.reset();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
