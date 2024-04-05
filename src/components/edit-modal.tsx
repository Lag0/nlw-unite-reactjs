import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import dayjs from "dayjs";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import { useToast } from "./ui/use-toast";

interface propsInterface {
  ticketId: string;
  name: string | undefined;
  email: string | undefined;
  createdAt: string;
  isCheckedIn: boolean | null;
  checkInDate: string | null;
  onClose: () => void;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function ModalComponent({
  ticketId,
  name,
  email,
  createdAt,
  isCheckedIn,
  checkInDate,
  onClose,
}: propsInterface) {
  const [inputName, setInputName] = useState(name || "");
  const [inputEmail, setInputEmail] = useState(email || "");
  const [isChecked, setIsChecked] = useState(isCheckedIn);
  const [inputCheckedInAt, setInputCheckedInAt] = useState(
    checkInDate ? dayjs(checkInDate).toISOString() : ""
  );

  const { toast } = useToast();

  const handleCheckedChange = (checked: CheckedState) => {
    setIsChecked(!isChecked);
    setInputCheckedInAt(checked ? new Date().toISOString() : "");
  };

  const handleSubmitButton = async () => {
    const updateData = {
      name: inputName || undefined,
      email: inputEmail || undefined,
      isCheckedIn: isChecked,
      checkInDate: inputCheckedInAt || undefined,
    };

    try {
      const response = await fetch(`${BASE_URL}/attendees/${ticketId}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      console.log(response.status);

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error details:", errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      toast({ title: "Informações do participante atualizadas com sucesso!" });

      onClose();
    } catch (error) {
      console.error(
        "Falha ao atualizar as informações do participante:",
        error
      );
      toast({
        title: "Erro ao atualizar as informações do participante",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
      onClose();
    }
  };
  return (
    <div className="absolute inset-0 z-10 m-auto max-h-min max-w-fit rounded-xl bg-zinc-950 p-10 ring-1 ring-white/10">
      <div className="flex flex-col items-start gap-4">
        <div className="">
          <h1 className="mb-1 text-lg font-semibold">
            Editar as informações dos participantes
          </h1>
          <p className="text-zinc-400">
            Faça as alterações nas informações dos participantes.
          </p>
        </div>
        <div>
          <div className="grid gap-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
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
                <Label htmlFor="checked-in-at">Data de Check-In</Label>
                <div className="h-10">
                  <Checkbox
                    checked={isChecked ? true : false}
                    onClick={() => {
                      handleCheckedChange(!isChecked);
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
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" onClick={handleSubmitButton}>
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
}
