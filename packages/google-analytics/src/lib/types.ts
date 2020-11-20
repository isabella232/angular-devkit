export type PageTrack = {
  url: string;
};

export type CustomEventTrack = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};

export type UserTimingTrack = {
  category: string;
  name: string;
  value: number;
  label?: string;
};
