import { useState, useEffect, useCallback } from "react";
import { Attendee } from "../types/Attendee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAttendees = (page: number, searchValue: string) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAttendees = async () => {
      const url = new URL(
        `${BASE_URL}/events/4d581edb-3f8c-4224-9182-c4398cfea080/attendees`
      );
      url.searchParams.set("pageIndex", String(page - 1));
      if (searchValue) url.searchParams.set("query", searchValue);

      const response = await fetch(url.toString());
      const data = await response.json();
      setAttendees(data.attendees);
      setTotal(data.total);
    };

    fetchAttendees();
  }, [page, searchValue]);

  const updateAttendee = useCallback((updatedAttendee: Attendee) => {
    setAttendees((currentAttendees) =>
      currentAttendees.map((attendee) =>
        attendee.ticketId === updatedAttendee.ticketId
          ? updatedAttendee
          : attendee
      )
    );
  }, []);

  const addNewAttendee = useCallback((newAttendee: Attendee) => {
    setAttendees((currentAttendees) => [...currentAttendees, newAttendee]);
    setTotal((currentTotal) => currentTotal + 1);
  }, []);

  return { attendees, total, updateAttendee, addNewAttendee };
};
