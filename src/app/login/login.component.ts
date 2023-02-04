import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  model: any = {};

  constructor(
//    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    let url = '/view/login';
    this.http.post<any>(url, {
      name: this.model.name,
      password: this.model.password
    }).subscribe(
      (response: string) => {
        console.log(response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    ) 
  }

}
