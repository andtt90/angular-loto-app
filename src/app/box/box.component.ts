import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-box-component',
  standalone: true,
  imports: [MatCardModule, MatGridListModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() numbers: number[] = [];
}
