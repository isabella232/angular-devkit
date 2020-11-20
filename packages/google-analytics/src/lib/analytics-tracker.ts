import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AnalyticsTrackerConfig, defaultConfig } from './config';
import { GoogleAnalyticsAdapter } from './ga';
import { EventTracking } from './tracking/event-tracking';
import { PageTracking } from './tracking/page-tracking';
import { UserTimingTracking } from './tracking/user-timing-tracking';
import { CustomEventTrack, UserTimingTrack } from './types';

@Injectable()
export class AnalyticsTracker {
  private readonly config: AnalyticsTrackerConfig;

  constructor(
    config: AnalyticsTrackerConfig,
    private readonly pageTracking: PageTracking,
    private readonly eventTracking: EventTracking,
    private readonly userTimingTracking: UserTimingTracking,
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
    this.userTimingTracking.userTiming$
      .pipe(filter(() => !this.config.disableTracking))
      .subscribe((timing) => {
        this.gaAdapter.sendUserTiming(timing);
      });
  }

  captureCustomEvent(event: CustomEventTrack): void {
    this.eventTracking.push(event);
  }

  captureUserTiming(timing: UserTimingTrack): void {
    this.userTimingTracking.push(timing);
  }
}
