import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarEvent } from 'src/app/models/share-models';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarDialogEventAddComponent } from '../calendar-dialog-event-add/calendar-dialog-event-add.component';
export interface EventAddData {
  startDate: string;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})

export class CalendarComponent implements OnInit {

  @ViewChild('calendar') calendarComponent?: FullCalendarComponent;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    selectable: true,
    events:[],
    // select: (selectionInfo) => this.onDateSelect(selectionInfo),
    businessHours: {
      // days of week. an array of zero-based day of week integers (0=Sunday)
      daysOfWeek: [ 1, 2, 3, 4, 5 ], // Monday - Thursday
    }
    
  };
  constructor(public dialog: MatDialog, private calendarService: CalendarService) { }

  ngOnInit(): void {
    this.calendarService.onNewEventAdded$.subscribe((event) => {
      this.calendarComponent?.getApi().addEvent(event);
    })
  }

  handleDateClick(arg: any) {
    this.dialog.open(CalendarDialogEventAddComponent, {
      minWidth: 400,
      data: {
        startDate: arg.date
      }
    });
    //  alert('date click! ' + arg.dateStr)
    console.log(arg);
    console.log(arg.dateStr)
  }

  onDateSelect(selectionInfo: any){
    // alert(`${selectionInfo.start} to ${selectionInfo.end}`);
    let event = <CalendarEvent>{
      title: "Test title",
      start: selectionInfo.start,
      end: selectionInfo.end,
    }

    this.dialog.open(CalendarDialogEventAddComponent, {
      minWidth: 400
    });

    this.calendarComponent?.getApi().addEvent(event);

    // const myDate = new Date(2022, 2, 15);
    // this.calendarComponent?.getApi().gotoDate(myDate)
    // this.calendarOptions.eventAdd(event);
  }
}
