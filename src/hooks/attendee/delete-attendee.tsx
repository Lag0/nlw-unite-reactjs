import { useToast } from "@/components/ui/use-toast";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function handleErrorResponse(response: Response, toast: any) {
  let errorTitle = "❌ Erro ao editar participante";
  let errorDescription = "Ocorreu um erro. Tente novamente mais tarde.";

  switch (response.status) {
    case 404:
      errorDescription = "Participante não encontrado.";
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

export const useDeleteAttendee = () => {
  const { toast } = useToast();
  const deleteAttendee = async (ticketId: string): Promise<void> => {
    const response = await fetch(`${BASE_URL}/attendees/${ticketId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      handleErrorResponse(response, toast);
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log(`✅ Successfully deleted attendee:`);
    toast({ title: "✅ Participante excluído com sucesso!" });
  };
  return deleteAttendee;
};
