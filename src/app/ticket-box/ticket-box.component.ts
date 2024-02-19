import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Ticket } from '../shared/types';

@Component({
  selector: 'app-ticket-box',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './ticket-box.component.html',
  styleUrl: './ticket-box.component.css'
})
export class TicketBoxComponent {
  @Input() ticket: Ticket = {
    numbers: []
  }
}
