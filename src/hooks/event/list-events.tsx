import { useState, useEffect, useCallback } from "react";
import { Event } from "../../types/Event";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useEventsList = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        console.log("👉 list-events response:", response);
        if (!response.ok) {
          throw new Error("Erro ao buscar lista de eventos");
        }
        const data = await response.json();
        setEventsList(data);
        setTotal(data.length);
      } catch (error) {
        console.error("Error while fetching event list:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsList();
  }, []);

  const addNewEvent = useCallback((newEvent: Event) => {
    setEventsList((currentEvent) => [newEvent, ...currentEvent]);
    setTotal((currentTotal) => currentTotal + 1);
  }, []);

  const deleteEvent = useCallback((eventId: string) => {
    setEventsList((currentEvents) =>
      currentEvents.filter((event) => event.id !== eventId)
    );
    useEffect(() => {}, [eventsList]);
    setTotal((currentTotal) => currentTotal - 1);
  }, []);

  const getIdBySlug = useCallback((slug?: string) => {
    return eventsList.find((event) => event.slug === slug)?.id;
  }, []);

  return { eventsList, loading, total, addNewEvent, deleteEvent, getIdBySlug };
};
