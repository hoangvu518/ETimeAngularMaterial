import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDialogEventAddComponent } from './calendar-dialog-event-add.component';

describe('CalendarDialogEventAddComponent', () => {
  let component: CalendarDialogEventAddComponent;
  let fixture: ComponentFixture<CalendarDialogEventAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDialogEventAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarDialogEventAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
