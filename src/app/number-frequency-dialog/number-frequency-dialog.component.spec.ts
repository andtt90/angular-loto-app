import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NumberFrequencyDialogComponent } from './number-frequency-dialog.component';

describe('NumberFrequencyDialogComponent', () => {
  let component: NumberFrequencyDialogComponent;
  let fixture: ComponentFixture<NumberFrequencyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NumberFrequencyDialogComponent],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: []
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NumberFrequencyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
