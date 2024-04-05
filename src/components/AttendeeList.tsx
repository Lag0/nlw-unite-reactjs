import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";

import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";
import { ModalComponent } from "./edit-modal";
import { Checkbox } from "./ui/checkbox";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

interface Attendee {
  id: string;
  ticketId: string;
  name: string;
  email: string;
  createdAt: string;
  isCheckedIn: boolean | null;
  checkInDate: string | null;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function AttendeeList() {
  const [searchValue, setSearchValue] = useState(() => {
    const url = new URL(window.location.toString());
    return url.searchParams.get("search") || "";
  });

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    return Number(url.searchParams.get("page") || 1);
  });

  const [isModalOpen, setIsOpenModal] = useState(false);
  const [selectedAttendee, setSelectedAttendee] = useState<Attendee | null>(
    null
  );
  const [total, setTotal] = useState(0);
  const [attendees, setAttendees] = useState<Attendee[]>([]);

  const totalPages = Math.ceil(total / 10);

  const handleEditButtonClick = (attendee: Attendee) => {
    setSelectedAttendee(attendee);
    setIsOpenModal(true);
  };

  useEffect(() => {
    const url = new URL(
      `${BASE_URL}/events/4d581edb-3f8c-4224-9182-c4398cfea080/attendees`
    );

    url.searchParams.set("pageIndex", String(page - 1));

    if (searchValue.length > 0) {
      url.searchParams.set("query", searchValue);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees);
        setTotal(data.total);
      });
  }, [page, searchValue]);

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString());
    url.searchParams.set("search", search);
    window.history.pushState({}, "", url.toString());
    setSearchValue(search);
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page));
    window.history.pushState({}, "", url.toString());
    setPage(page);
  }

  function onSearchInputChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value);
    setCurrentPage(1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage(page - 1);
  }

  function goToNextPage() {
    setCurrentPage(page + 1);
  }

  function goToLastPage() {
    setCurrentPage(totalPages);
  }

  return (
    <>
      <div
        className={`flex flex-col gap-4 ${isModalOpen ? `blur-sm transition-all` : `blur-none transition-all`}`}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold">Participantes</h1>
          <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
            <Search className="size-4 text-emerald-300" />
            <input
              onChange={onSearchInputChange}
              value={searchValue}
              type="text"
              placeholder="Buscar participante..."
              className="h-auto flex-1 border-0 bg-transparent p-0 text-sm focus:ring-0"
            />
          </div>
        </div>

        <Table>
          <thead>
            <tr className="border-b border-white/10">
              <TableHeader style={{ width: 48 }}>
                <Checkbox className="size-4 rounded border border-white/10 bg-black/20 focus:ring-0" />
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
                    <Checkbox className="size-4 rounded border border-white/10 bg-black/20 focus:ring-0" />
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
                    <IconButton
                      transparent
                      id="modal-button"
                      onClick={() => handleEditButtonClick(attendee)}
                    >
                      <MoreHorizontal className="size-4" />
                    </IconButton>
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
        <div className="absolute inset-0 z-50">
          <ModalComponent
            {...selectedAttendee}
            onClose={() => setIsOpenModal(false)}
          />
        </div>
      )}
    </>
  );
}
