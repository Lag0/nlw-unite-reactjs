import { Checkbox } from "@radix-ui/react-checkbox";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";

import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";

export function SkeletonTable() {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-white/10">
            <TableHead className="col-span-1">
              <Skeleton className="size-4" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-36 rounded-lg" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-36 rounded-lg" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-36 rounded-lg" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-36 rounded-lg" />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((attendee) => {
            return (
              <TableRow key={attendee}>
                <TableCell role="checkbox">
                  <Skeleton className="size-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36 rounded-lg" />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      <Skeleton className="h-6 w-36" />
                    </span>
                    <span className="text-muted-foreground">
                      <Skeleton className="h-6 w-36" />
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-6 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="size-6" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>

        <TableFooter className="bg-transparent">
          <TableRow>
            <TableCell colSpan={3}>
              <Skeleton className="h-16" />
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <Skeleton className="h-16" />
                <div className="flex gap-1.5">
                  <Skeleton className="h-8" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
