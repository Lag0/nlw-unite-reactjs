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
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
} from "./ui/table";
import { useState } from "react";
import { EditAttendeeModal } from "./edit-attendee-modal";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { useAttendees } from "../hooks/use-attendees";
import { SearchBar } from "./search-bar";
import { AddAttendeeModal } from "./add-attendee-modal";
import { Attendee } from "../types/Attendee";
import { DeleteAttendeeDialog } from "./delete-attendee-dialog";
import { useEvent } from "@/hooks/use-events";
import { SkeletonTable } from "./skeleton-table";
import { SkeletonDescription } from "./skeleton-description";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

const EVENT_ID = "4d581edb-3f8c-4224-9182-c4398cfea080";

export default function AttendeeList() {
  const [isModalOpen, setIsOpenModal] = useState<boolean>(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null
  );
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [deleteAttendeeTicketId, setDeleteAttendeeTicketId] = useState<
    string | null
  >(null);

  const [searchValue, setSearchValue] = useState<string>(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.get("search") || "";
  });

  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());
    return Number(url.searchParams.get("page") || 1);
  });

  const {
    attendees,
    total,
    updateAttendee,
    addNewAttendee,
    deleteAttendee,
    loadingAttendees,
  } = useAttendees(page, searchValue, EVENT_ID);
  const { eventData, loading } = useEvent(EVENT_ID);

  const totalPages = Math.ceil(total / 10);

  const handleEditButtonClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsOpenModal(true);
  };

  const openDeleteDialog = (ticketId: string) => {
    setDeleteAttendeeTicketId(ticketId);
    setShowDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteAttendeeTicketId(null);
    setShowDeleteDialog(false);
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
  const goToLastPage = () =>
    setCurrentPage(totalPages ? totalPages : totalPages + 1);

  return (
    <>
      <div className={`flex flex-col gap-4 transition-all`}>
        <h1 className="text-2xl font-bold tracking-tight">Participantes</h1>
        {loading && <SkeletonDescription />}
        {!loading && (
          <p className="text-muted-foreground">
            Lista de participantes para o evento{" "}
            <strong>{eventData?.title || "Carregando..."}</strong>
          </p>
        )}

        <div className="flex items-center gap-3">
          <SearchBar value={searchValue} onChange={setCurrentSearch} />
          <AddAttendeeModal onAddNewAttendee={addNewAttendee} />
        </div>

        {loadingAttendees && <SkeletonTable />}

        {!loadingAttendees && (
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
                  <TableRow key={attendee.ticketId}>
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
                        <PopoverTrigger asChild>
                          <div>
                            <IconButton transparent>
                              <MoreHorizontal className="size-4" />
                            </IconButton>
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-fit mr-6">
                          <div>
                            <h4 className="pl-1">Ações</h4>
                            <Separator className="my-3" />

                            <PopoverClose asChild>
                              <div className="flex flex-col items-start ">
                                <Button
                                  variant={"ghost"}
                                  className="pl-1 font-normal"
                                  onClick={() =>
                                    handleEditButtonClick(attendee)
                                  }
                                >
                                  Editar participantes
                                </Button>
                                <Button
                                  variant={"ghost"}
                                  className="pl-1 font-normal"
                                  onClick={() =>
                                    openDeleteDialog(attendee.ticketId)
                                  }
                                >
                                  Deletar participantes
                                </Button>
                              </div>
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
                      Página {page} de{" "}
                      {totalPages ? totalPages : totalPages + 1}
                      ...
                    </span>
                    <div className="flex gap-1.5">
                      <IconButton onClick={goToFirstPage} disabled={page <= 1}>
                        <ChevronsLeft className="size-4" />
                      </IconButton>
                      <IconButton
                        onClick={goToPreviousPage}
                        disabled={page <= 1}
                      >
                        <ChevronLeft className="size-4" />
                      </IconButton>
                      <IconButton
                        onClick={goToNextPage}
                        disabled={page >= totalPages}
                      >
                        <ChevronRight className="size-4" />
                      </IconButton>
                      <IconButton
                        onClick={goToLastPage}
                        disabled={page >= totalPages}
                      >
                        <ChevronsRight className="size-4" />
                      </IconButton>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        )}
      </div>
      {isModalOpen && selectedAttendee && (
        <EditAttendeeModal
          {...selectedAttendee}
          onAttendeeUpdate={updateAttendee}
          onOpen={isModalOpen}
          onClose={() => setIsOpenModal(false)}
        />
      )}
      {showDeleteDialog && deleteAttendeeTicketId && (
        <DeleteAttendeeDialog
          ticketId={deleteAttendeeTicketId}
          onClose={closeDeleteDialog}
          onDeleted={() => {
            console.log("To be deleted", deleteAttendeeTicketId);
            deleteAttendee(deleteAttendeeTicketId);
            closeDeleteDialog();
          }}
        />
      )}
    </>
  );
}
