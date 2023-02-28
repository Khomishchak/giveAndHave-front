import { Component, OnInit } from '@angular/core';
import { Application } from '../models/application';
import { User } from '../models/user';
import { ApplicationService } from '../services/application.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.css']
})
export class MessagesPageComponent implements OnInit {

  currentUser: User;
  applications: Application[];

  acceptedUser: User;

  constructor(private applicationService: ApplicationService,
    private userService: UserService) { }

  ngOnInit(): void {

    this.init();
  }  

  performAction(action: string, additional: any) {

    const container = document.getElementById('invisable_buttons');

    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');

    if(action === 'Accept') {
      button.setAttribute('data-bs-target', '#acceptRequestedUserModal');
      this.acceptedUser = this.applications[additional].user;
    } else if(action == 'Take Task') {
      
    }else if(action == 'acceptedUserModal') {
      button.setAttribute('data-bs-target', '#acceptedUserModal');
    }

    container?.appendChild(button);
    button.click();
  }

  accept() {
    this.performAction('acceptedUserModal', null);
  }

  deny() {

  }

  private init() {
    this.userService.getUser().subscribe(data => {
      this.currentUser = data;
      this.applicationService.getRequestedUsers(data).subscribe(
        data => this.applications = data
      );
    })
  }

}
