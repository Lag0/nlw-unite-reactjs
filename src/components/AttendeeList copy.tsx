import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { useState } from "react";
import { ModalComponent } from "./EditModal";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useToast } from "./ui/use-toast";
import { useAttendees } from "./UseAttendees";
import SearchBar from "./SearchBar";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export interface Attendee {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  createdAt: string;
  isCheckedIn: boolean | null;
  checkInDate: string | null;
}

export function AttendeeList() {
  const [isModalOpen, setIsOpenModal] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null
  );

  const [searchValue, setSearchValue] = useState<string>(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.get("search") || "";
  });

  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());
    return Number(url.searchParams.get("page") || 1);
  });

  const { attendees, total } = useAttendees(page, searchValue);
  const totalPages = Math.ceil(total / 10);

  const { toast } = useToast();
  function handleToast() {
    toast({
      title: "Funcionalidade não implementada",
      description: "Ainda estamos trabalhando nisso!",
      variant: "destructive",
    });
  }

  const handleEditButtonClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsOpenModal(true);
  };

  const setCurrentSearch = (search: string) => {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", search);
    window.history.pushState({}, "", url.toString());
    setSearchValue(search);
    setPage(1);
  };

  const setCurrentPage = (page: number) => {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url.toString());
    setPage(page);
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToPreviousPage = () => page > 1 && setCurrentPage(page - 1);
  const goToNextPage = () => page < totalPages && setCurrentPage(page + 1);
  const goToLastPage = () => setCurrentPage(totalPages);

  return (
    <>
      <div
        className={`flex flex-col gap-4 transition-all ${isModalOpen ? `blur-sm` : `blur-none`}`}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <SearchBar value={searchValue} onChange={setCurrentSearch} />
        </div>

        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }}>
                <Checkbox className="rounded border-white/10" />
              </TableHeader>
              <TableHeader style={{ width: 96 }}>Código</TableHeader>
              <TableHeader style={{ width: 128 }}>Ingresso</TableHeader>
              <TableHeader>Participante</TableHeader>
              <TableHeader style={{ width: 196 }}>
                Data de Inscrição
              </TableHeader>
              <TableHeader style={{ width: 256 }}>
                Status do Check-In
              </TableHeader>
              <TableHeader style={{ width: 64 }} />
            </tr>
          </thead>

          <tbody>
            {attendees.map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell>
                    <Checkbox className="rounded border-white/10" />
                  </TableCell>
                  <TableCell>{attendee.id}</TableCell>
                  <TableCell>{attendee.ticketId}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span>{attendee.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.isCheckedIn === false ? (
                      <span className="text-zinc-400">❌ Não fez Check-In</span>
                    ) : (
                      <span>
                        ✅ Check-In feito {dayjs().to(attendee.checkInDate)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger>
                        <IconButton transparent>
                          <MoreHorizontal className="size-4" />
                        </IconButton>
                      </PopoverTrigger>
                      <PopoverContent className="w-fit mr-6">
                        <div>
                          <h4 className="pl-1">Ações</h4>
                          <Separator className="my-3" />

                          <PopoverClose className="flex flex-col items-start ">
                            <Button
                              variant={"ghost"}
                              className="pl-1 font-normal"
                              onClick={() => handleEditButtonClick(attendee)}
                            >
                              Editar participantes
                            </Button>
                            <Button
                              variant={"ghost"}
                              className="pl-1 font-normal"
                              onClick={handleToast}
                            >
                              Deletar participantes
                            </Button>
                          </PopoverClose>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              );
            })}
          </tbody>

          <tfoot>
            <tr>
              <TableCell colSpan={3}>
                Mostrando {attendees.length} de {total} items
              </TableCell>
              <TableCell colSpan={3} className="text-right">
                <div className="inline-flex items-center gap-8">
                  <span>
                    Página {page} de {totalPages}...
                  </span>
                  <div className="flex gap-1.5">
                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                      <ChevronsLeft className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={goToPreviousPage}
                      disabled={page === 1}
                    >
                      <ChevronLeft className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={goToNextPage}
                      disabled={page === totalPages}
                    >
                      <ChevronRight className="size-4" />
                    </IconButton>
                    <IconButton
                      onClick={goToLastPage}
                      disabled={page === totalPages}
                    >
                      <ChevronsRight className="size-4" />
                    </IconButton>
                  </div>
                </div>
              </TableCell>
            </tr>
          </tfoot>
        </Table>
      </div>
      {isModalOpen && selectedAttendee && (
        <ModalComponent
          {...selectedAttendee}
          onClose={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
}
