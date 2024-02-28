import { Component, Inject } from '@angular/core';
import { NumberFrequency } from '../shared/types';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-number-frequency-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogTitle, MatTableModule],
  templateUrl: './number-frequency-dialog.component.html',
  styleUrl: './number-frequency-dialog.component.css'
})
export class NumberFrequencyDialogComponent {
  numbersFrequencyDictionary: NumberFrequency[] = [];
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.numbersFrequencyDictionary = data.numbersFrequencyDictionary;
  }
}
