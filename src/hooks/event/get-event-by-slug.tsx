import { Event } from "../../types/Event";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEventInfo = (slug: string) => {
  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/slug/${slug}`);
        console.log("👉 get-event response:", response);
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
  }, [slug]);

  return { eventData, loading };
};
