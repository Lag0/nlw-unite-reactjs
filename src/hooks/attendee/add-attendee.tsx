import { useToast } from "@/components/ui/use-toast";
import { Attendee } from "../../types/Attendee";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      if (response.status === 400) {
        toast({
          title: "❌ Erro ao adicionar participante",
          description: "Um participante com este e-mail já foi inscrito.",
          variant: "destructive",
        });
      } else if (response.status === 500) {
        toast({
          title: "❌ Erro ao adicionar participante",
          description:
            "Ocorreu um erro inesperado. Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const newAttendee = await response.json();
    console.log(`✅ Successfully added attendee:`, newAttendee);
    toast({ title: "✅ Participante adicionado com sucesso!" });

    return newAttendee;
  };

  return addAttendee;
};
