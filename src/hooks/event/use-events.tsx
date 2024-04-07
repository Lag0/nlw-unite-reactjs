import { Event } from "@/types/Event";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useEventInfo = (eventId: string) => {
  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

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

  return { eventData, loading };
};

export const useEventsList = () => {
  const [eventsList, setEventsList] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        if (!response.ok) {
          throw new Error("Erro ao buscar lista de eventos");
        }
        const data = await response.json();
        setEventsList(data);
      } catch (error) {
        console.error("Falha ao buscar lista de eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventsList();
  }, []);

  return { eventsList, loading };
};
