import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import dayjs from "dayjs";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Attendee } from "../../types/Attendee";
import { useUpdateAttendee } from "../../hooks/attendee/update-attendee";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../ui/dialog";
import console from "console";

interface PropsInterface {
  ticketId: string;
  name: string;
  email: string;
  createdAt: string;
  isCheckedIn: boolean;
  checkInDate: string | null;
  onOpen: boolean;
  onClose: () => void;
  onAttendeeUpdate: (updatedData: Attendee) => void;
}

export function EditAttendeeModal({
  ticketId,
  name,
  email,
  createdAt,
  isCheckedIn,
  onOpen,
  onClose,
  onAttendeeUpdate,
}: PropsInterface) {
  const [inputName, setInputName] = useState(name ?? "");
  const [inputEmail, setInputEmail] = useState(email ?? "");
  const [inputCheckedIn, setInputCheckedIn] = useState(isCheckedIn);
  const updateAttendee = useUpdateAttendee();

  const handleCheckedChange = (checked: CheckedState) => {
    setInputCheckedIn(checked === true);
  };

  const handleSubmitButton = async () => {
    try {
      const updatedAttendee = await updateAttendee(
        ticketId,
        inputName,
        inputEmail,
        inputCheckedIn,
        inputCheckedIn ? new Date().toISOString() : null
      );

      onAttendeeUpdate(updatedAttendee.attendee);
      onClose();
    } catch (error) {
      console.error("Error updating attendee:", error);
      onClose();
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  return (
    <Dialog open={onOpen} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <h1 className="mb-1 text-lg font-semibold">
            Editar as informações dos participantes
          </h1>
          <p className="text-zinc-400">
            Faça as alterações nas informações dos participantes.
          </p>
        </DialogHeader>

        <div className="grid gap-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder={name}
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
              />
            </div>
            <div className="space-y-2 ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder={email}
                type="email"
                value={inputEmail}
                onChange={(e) => setInputEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="created-at">Data de Criação</Label>
              <Input
                id="created-at"
                placeholder={dayjs(createdAt).format("DD/MM/YYYY")}
                disabled
                readOnly
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checked-in-at">Status de Check-In</Label>
              <div className="h-10">
                <Checkbox
                  checked={inputCheckedIn ? true : false}
                  onClick={() => {
                    handleCheckedChange(!inputCheckedIn);
                  }}
                  className="rounded border-white/10"
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label className="" htmlFor="ticket-id">
              Ticket ID:
              <span className="ml-2 font-normal">{ticketId}</span>
            </Label>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <div className="space-x-2">
              <Button variant="outline" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button type="submit" onClick={handleSubmitButton}>
                Salvar
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
