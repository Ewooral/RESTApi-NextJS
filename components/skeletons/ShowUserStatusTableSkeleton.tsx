import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableHeader, 
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "../ui/table";
  

const TableSkeleton = () => {
  return (
      <TableBody className="bg-[#8884d8] divide-x divide-gray-200 w-full">
        <TableRow>
          <TableCell className="px-[.5rem] py-[.2rem] whitespace-nowrap">
            <Skeleton className="w-[18px] h-[18px]" />
          </TableCell>
          <TableCell className="px-2 py-1 whitespace-nowrap">
            <Skeleton className="w-8 h-8 rounded-full" />
          </TableCell>
          <TableCell className="px-2 py-1 whitespace-nowrap">
            <Skeleton className="w-12 h-4" />
          </TableCell>
          <TableCell className="px-2 py-1 whitespace-nowrap">
            <Skeleton className="w-12 h-4" />
          </TableCell>
          <TableCell className="px-2 py-1 whitespace-nowrap">
            <Skeleton className="w-12 h-4" />
          </TableCell>
        </TableRow>
      </TableBody>
  );
};

export default TableSkeleton;
