import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TicketDialogComponent } from './ticket-dialog.component';

describe('TicketDialogComponent', () => {
  let component: TicketDialogComponent;
  let fixture: ComponentFixture<TicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketDialogComponent, MatDialogModule],
      providers: [{
        provide: MAT_DIALOG_DATA,
        useValue: {
          ticket: {
            id: 1
          }
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
