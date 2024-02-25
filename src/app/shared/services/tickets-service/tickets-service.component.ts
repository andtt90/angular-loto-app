import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Ticket } from '../../types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tickets-service',
  standalone: true,
  templateUrl: './tickets-service.component.html',
  styleUrl: './tickets-service.component.css'
})
export class TicketsServiceComponent {
  private backendUrl: string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  doRequest = () => {
    this.http.get(this.backendUrl).subscribe( resp => (console.log(resp)));
  }

  sendTickets = (ticketsArray: Array<Ticket>) => {
    return this.http.post(`${this.backendUrl}/sendTickets`, {
      ticketsArray
    });
  }

  getAllTickets = () => {
    return this.http.get<any>(`${this.backendUrl}/getAllTickets`);
  }

  deleteTickets = () => {
    return this.http.delete<any>(`${this.backendUrl}/deleteTickets`)
  }
}
