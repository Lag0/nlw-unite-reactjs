import { useToast } from "@/components/ui/use-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function handleErrorResponse(response: Response, toast: any) {
  let errorTitle = "❌ Erro ao editar participante";
  let errorDescription = "Ocorreu um erro. Tente novamente mais tarde.";

  switch (response.status) {
    case 400:
      errorDescription = "Um participante com este e-mail já foi inscrito.";
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

export const useUpdateAttendee = () => {
  const { toast } = useToast();

  const updateAttendee = async (
    ticketId: string,
    name: string,
    email: string,
    isCheckedIn: boolean,
    checkInDate: string | null
  ) => {
    try {
      const response = await fetch(`${BASE_URL}/attendees/${ticketId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          isCheckedIn,
          checkInDate: checkInDate || "",
        }),
      });

      if (!response.ok) {
        handleErrorResponse(response, toast);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedAttendee = await response.json();
      console.log(`✅ Successfully updated attendee:`, updatedAttendee);
      toast({ title: "✅ Participante editado com sucesso!" });

      return updatedAttendee;
    } catch (error) {
      console.error("Failed to update attendee:", error);
    }
  };

  return updateAttendee;
};
