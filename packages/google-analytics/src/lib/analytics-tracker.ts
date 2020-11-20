import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AnalyticsTrackerConfig, defaultConfig } from './config';
import { GoogleAnalyticsAdapter } from './ga';
import { EventTracking } from './tracking/event-tracking';
import { PageTracking } from './tracking/page-tracking';
import { CustomEventTrack } from './types';

@Injectable()
export class AnalyticsTracker {
  private readonly config: AnalyticsTrackerConfig;

  constructor(
    config: AnalyticsTrackerConfig,
    private readonly pageTracking: PageTracking,
    private readonly eventTracking: EventTracking,
    private readonly gaAdapter: GoogleAnalyticsAdapter
  ) {
    this.config = { ...defaultConfig, ...config };
  }

  startTracking(): void {
    this.pageTracking.pageChange$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe(({ url }) => {
        this.gaAdapter.sendPageView(url);
      });
    this.eventTracking.events$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe((event) => {
        this.gaAdapter.sendEvent(event);
      });
  }

  captureCustomEvent(event: CustomEventTrack): void {
    this.eventTracking.pushEvent(event);
  }
}
