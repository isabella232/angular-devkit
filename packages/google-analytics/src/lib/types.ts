export type PageTrack = {
  url: string;
};

export type CustomEventTrack = {
  category: string;
  action: string;
  label?: string;
  value?: number;
};
