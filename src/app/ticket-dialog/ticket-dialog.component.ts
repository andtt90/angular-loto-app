import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { TicketComponent } from '../ticket/ticket.component';
import { Ticket } from '../shared/types';

@Component({
  selector: 'app-ticket-dialog',
  templateUrl: 'ticket-dialog.component.html',
  styleUrl: './ticket-dialog.component.css',
  standalone: true,
  imports: [TicketComponent, MatDialogContent, MatDialogTitle],
})
export class TicketDialogComponent {
  ticket: Ticket = {
    boxesArray: []
  };
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.ticket = data.ticket;
  }

}