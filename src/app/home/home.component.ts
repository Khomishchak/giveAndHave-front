import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from '../models/transaction';
import { User } from '../models/user';
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

  transactions: Transaction[];
  freelancers: User[];
  actions: any;

  constructor(private router: Router,
    private userService: UserService,
    private transactionService: TransactionService) { }

  ngOnInit(): void {

    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
      this.balance = this.currentUser.balance;
    })

    this.userService.getUsers().subscribe(data => {
        this.freelancers = data;
      }
    )

    this.transactionService.getTransactions().subscribe(data => {
      this.transactions = data;
    })
  }

  performAction(action: any) {
    alert("action was done");
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']); 
  }
}
