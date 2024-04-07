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

import { useState } from "react";
import { Event } from "@/types/Event";

interface AddEventModalProps {
  onAddNewEvent?: (newEvent: Event) => void;
}

export function AddEventModal({ onAddNewEvent }: AddEventModalProps) {
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [maximumAttendees, setMaximumAttendees] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  // const addEvent = useAddEvent();

  const handleSubmitButton = async () => {
    try {
      const newEvent = await addEvent(title, details, maximumAttendees, price);
      if (onAddNewEvent) onAddNewEvent(newEvent);
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
          Adicionar evento
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-80 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar evento</DialogTitle>
          <DialogDescription>
            Preencha com as informações do evento que deseja adicionar
          </DialogDescription>
        </DialogHeader>
        <div className="grid items-start gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Título
            </Label>
            <Input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título do seu evento muito legal!"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="details" className="text-right">
              Descrição
            </Label>
            <Input
              id="details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Descrição do seu evento muito legal!"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maximumAttendees" className="text-right">
              Descrição
            </Label>
            <Input
              id="maximumAttendees"
              value={maximumAttendees}
              onChange={(e) => setMaximumAttendees(e.target.value)}
              placeholder="Quantidade de participantes"
              required
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Descrição
            </Label>
            <Input
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do evento (0) para gratuito"
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
