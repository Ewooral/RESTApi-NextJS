// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Avatar } from "../ui/avatar";

// export function UserTableSkeleton() {
//   return (
//     <Table className="mt-12">
//       <TableHeader className="text-[wheat]">
//         <TableRow className="bg-[#2e2e2e]">
//           <TableHead className="cursor-pointer border px-[20px] py-0">
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//           <TableHead className="cursor-pointer border px-[20px] py-0">
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//           <TableHead className="cursor-pointer border px-[20px] py-0">
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//           <TableHead className="cursor-pointer border px-[20px] py-0">
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//           <TableHead>
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//           <TableHead>
//             <Skeleton className="w-full h-6" />
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {[...Array(10)].map((_, i) => (
//           <TableRow key={i} className="border px-[20px] py-0">
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//             <TableCell className="text-xs border px-[20px] py-0">
//               <Skeleton className="w-full h-6" />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }


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
    <Table className="mt-12 border bg-[transparent]">
      <TableHeader className="text-[wheat]">
        <TableRow className="bg-[#2e2e2e] text-[white]">
          <TableHead className="cursor-pointer border px-[20px] py-0 w-[50px]">
            <Skeleton className="w-[40px] h-[40px] rounded-full" />
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
          <TableHead className="w-[200px]">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px]">
            <Skeleton className="w-full h-6" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(10)].map((_, i) => (
          <TableRow key={i} className="border px-[20px] py-0 flex flex-col md:table-row">
            <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
              <Skeleton className="w-[40px] h-[40px] rounded-full" />
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
            <TableCell className="w-[200px]">
              <Skeleton className="w-full h-6" />
            </TableCell>
            <TableCell className="w-[200px]">
              <Skeleton className="w-full h-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>


  );
}
