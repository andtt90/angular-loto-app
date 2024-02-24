import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketsServiceComponent } from './tickets-service.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('TicketsServiceComponent', () => {
  let component: TicketsServiceComponent;
  let fixture: ComponentFixture<TicketsServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketsServiceComponent],
      providers: [HttpClient, HttpHandler]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketsServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
