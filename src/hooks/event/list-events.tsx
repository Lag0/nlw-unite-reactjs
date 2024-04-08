import { useState, useEffect, useCallback } from "react";
import { Event } from "../../types/Event";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useEventsList = (page: number, searchValue: string) => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const url = new URL(`${BASE_URL}/events`);
        url.searchParams.set("pageIndex", String(page - 1));
        if (searchValue) url.searchParams.set("query", searchValue);

        const response = await fetch(url.toString());
        if (!response.ok) throw new Error("❌ Falha ao buscar eventos");

        const data = await response.json();
        setEventsList(data);
        setTotal(data.length);
      } catch (error) {
        console.error("❌ Falha ao buscar participantes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsList();
  }, [page, searchValue]);

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
