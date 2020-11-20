import { GoogleAnalyticsAdapter } from './ga';

describe('GoogleAnalyticsAdapter', () => {
  let adapter: GoogleAnalyticsAdapter;
  let gaInstance: UniversalAnalytics.ga;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gaInstance = jest.fn() as any;
    adapter = new GoogleAnalyticsAdapter(gaInstance);
  });

  test('should create an instance', () => {
    expect(adapter).toBeTruthy();
  });

  describe('pageview', () => {
    test('should set page url and send pageview hit', () => {
      adapter.sendPageView('/foobar');

      expect(gaInstance).toHaveBeenNthCalledWith(1, 'set', 'page', '/foobar');
      expect(gaInstance).toHaveBeenNthCalledWith(2, 'send', 'pageview');
    });
  });

  describe('event', () => {
    test('should send event hit', () => {
      adapter.sendEvent({
        category: 'fooCat',
        action: 'fooAction',
        label: 'fooLabel',
        value: 100,
      });

      expect(gaInstance).toHaveBeenNthCalledWith(1, 'send', {
        hitType: 'event',
        eventCategory: 'fooCat',
        eventAction: 'fooAction',
        eventLabel: 'fooLabel',
        eventValue: 100,
      });
    });
  });

  describe('user timing', () => {
    test('should send timing hit', () => {
      adapter.sendUserTiming({
        category: 'fooCat',
        name: 'fooVar',
        value: 100,
        label: 'fooLabel',
      });

      expect(gaInstance).toHaveBeenNthCalledWith(1, 'send', {
        hitType: 'timing',
        timingCategory: 'fooCat',
        timingVar: 'fooVar',
        timingValue: 100,
        timingLabel: 'fooLabel',
      });
    });
  });

  describe('tracking context', () => {
    test('is able to set user id', () => {
      adapter.setUserId('foo');

      expect(gaInstance).toHaveBeenNthCalledWith(1, 'set', 'userId', 'foo');
    });
  });
});
