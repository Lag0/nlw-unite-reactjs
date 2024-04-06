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
import { Table, TableBody, TableFooter, TableHead } from "./ui/table";
import { TableHeader } from "./ui/table";
import { TableCell } from "./ui/table";
import { TableRow } from "./ui/table";
import { useState } from "react";
import { ModalComponent } from "./edit-attendee-modal";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAttendees } from "../hooks/use-attendees";
import { SearchBar } from "./search-bar";
import { AddAttendeeModal } from "./add-attendee-modal";
import { Attendee } from "../types/Attendee";
import { useToast } from "../components/ui/use-toast";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function AttendeeList() {
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
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

  const { attendees, total, updateAttendee, addNewAttendee } = useAttendees(
    page,
    searchValue
  );

  const totalPages = Math.ceil(total / 10);

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

  const { toast } = useToast();
  function handleErrorToast() {
    toast({
      title: "Funcionalidade não implementada",
      description: "Ainda estamos trabalhando nisso!",
      variant: "destructive",
    });
  }

  return (
    <>
      <div className={`flex flex-col gap-4 transition-all`}>
        <h1 className="text-2xl font-bold tracking-tight">Participantes</h1>
        <p className="text-muted-foreground">
          Lista de participantes para o evento <strong>NLW Unite</strong>
        </p>

        <div className="flex items-center gap-3">
          <SearchBar value={searchValue} onChange={setCurrentSearch} />
          <AddAttendeeModal onAddNewAttendee={addNewAttendee} />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10">
              <TableHead role="checkbox" className="col-span-1">
                <Checkbox className="rounded border-white/10" />
              </TableHead>
              {/* <TableHead>Código</TableHead> */}
              <TableHead>Ingresso</TableHead>
              <TableHead>Participante</TableHead>
              <TableHead>Data de Inscrição</TableHead>
              <TableHead>Status do Check-In</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {attendees.map((attendee) => {
              return (
                <TableRow key={attendee.id}>
                  <TableCell role="checkbox">
                    <Checkbox className="rounded border-white/10" />
                  </TableCell>
                  {/* <TableCell>{attendee.id}</TableCell> */}
                  <TableCell>{attendee.ticketId}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-white">
                        {attendee.name}
                      </span>
                      <span className="text-muted-foreground">
                        {attendee.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
                  <TableCell>
                    {attendee.isCheckedIn === false ? (
                      <span className="text-muted-foreground">
                        ❌ Não fez Check-In
                      </span>
                    ) : (
                      <span className="text-foreground">
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
                              onClick={handleErrorToast}
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
          </TableBody>

          <TableFooter className="bg-transparent">
            <TableRow>
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
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      {isModalOpen && selectedAttendee && (
        <ModalComponent
          {...selectedAttendee}
          onClose={() => setIsOpenModal(false)}
          onAttendeeUpdate={updateAttendee}
        />
      )}
    </>
  );
}
