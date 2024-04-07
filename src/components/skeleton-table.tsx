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
          <TableRow className="border-b border-white/10 ">
            <TableHead className="size-4 ">
              <Skeleton className="size-4 " />
            </TableHead>
            <TableHead className="w-32">
              <Skeleton className="h-4 w-32 " />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-32 " />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-32 " />
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-32 " />
            </TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((attendee) => {
            return (
              <TableRow key={attendee}>
                <TableCell className="size-4">
                  <Skeleton className="size-4" />
                </TableCell>
                <TableCell className="w-32">
                  <Skeleton className="h-4 w-32 " />
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold text-white">
                      <Skeleton className="h-6 w-32" />
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
              <Skeleton className="h-6" />
            </TableCell>
            <TableCell colSpan={3}>
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-6" />
                <div className="grid grid-cols-4 gap-4">
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                  <Skeleton className="h-6" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
