export type Attendee = {
  name: string;
  linkedin: string;
  twitter: string;
  lumaId: string;
};

export type Event = {
  name: string;
  date: string;
  location: string;
  eventId: string;
  image: string;
  color: string;
};

export type EventAttendee = {
  lumaId: string;
  eventId: string;
};

export type Scrape = {
  lumaId: string;
  eventId: string;
};
