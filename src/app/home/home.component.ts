import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  message: any = "";

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    
    const jwtToken = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);

    this.message = this.http.get<string>('/api/home/hello', { headers }).subscribe();
  }
}
