import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAddAttendee } from "../../hooks/attendee/add-attendee";
import { useState } from "react";
import { Attendee } from "@/types/Attendee";
import { useParams } from "react-router-dom";
import { getEventInfo } from "@/hooks/event/get-event-by-slug";

interface AddAttendeeModalProps {
  onAddNewAttendee: (newAttendee: Attendee) => void;
}

export function AddAttendeeModal({ onAddNewAttendee }: AddAttendeeModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const addAttendee = useAddAttendee();
  const { slug } = useParams();
  const { eventData } = getEventInfo(slug!);

  const handleSubmitButton = async () => {
    try {
      const newAttendee = await addAttendee(name, email, eventData!.id);
      onAddNewAttendee(newAttendee);
    } catch (error) {
      console.error("Failed to add new attendee:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="gap-2 font-light border-dashed border"
          size={"sm"}
          variant={"ghost"}
        >
          <span>
            <PlusCircle className="size-4" />
          </span>
          Adicionar participantes
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar participante</DialogTitle>
          <DialogDescription>
            Preencha com as informações do participante que deseja adicionar
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-start gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome e Sobrenome"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
              required
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button type="submit" onClick={handleSubmitButton}>
                Adicionar
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
