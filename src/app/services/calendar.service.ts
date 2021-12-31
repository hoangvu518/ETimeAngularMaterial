import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CalendarEvent } from '../models/share-models';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private _onNewEventAdded$ = new Subject<CalendarEvent>();
  constructor() { }

  get onNewEventAdded$(){
    return this._onNewEventAdded$.asObservable();
  }

  addEvent(eventData: CalendarEvent): Observable<any> {
    this._onNewEventAdded$.next(eventData);
    return of([]);;
  }
}
