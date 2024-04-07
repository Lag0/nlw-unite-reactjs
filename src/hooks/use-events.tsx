import { Events } from "@/types/Events";
import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // Supondo que BASE_URL seja definido globalmente ou importado de configurações

export const useEvent = (eventId: string) => {
  const [eventData, setEventData] = useState<Events | null>(null);
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
