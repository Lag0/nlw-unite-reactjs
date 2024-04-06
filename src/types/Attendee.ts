export interface Attendee {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  createdAt: string;
  isCheckedIn: boolean | null;
  checkInDate: string | null;
}
