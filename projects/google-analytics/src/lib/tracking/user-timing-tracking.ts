import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { UserTimingTrack } from '../types';

@Injectable()
export class UserTimingTracking {
  private readonly userTimingSubject = new ReplaySubject<UserTimingTrack>(1);

  get userTiming$(): Observable<UserTimingTrack> {
    return this.userTimingSubject.asObservable();
  }

  push(timing: UserTimingTrack): void {
    this.userTimingSubject.next(timing);
  }
}
