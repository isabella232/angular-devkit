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
    test('should set page url and send pageview event', () => {
      adapter.sendPageView('/foobar');

      expect(gaInstance).toHaveBeenNthCalledWith(1, 'set', 'page', '/foobar');
      expect(gaInstance).toHaveBeenNthCalledWith(2, 'send', 'pageview');
    });
  });
});
