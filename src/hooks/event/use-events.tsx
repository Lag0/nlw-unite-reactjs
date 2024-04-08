import { Event } from "@/types/Event";
import { useState, useEffect, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useEventInfo = (eventId: string) => {
  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar detalhes do evento");
        }
        const data = await response.json();
        setEventData(data.event);
      } catch (error) {
        console.error("Falha ao buscar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const addNewEvent = useCallback((newEvent: Event) => {
    setEventData((currentEvent) => [newEvent, ...currentEvent]);
    setTotal((currentTotal) => currentTotal + 1);
  }, []);

  return { eventData, loading, addNewEvent };
};
