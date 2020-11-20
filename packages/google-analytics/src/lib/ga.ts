import { Injectable } from '@angular/core';
import { CustomEventTrack } from './types';

@Injectable()
export class GoogleAnalyticsAdapter {
  constructor(private readonly gaInstance: UniversalAnalytics.ga | null) {}

  sendPageView(url: string): void {
    if (this.gaInstance) {
      this.gaInstance('set', 'page', url);
      this.gaInstance('send', 'pageview');
    }
  }

  sendEvent(event: CustomEventTrack): void {
    if (this.gaInstance) {
      this.gaInstance('send', {
        hitType: 'event',
        eventCategory: event.category,
        eventAction: event.action,
        eventLabel: event.label,
        eventValue: event.value,
      });
    }
  }
}
