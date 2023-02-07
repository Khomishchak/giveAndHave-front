import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};
  token: string = "";

  constructor(
    private router: Router,
    private http: HttpClient) { }

  ngOnInit(): void {
  }

  register() {
    let url = '/api/auth/register';
    this.http.post<any>(url, {
      name: this.model.name,
      password: this.model.password,
      email: this.model.email,
      groupName: this.model.groupName,
      age: this.model.age
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
