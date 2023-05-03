import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RegistrationRequest } from '../models/registration-request';
import { NgForm } from '@angular/forms';
import { ErrorMessage } from '../models/error-message';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: RegistrationRequest;
  token: string = "";

  messages: ErrorMessage[] = [];

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
  }

  register(postForm: NgForm) {

    this.model = postForm.value;
    this.authService.saveUser(this.model).subscribe(res => {
      this.token = res.token;

      if(this.token != null) {
        localStorage.setItem(
          'token',
          this.token
        );
  
        this.router.navigate(['']); 
      }
    },
    error => {
      const errors = error.error;
      for (const err of errors) {

        this.responseToErrorMessage(err.field, err.rejectedValue, err.defaultMessage);
      }
      this.openErrorsModal();
    })
  }

  openErrorsModal() {
    const container = document.getElementById('errors');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#errors');

    container?.appendChild(button);
    button.click();
  }

  responseToErrorMessage(field: string, rejectedValue: string, defaultMessage: string) {
    
    let message = `Error: ${field} '${rejectedValue}' -> ${defaultMessage}\n`

    let errorMessage: ErrorMessage = {message: message};
    this.messages.push(errorMessage);
  }
}