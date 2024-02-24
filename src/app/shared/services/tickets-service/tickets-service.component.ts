import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets-service',
  standalone: true,
  templateUrl: './tickets-service.component.html',
  styleUrl: './tickets-service.component.css'
})
export class TicketsServiceComponent {

  constructor(private http: HttpClient) { }

  doRequest = () =>{
    this.http.get('http://localhost:3000/').subscribe( resp => (console.log(resp)));
  }
}
