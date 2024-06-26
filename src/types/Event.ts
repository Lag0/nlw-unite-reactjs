export interface Event {
  id: string;
  title: string;
  slug: string;
  details: string;
  maximumAttendees: number;
  currentAttendees: number;
  price: number;
  createdAt: string;
}
