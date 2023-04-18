import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Task } from '../models/task';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
import { ApplicationService } from '../services/application.service';
import { TaskService } from '../services/task.service';
import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @ViewChild('updatedUserModal') updatedProfileModal: any;
  @ViewChild('profileModal') profileModal: any;

  currentUser: User;
  balance: number;
  userAge: string;
  isVerified: string;
  profileDisabled: boolean = true;

  showModal: boolean = false;

  transactions: Transaction[];
  freelancers: User[];
  newMessagesAmount: number;
  actions = ['Post Task', 'Take Task'];

  constructor(private router: Router,
    private userService: UserService,
    private transactionService: TransactionService,
    private taskService: TaskService,
    private applicationService: ApplicationService) { }

  ngOnInit(): void {

    this.getCurrentUser();

    this.getFreelancers();
    
    this.getAllTrasactions();
  }

  performAction(action: any) {

    const container = document.getElementById('mainContainer');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(action === 'Post Task') {
      button.setAttribute('data-bs-target', '#postTaskModal');
    } else if(action == 'Take Task') {
      this.router.navigate(['/tasks']);
    } else if(action == 'Profile') {
      button.setAttribute('data-bs-target', '#profileModal');
    } else if(action == 'Messages') {
      this.router.navigate(['/messages']);
    } else if(action == 'UpdatedUser') {
      button.setAttribute('data-bs-target', '#updatedUserModal');
    }

    container?.appendChild(button);
    button.click();
  }


  onPostTask(postForm: NgForm){
    document.getElementById('post-task-form')?.click();

    let task: Task = postForm.value;
    task.taskActive = true;

    this.taskService.postTask(task, this.currentUser.id).subscribe(
      res => {
        this.openCreatedTaskModal();
      }
    );

    postForm.reset();
  }

  onUpdateProfile(updateProfileForm: NgForm) {
    
    this.userService.updateUser(updateProfileForm.value).subscribe(
      () => {
        this.performAction('UpdatedUser');
      },
      (err) => {
        // error
      }
    );
  }

  logoutUpdatedUser() {
    this.logout();
    console.log(this.updatedProfileModal);
    this.updatedProfileModal.hide();
    this.profileModal.hide();
  }

  makeProfileChangeable() {
    this.profileDisabled = !this.profileDisabled;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  private getCurrentUser() {
    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
      this.userAge = `${data.age}` || 'Not given';
      this.isVerified = data.isVerified ? 'Verified' : 'Not Verified'
      this.getNewMessagesAmount(this.currentUser);
      this.balance = this.currentUser.balance;
    })
  }

  private getFreelancers() {
    this.userService.getFreelancers().subscribe(data => {
      this.freelancers = data;
    })
  }

  private getAllTrasactions() {
    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
      this.transactions.forEach((transaction) => {
        this.attachUsersToTransaction(transaction)});
    })
  }

  private getNewMessagesAmount(user: User) {
    this.applicationService.getNewMessagesAmount(user).subscribe(data => {
      this.newMessagesAmount = data;
    })   
  }

  private attachUsersToTransaction(transaction: Transaction) {
    this.userService.getPairInTransaction(transaction.id).subscribe(
      data => {
        let users: User[] = data;
        transaction.sender = users[0];
        transaction.receiver = users[1];
      }
    );

    return transaction;
  }

  private openCreatedTaskModal() {
    const container = document.getElementById('createTask');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#createTask');

    container?.appendChild(button);
    button.click();
  }
}

