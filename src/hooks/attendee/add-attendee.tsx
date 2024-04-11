import { useToast } from "@/components/ui/use-toast";
import { Attendee } from "../../types/Attendee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function handleErrorResponse(response: Response, toast: any) {
  let errorTitle = "❌ Erro ao criar evento";
  let errorDescription = "Ocorreu um erro. Tente novamente mais tarde.";

  switch (response.status) {
    case 400:
      errorDescription = "Preencha todos os campos obrigatórios.";
      break;
    case 403:
      errorDescription = "Quantidade máxima de participantes atingida.";
      break;
    case 409:
      errorDescription = "Um participante com este e-mail já está inscrito.";
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

export const useAddAttendee = () => {
  const { toast } = useToast();
  const addAttendee = async (
    name: string,
    email: string,
    eventId: string
  ): Promise<Attendee> => {
    const response = await fetch(`${BASE_URL}/events/${eventId}/attendees`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email }),
    });

    if (!response.ok) {
      handleErrorResponse(response, toast);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const newAttendee = await response.json();
    console.log(`✅ Successfully added attendee:`, newAttendee);
    toast({ title: "✅ Participante adicionado com sucesso!" });

    return newAttendee;
  };

  return addAttendee;
};
