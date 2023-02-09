import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { User } from '../models/user';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};
  token: any = "";

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    const loginURL = '/api/auth/login';
    
    this.http.post<any>(loginURL, {
      name: this.model.name,
      password: this.model.password
    }).subscribe(res => {

      this.token = res.token;

      localStorage.setItem(
        'token',
        this.token
      );

      this.router.navigate(['']); 
    }) 
  }
}
