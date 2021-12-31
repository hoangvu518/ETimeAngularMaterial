import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CalendarEvent } from 'src/app/models/share-models';
import { CalendarService } from 'src/app/services/calendar.service';
import { EventAddData } from '../calendar/calendar.component';

@Component({
  selector: 'app-calendar-dialog-event-add',
  templateUrl: './calendar-dialog-event-add.component.html',
  styleUrls: ['./calendar-dialog-event-add.component.css']
})
export class CalendarDialogEventAddComponent implements OnInit {
  disabledSubmitButton = false;
  addEventForm = this.fb.group({
    subject: [null, Validators.required],
    startTime: [this.data.startDate, Validators.required],
    endTime: [this.data.startDate, Validators.required],
    detail: null
  });
  constructor(private fb: FormBuilder, 
              @Inject(MAT_DIALOG_DATA) public data: EventAddData,
              private calendarService: CalendarService,
              private dialogRef: MatDialogRef<CalendarDialogEventAddComponent>) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (!this.addEventForm.valid){
      return;
    } 
    this.disabledSubmitButton = true;
    const calendarEvent = <CalendarEvent>{
      title: this.addEventForm.get("subject")?.value,
      start: this.addEventForm.get("startTime")?.value,
      end: this.addEventForm.get("endTime")?.value,
    }
    this.calendarService.addEvent(calendarEvent).subscribe(()=> {
      this.dialogRef.close();
      console.log("event added");
    })
    this.disabledSubmitButton = false;
  }

}
