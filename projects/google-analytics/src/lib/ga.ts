import { CustomEventTrack, UserTimingTrack } from './types';

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
      this.gaInstance('send', 'event', {
        eventCategory: event.category,
        eventAction: event.action,
        eventLabel: event.label,
        eventValue: event.value,
      });
    }
  }

  sendUserTiming(timing: UserTimingTrack): void {
    if (this.gaInstance) {
      this.gaInstance('send', 'timing', {
        timingCategory: timing.category,
        timingVar: timing.name,
        timingValue: timing.value,
        timingLabel: timing.label,
      });
    }
  }

  setUserId(userId: string | null): void {
    if (this.gaInstance) {
      this.gaInstance('set', 'userId', userId ?? undefined);
    }
  }

  setCustomDimensions(dimensions: Record<string, string>): void {
    if (this.gaInstance) {
      for (const key of Object.keys(dimensions)) {
        if (key.match(/^dimension[0-9]+$/)) {
          this.gaInstance('set', key, dimensions[key]);
        }
      }
    }
  }
}
