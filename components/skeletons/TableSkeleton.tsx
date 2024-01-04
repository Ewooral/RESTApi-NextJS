import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar } from "../ui/avatar";

export function UserTableSkeleton() {
  return (
    <Table className="mt-12">
      <TableHeader className="text-[wheat]">
        <TableRow className="bg-[#2e2e2e]">
          <TableHead className="cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead>
            <Skeleton className="w-full h-6" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i} className="border px-[20px] py-0">
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="text-xs border px-[20px] py-0">
              <Skeleton className="w-full h-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
