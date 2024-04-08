import { Event } from "../../types/Event";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getEventInfo = (eventId: string) => {
  const [eventData, setEventData] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/events/396fffb3-c127-4f02-a3f2-e25decbdfd5e`
        );
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
  }, [eventId]);

  return { eventData, loading };
};
