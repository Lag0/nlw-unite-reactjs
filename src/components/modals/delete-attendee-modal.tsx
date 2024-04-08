import { useDeleteEvent } from "@/hooks/event/delete-event";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { useDeleteAttendee } from "@/hooks/attendee/delete-attendee";

interface DeleteAttendeeDialogProps {
  ticketId: string;
  isAttendee?: boolean;
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteAttendeeDialog: React.FC<DeleteAttendeeDialogProps> = ({
  ticketId,
  isAttendee,
  onClose,
  onDeleted,
}) => {
  const deleteAttendee = useDeleteAttendee();
  const deleteEvent = useDeleteEvent();

  const handleDeleteConfirm = async () => {
    if (!isAttendee) {
      await deleteEvent(ticketId);
      onClose();
      onDeleted();
      return;
    }
    await deleteAttendee(ticketId);
    onClose();
    onDeleted();
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir este{" "}
          {isAttendee ? "participante" : "evento"}? Esta ação não pode ser
          desfeita.
        </AlertDialogDescription>
        <div className="flex justify-end gap-4 mt-4">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancelar</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              variant="destructive"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
              onClick={handleDeleteConfirm}
            >
              Confirmar
            </Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};
