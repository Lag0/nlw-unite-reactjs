import { useToast } from "../../components/ui/use-toast";
import { Event } from "../../types/Event";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function handleErrorResponse(response: Response, toast: any) {
  let errorTitle = "❌ Erro ao criar evento";
  let errorDescription = "Ocorreu um erro. Tente novamente mais tarde.";

  switch (response.status) {
    case 400:
      errorDescription = "Um evento com este nome já existe.";
      break;
    case 500:
      errorDescription =
        "Ocorreu um erro inesperado. Tente novamente mais tarde.";
      break;
    default:
      errorDescription =
        "Ocorreu um erro desconhecido. Tente novamente mais tarde.";
  }

  toast({
    title: errorTitle,
    description: errorDescription,
    variant: "destructive",
  });
}

interface addEventProps {
  title: string;
  details?: string;
  maximumAttendees?: number;
  price?: number;
}

export const useAddEvent = () => {
  const { toast } = useToast();
  const addEvent = async ({
    title,
    details,
    maximumAttendees,
    price,
  }: addEventProps): Promise<Event> => {
    const response = await fetch(`${BASE_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        details,
        maximumAttendees,
        price,
      }),
    });

    if (!response.ok) {
      handleErrorResponse(response, toast);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newEvent = await response.json();
    console.log(`✅ Successfully added event:`, newEvent);
    toast({ title: "✅ Evento criado com sucesso!" });

    return newEvent;
  };

  return addEvent;
};
