import { useState, useEffect, useCallback } from "react";
import { Attendee } from "../../types/Attendee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAttendees = (
  page: number,
  searchValue: string,
  eventId: string
) => {
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [loadingAttendees, setLoadingAttendees] = useState<boolean>(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchAttendees = async () => {
      try {
        const url = new URL(`${BASE_URL}/events/${eventId}/attendees`);
        url.searchParams.set("pageIndex", String(page - 1));
        if (searchValue) url.searchParams.set("query", searchValue);

        const response = await fetch(url.toString());
        const data = await response.json();
        setAttendees(data.attendees);
        setTotal(data.total);
      } catch (error) {
        console.error("❌ Falha ao buscar participantes:", error);
      } finally {
        setLoadingAttendees(false);
      }
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
    setAttendees((currentAttendees) => [newAttendee, ...currentAttendees]);
    setTotal((currentTotal) => currentTotal + 1);
  }, []);

  const deleteAttendee = useCallback((ticketId: string) => {
    console.log("Before delete", attendees);
    setAttendees((currentAttendees) =>
      currentAttendees.filter((attendee) => attendee.ticketId !== ticketId)
    );
    useEffect(() => {
      console.log("Attendees after update:", attendees);
    }, [attendees]);
    setTotal((currentTotal) => currentTotal - 1);
  }, []);

  return {
    attendees,
    total,
    updateAttendee,
    addNewAttendee,
    deleteAttendee,
    loadingAttendees,
  };
};
