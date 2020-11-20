import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { PageTrack } from '../types';

@Injectable()
export class PageTracking {
  private readonly pageChangeSubject = new ReplaySubject<PageTrack>(1);

  get pageChange$(): Observable<PageTrack> {
    return this.pageChangeSubject.asObservable();
  }
  constructor(ngLocation: Location) {
    ngLocation.onUrlChange((url) => {
      this.pageChangeSubject.next({ url });
    });
  }
}
