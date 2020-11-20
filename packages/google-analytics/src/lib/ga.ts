import { Injectable } from '@angular/core';

@Injectable()
export class GoogleAnalyticsAdapter {
  constructor(private readonly gaInstance: UniversalAnalytics.ga | null) {}

  sendPageView(url: string): void {
    if (this.gaInstance) {
      this.gaInstance('set', 'page', url);
      this.gaInstance('send', 'pageview');
    }
  }
}
