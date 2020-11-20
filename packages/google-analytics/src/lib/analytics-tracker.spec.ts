import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsTracker } from './analytics-tracker';
import { GoogleAnalyticsAdapter } from './ga';
import { GoogleAnalyticsModule } from './google-analytics.module';

describe('AnalyticsTracker', () => {
  let service: AnalyticsTracker;
  let gaAdapter: GoogleAnalyticsAdapter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, GoogleAnalyticsModule.forRoot()],
      providers: [],
    });
    service = TestBed.inject(AnalyticsTracker);
    gaAdapter = TestBed.inject(GoogleAnalyticsAdapter);
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should track page change event', () => {
    const loc = TestBed.inject(Location);
    jest.spyOn(gaAdapter, 'sendPageView');

    service.startTracking();
    loc.go('/foobar');

    expect(gaAdapter.sendPageView).toBeCalledWith('/foobar');
  });
});
