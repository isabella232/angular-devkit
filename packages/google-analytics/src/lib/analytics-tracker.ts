import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { AnalyticsTrackerConfig, defaultConfig } from './config';
import { GoogleAnalyticsAdapter } from './ga';
import { PageTracking } from './tracking/page-tracking';

@Injectable()
export class AnalyticsTracker {
  private readonly config: AnalyticsTrackerConfig;

  constructor(
    config: AnalyticsTrackerConfig,
    private readonly pageTracking: PageTracking,
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
  }
}
