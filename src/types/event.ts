import { RRule } from 'rrule';

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  parish: string;
  imageUrl: string;
  category: string;
  description: string;
  price: number;
  organizer: {
    name: string;
    role: string;
    imageUrl: string;
  };
  schedule: Array<{
    time: string;
    activity: string;
  }>;
  // New fields
  isRecurring: boolean;
  recurrenceRule?: RRule;
  maxAttendees?: number;
  waitlistEnabled: boolean;
  waitlist: Array<{
    userId: string;
    name: string;
    email: string;
    timestamp: Date;
  }>;
  isHybrid: boolean;
  streamingUrl?: string;
  liturgicalDay?: string;
  templateId?: string;
  seriesId?: string;
}