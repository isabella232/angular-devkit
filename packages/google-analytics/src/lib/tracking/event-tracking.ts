import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { CustomEventTrack } from '../types';

@Injectable()
export class EventTracking {
  private readonly eventsSubject = new ReplaySubject<CustomEventTrack>(1);

  get events$(): Observable<CustomEventTrack> {
    return this.eventsSubject.asObservable();
  }

  pushEvent(event: CustomEventTrack): void {
    this.eventsSubject.next(event);
  }
}
