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
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { PopoverClose } from "@radix-ui/react-popover";
import { SearchBar } from "./search-bar";
import { useEventsList } from "@/hooks/event/list-events";
import { SkeletonTable } from "./skeletons/skeleton-table";
import { SkeletonDescription } from "./skeletons/skeleton-description";
import { AddEventModal } from "./modals/add-event-modal";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export default function EventList() {
  const [searchValue, setSearchValue] = useState<string>(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.get("search") || "";
  });

  const [page, setPage] = useState<number>(() => {
    const url = new URL(window.location.toString());
    return Number(url.searchParams.get("page") || 1);
  });

  const { eventsList, loading, addNewEvent } = useEventsList();

  const total = eventsList.length;

  const totalPages = Math.ceil(total / 10);

  // const handleEditButtonClick = (attendee: Attendee) => {
  //   setSelectedAttendee(attendee);
  //   setIsOpenModal(true);
  // };

  // const openDeleteDialog = (ticketId: string) => {
  //   setDeleteAttendeeTicketId(ticketId);
  //   setShowDeleteDialog(true);
  // };

  // const closeDeleteDialog = () => {
  //   setDeleteAttendeeTicketId(null);
  //   setShowDeleteDialog(false);
  // };

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
        <h1 className="text-2xl font-bold tracking-tight">Eventos</h1>
        {loading && <SkeletonDescription />}
        {!loading && (
          <p className="text-muted-foreground">
            Lista de eventos cadastrados na plataforma.
          </p>
        )}

        <div className="flex items-center gap-3">
          <SearchBar
            value={searchValue}
            onChange={setCurrentSearch}
            placeholder="Buscar eventos..."
          />
          <AddEventModal onAddNewEvent={addNewEvent} />
        </div>

        {loading && <SkeletonTable />}

        {!loading && (
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead role="checkbox" className="col-span-1">
                  <Checkbox className="rounded border-white/10" />
                </TableHead>
                <TableHead>ID do Evento</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Participantes</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>

            <TableBody>
              {eventsList.map((event) => {
                return (
                  <TableRow key={event.id}>
                    <TableCell role="checkbox">
                      <Checkbox className="rounded border-white/10" />
                    </TableCell>
                    <TableCell>{event.id}</TableCell>
                    <TableCell className="font-semibold">
                      <a href="/eventos" className="underline">
                        {event.title}
                      </a>
                    </TableCell>
                    <TableCell>{event.slug}</TableCell>
                    <TableCell>{event.maximumAttendees}</TableCell>
                    <TableCell>{event.currentAttendees}</TableCell>
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
                                  // onClick={() =>
                                  //   handleEditButtonClick(attendee)
                                  // }
                                >
                                  Editar evento
                                </Button>
                                <Button
                                  variant={"ghost"}
                                  className="pl-1 font-normal"
                                  // onClick={() =>
                                  //   openDeleteDialog(attendee.ticketId)
                                  // }
                                >
                                  Deletar evento
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
                  Mostrando {eventsList.length} de {total} items
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
      {/* {isModalOpen && selectedAttendee && (
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
      )} */}
    </>
  );
}
