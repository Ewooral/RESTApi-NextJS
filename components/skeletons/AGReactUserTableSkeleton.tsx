import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader, 
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";


export function AgGridSkeletonC() {
  return (
    <Table className="mb-12 border bg-[white]">
      <TableHeader className="text-[wheat]">
        <TableRow className="bg-[#2e2e2e] text-[white]">
          <TableHead className="w-[20px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-[20px]" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="flex justify-center items-center cursor-pointer border">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableHead>
          <TableHead className="w-[150px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* Add your skeleton rows here */}
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px]" />
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
          <TableCell className="text-xs border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="text-xs border px-[20px] py-0">
          <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px]" />
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
          <TableCell className="text-xs border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="text-xs border px-[20px] py-0">
          <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px]" />
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
          <TableCell className="text-xs border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="text-xs border px-[20px] py-0">
          <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px]" />
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
          <TableCell className="text-xs border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
          <TableCell className="flex justify-center items-center">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="text-xs border px-[20px] py-0">
          <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>

      </TableBody>
    </Table>
  );
}
