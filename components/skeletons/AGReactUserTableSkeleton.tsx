import { Skeleton } from "@/components/ui/skeleton"
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

export const AgGridSkeleton = () => {
  return (
    <div className="ag-theme-quartz h-[350px] w-full bg-white">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex justify-between mb-4">
          {[...Array(9)].map((_, j) => (
            <Skeleton key={j} className="h-4 w-[100px]" />
          ))}
        </div>
      ))}
    </div>
  );
};


export function SkeletonDemo() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}




const columnDefs = [
  { headerName: "", checkboxSelection: true, width: 50 },
  { headerName: "ID", field: "id" },
  { headerName: "First Name", field: "firstname" },
  { headerName: "Last Name", field: "lastname" },
  { headerName: "Email", field: "email" },
  { headerName: "Is Student", field: "isstudent" },
  { headerName: "Title", field: "title" },
  { headerName: "Terms", field: "terms" },
  { headerName: "Image", field: "image_url" },
];

// export function AgGridSkeletonB() {
//   return (
//     <Table className="border bg-[transparent]">
//       <TableHeader className="text-[wheat]">
//         <TableRow className="bg-[#2e2e2e] text-[white]">
//           {columnDefs.map((col, i) => (
//             <TableHead key={i} className="cursor-pointer border p-4 w-[50px]">
//                <div className="h-4 w-[100px] mb-2">{col.headerName}</div>
//                <input type="text" className="mt-2 border rounded px-2 py-1"  placeholder=" " />
//             </TableHead>
//           ))}
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {[...Array(5)].map((_, i) => (
//           <TableRow key={i} className="border px-[20px] py-0 flex flex-col md:table-row">
//             {columnDefs.map((_, j) => (
//               <TableCell key={j} className="text-xs border-black px-[20px] py-0 md:table-cell">
//                 <Skeleton className="w-[40px] h-[40px] rounded-full" />
//               </TableCell>
//             ))}
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

export function AgGridSkeletonB() {
  return (
    <Table className="mb-12 border bg-[white]">
      <TableHeader className="text-[wheat]">
        <TableRow className="bg-[#2e2e2e] text-[white]">
          <TableHead className="w-[20px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-[20px]" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
          <TableHead className=" flex justify-center items-center cursor-pointer border">
            <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableHead>
          <TableHead className="w-[200px] cursor-pointer border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px] " />
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
          <TableCell className="w-[200px] flex justify-center items-center">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="w-[200px] border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px] " />
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
          <TableCell className="w-[200px] flex justify-center items-center">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="w-[200px] border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px] " />
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
          <TableCell className="w-[200px] flex justify-center items-center">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="w-[200px] border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
        <TableRow className="border px-[20px] py-0 flex flex-col md:table-row">
          <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
            <Skeleton className="w-[20px] h-[20px] " />
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
          <TableCell className="w-[200px] flex justify-center items-center">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          </TableCell>
          <TableCell className="w-[200px] border px-[20px] py-0">
            <Skeleton className="w-full h-6" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};