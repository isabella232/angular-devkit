export abstract class AnalyticsTrackerConfig {
  abstract disableTracking: boolean;
}

export const defaultConfig: AnalyticsTrackerConfig = {
  disableTracking: false,
};
