import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AnalyticsTracker } from './analytics-tracker';
import { GoogleAnalyticsAdapter } from './ga';
import { GoogleAnalyticsModule } from './google-analytics.module';
import { CustomEventTrack, UserTimingTrack } from './types';

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

  it('should track custom event', () => {
    jest.spyOn(gaAdapter, 'sendEvent');

    service.startTracking();

    const event: CustomEventTrack = {
      category: 'test',
      action: 'click',
      label: 'test clicked',
    };

    service.captureCustomEvent(event);

    expect(gaAdapter.sendEvent).toBeCalledWith(event);
  });

  it('should track user-timing', () => {
    jest.spyOn(gaAdapter, 'sendUserTiming');

    service.startTracking();

    const timing: UserTimingTrack = {
      category: 'test',
      name: 'click',
      value: 100,
      label: 'test timing',
    };

    service.captureUserTiming(timing);

    expect(gaAdapter.sendUserTiming).toBeCalledWith(timing);
  });

  it('should be able to set user context', () => {
    jest.spyOn(gaAdapter, 'setUserId');

    service.setUserContext({ id: 'test' });

    expect(gaAdapter.setUserId).toBeCalledWith('test');
  });

  it('should be able to clear user context', () => {
    jest.spyOn(gaAdapter, 'setUserId');

    service.clearUserContext();

    expect(gaAdapter.setUserId).toBeCalledWith(null);
  });

  it('should be able to set custom dimensions', () => {
    jest.spyOn(gaAdapter, 'setCustomDimensions');

    service.setCustomDimensions({
      dimension1: 'value1',
      dimension2: 'value2',
    });

    expect(gaAdapter.setCustomDimensions).toBeCalledWith({
      dimension1: 'value1',
      dimension2: 'value2',
    });
  });
});
