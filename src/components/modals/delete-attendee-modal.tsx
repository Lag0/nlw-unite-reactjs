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
  onClose: () => void;
  onDeleted: () => void;
}

export const DeleteAttendeeDialog: React.FC<DeleteAttendeeDialogProps> = ({
  ticketId,
  onClose,
  onDeleted,
}) => {
  const deleteAttendee = useDeleteAttendee();

  const handleDeleteConfirm = async () => {
    await deleteAttendee(ticketId);
    onClose();
    onDeleted();
  };

  return (
    <AlertDialog open={true} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja excluir este participante? Esta ação não pode
          ser desfeita.
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
