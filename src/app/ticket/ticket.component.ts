import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Box, Ticket } from '../shared/types';
import { BoxComponent } from '../box/box.component';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [MatCardModule, BoxComponent, MatGridListModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  @Input() ticket: Ticket = {
    boxesArray: [],
    superzahl: null
  }
}
