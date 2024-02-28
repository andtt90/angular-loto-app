import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Box, NumberFrequency, Ticket } from './shared/types';
import { TicketsServiceComponent } from './shared/services/tickets-service/tickets-service.component';
import { MatDividerModule } from '@angular/material/divider';
import { TicketComponent } from './ticket/ticket.component';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { TicketDialogComponent } from './ticket-dialog/ticket-dialog.component';

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
    TicketsServiceComponent,
    MatDividerModule,
    TicketComponent,
    MatListModule,
    TicketDialogComponent
  ],
  providers: [TicketsServiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'lottery-app';
  boxesNo = '';
  includeSuperzahl = false;
  ticket: Ticket = <Ticket>{};
  savedTicketsArray: Array<Ticket> = [];
  numbersFrequencyDictionary: NumberFrequency[] = [];

  constructor(private _snackBar: MatSnackBar, private ticketsService: TicketsServiceComponent, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllTickets();
    this.numbersFrequencyDictionary = this.generateNumbersFrequencyDictionary();
  }

  generateTicket = (): void => {
    let boxesArray = []
    if (Number.isNaN(parseInt(this.boxesNo))) {
      this._snackBar.open('Please enter a number', 'Close', { duration: 3000, verticalPosition: 'top' });
      return;
    }
    for (let index = 0; index < parseInt(this.boxesNo); index++) {
      boxesArray.push({
        numbers: this.generateNumbers(),
      });
      this.ticket = {
        boxesArray,
        superzahl: this.generateSuperzahl()
      }
    }
    this.ticketsService.sendTicket(this.ticket).subscribe({
      next: () => {
        this.getAllTickets();
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

  getAllTickets = () => {
    this.ticketsService.getAllTickets().subscribe(resp => {
      const savedTickets = resp.savedTickets;
      this.savedTicketsArray = savedTickets;
      savedTickets.forEach( (ticket: Ticket) => {
        ticket.boxes?.forEach( (box: any) => {
          box.forEach((number: any) => {
            this.numbersFrequencyDictionary[number].frequency++;
          });
        })
      })
    });
  }

  getTicketById = (id: number | undefined) => {
    this.ticketsService.getTicketById(id).subscribe({
      next: (resp) => {
        this.openTicketDialog(resp);
      }
    })
  }

  openTicketDialog(ticket: any) {
    this.dialog.open(TicketDialogComponent, {
      data: {
        ticket
      },
    });
  }

  generateNumbersFrequencyDictionary(): NumberFrequency[] {
    let numbersFrequencyDictionary: NumberFrequency[] = [];
    for (let i = 0; i <= 49; i++) {
      numbersFrequencyDictionary.push({
        number: i,
        frequency: 0
      });
    }
    return numbersFrequencyDictionary;
  }

  deleteTickets = () => {
    this.ticketsService.deleteTickets().subscribe({
      next: () => {
        this.getAllTickets();
        this.numbersFrequencyDictionary = this.generateNumbersFrequencyDictionary();
      }
    });
  }
}
