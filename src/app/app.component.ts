import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TicketBoxComponent } from './ticket-box/ticket-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ticket } from './shared/types';
import { TicketsServiceComponent } from './shared/services/tickets-service/tickets-service.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    TicketBoxComponent,
    TicketsServiceComponent,
    MatDividerModule
  ],
  providers: [TicketsServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'lottery-app';
  ticketsNo = '';
  includeSuperzahl = false;
  ticketsArray: Array<Ticket> = [];
  savedTicketsArray: Array<Ticket> = [];

  constructor(private _snackBar: MatSnackBar, private ticketsService: TicketsServiceComponent) { }

  generateTickets = (): void => {
    this.ticketsArray = [];
    if (Number.isNaN(parseInt(this.ticketsNo))) {
      this._snackBar.open('Please enter a number', 'Close', { duration: 3000, verticalPosition: 'top' });
      return;
    }
    for (let index = 0; index < parseInt(this.ticketsNo); index++) {
      this.ticketsArray.push({
        numbers: this.generateNumbers(),
        superzahl: this.generateSuperzahl()
      });
    }
    this.ticketsService.sendTickets(this.ticketsArray).subscribe({
      next: () => {
        this.getAllTickets(false);
      }
    });
  }

  private generateNumbers = (numbersArray?: number[]): number[] => {
    if (!numbersArray) {
      numbersArray = [];
    }
    while (numbersArray.length < 6) {
      let generatedNumber = Math.floor(Math.random() * (49 - 1) + 1);
      if (!numbersArray.includes(generatedNumber)) {
        numbersArray.push(generatedNumber);
      } else {
        this.generateNumbers(numbersArray);
      }
    }
    return numbersArray.sort((a, b) => a - b);
  }

  private generateSuperzahl = (): number | undefined => {
    if (this.includeSuperzahl) {
      return Math.floor(Math.random() * (9 - 0) + 0);
    } else {
      return undefined;
    }
  }

  getAllTickets = (showWarning: boolean) => {
    this.ticketsService.getAllTickets().subscribe(resp => {
      if (showWarning && resp.savedTickets.length === 0) {
        this._snackBar.open('There are no saved tickets yet', 'Close', { duration: 3000, verticalPosition: 'top' })
      }
      this.savedTicketsArray = resp.savedTickets;
    });
  }

  deleteTickets = () => {
    this.ticketsService.deleteTickets().subscribe({
      next: () => {
        this.getAllTickets(false);
      }
    });
  }
}
