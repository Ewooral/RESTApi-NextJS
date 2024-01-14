/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import * as React from "react";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers";
import { DeleteIcon } from "lucide-react";
import userStore from "@/store";

import { PostgresUser } from "@/types/users";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Modal } from "../Modal";
import { useState } from "react";

// export type Payment = {
//   id: string;
//   amount: number;
//   status: "pending" | "processing" | "success" | "failed";
//   email: string;
//   user: User;
// };


 function DataTableDemo() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  // Assuming useFetchAllUsers returns an array with users
  const { users, setUsers } = useFetchAllUsers();
  const { setPostgresUser, isModalOpen, setIsModalOpen, isLoading, setIsLoading } = userStore();

  // Add a state variable to hold the selected user's ID
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);
  console.log("seleted user id:::", selectedUserId);

  // Modal


  const [selectedId, setSelectedId] = useState(null);

  const openModal = (id: any) => {
    setSelectedDeleteId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteUsers = async () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const selectedIds = selectedRows.map((row) => row.original.id);
    console.log("Selected IDs: ", selectedIds);
    try {
      const response = await axios({
        method: "delete",
        url: "/api/auth/postgres/delete/deleteUsers",
        data: {
          ids: selectedIds,
        },
      });
      console.log(response.data);
      setUsers(users.filter((user) => !selectedIds.includes(user.id)));
    } catch (error: any) {
      console.error("Failed to delete rows: ", error.response?.data?.message);
    }
  };

// Function that confirms the deletion
const confirmDelete = () => {
  if (selectedDeleteId !== null) {
    handleDeleteUsers();
    deleteRow(selectedDeleteId);
  }
  closeModal();
};
  

  // Function that deletes a user from the database
  const deleteRow = async (id: string) => {
    console.log("Deleting user with id: ", id);
    try {
      await axios.delete(`/api/auth/postgres/delete/${id}`);
      console.log("IDDDDD:::", users[0].id);
      console.log("NORMAL IDDDD::", id);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error: any) {
      console.error("Failed to delete row: ", error.response.data.message);
    }
  };

  const columns: ColumnDef<PostgresUser>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: any) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <div>
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value: any) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),

      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <>
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
            >
              Email
              <CaretSortIcon className="ml-2 h-4 w-4" />
            </Button>
          </>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },

    // FIRST NAME COLUMN
    {
      accessorKey: "firstname",
      header: "First Name",
      cell: ({ row }) => (
        <Link href={`/profile`}>
          <div
            className="capitalize text-blue-500 underline cursor-pointer"
            onClick={async () => {
              try {
                const response = await axios.get(
                  `/api/auth/postgres/profile/${row.original.id}`
                );
                setPostgresUser(response.data.user);
                console.log(response.data); // Log the user info to the console
              } catch (error: any) {
                console.error(
                  "Error fetching user:",
                  error.response?.data?.message
                );
              }
            }}
          >
            {row.getValue("firstname")}
          </div>
        </Link>
      ),
    },
    {
      accessorKey: "lastname",
      header: "Last Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("lastname")}</div>
      ),
    },

    // a column for 'created_at'
    {
      accessorKey: "created_at",
      header: "Registered on",
      cell: ({ row }) => {
        const dateStr = row.getValue("created_at");
        const dateObj = new Date(dateStr as string);

        const month = dateObj.toLocaleString("default", { month: "short" }); // Get the short name of the month
        const day = dateObj.getDate();
        const year = dateObj.getFullYear();

        // Helper function to format the day with the correct ordinal suffix
        const formatDay = (day: number) => {
          if (day > 3 && day < 21) return day + "th";
          switch (day % 10) {
            case 1:
              return day + "st";
            case 2:
              return day + "nd";
            case 3:
              return day + "rd";
            default:
              return day + "th";
          }
        };

        return (
          <div style={{ paddingRight: "3.8rem" }}>{`${month} ${formatDay(
            day
          )}, ${year}`}</div>
        );
      },
    },

    //  'Status'

    // STATUS COLUMN
    {
      id: "status",
      header: "User's Status",
      accessorKey: "status", // assuming the id property in your data is named 'id'
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy user ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View User Image</DropdownMenuItem>
              <DropdownMenuItem>View User details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },

    // New column for delete
    {
      id: "del",
      header: "Delete",
      accessorKey: "id",
      cell: ({ row }) =>
        row.getIsSelected() && (
          <button
            className="text-red-500"
            onClick={() => openModal(row.getValue("id"))}
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        ),
      enableSorting: false,
    },

    // column for edit
    {
      id: "edit",
      header: "Edit",
      accessorKey: "id",
      cell: ({ row }) =>
        row.getIsSelected() && (
          <div>
            <button className="text-blue-500">
              <PencilSquareIcon className="h-4 w-4" />
            </button>
          </div>
        ),
    },
    
     
    // id column
    {
      id: "id",
      header: "ID",
      accessorKey: "id", // assuming the id property in your data is named 'id'
      enableSorting: false,
      enableHiding: false,

    },
  ];

  const table = useReactTable({
    // @ts-ignore
    data: users || [], // Use the users data from the hook
    // @ts-ignore
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

 

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mr-4"
        />

        {/* YES OR NO MODAL */}
        <div className="flex bg-[#f3f0f0] p-3 shadow-md ">
        <span
          className="mr-4 cursor-pointer text-red-800 underline"
        >
          
          {isModalOpen && (
          <Modal
            closeModal={closeModal}
            isOpen={isModalOpen}
           
          >
            <div className="flex items-center justify-center">
              <div className="bg-white rounded-lg text-center p-2">
                <h2 className="text-sm font-bold mb-4">Are you sure?</h2>
                <button
                  onClick={confirmDelete}
                  className="bg-red-500 text-white rounded text-[10px] px-[3px] py-1 mr-2"
                >
                  Yes
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-300 text-black rounded text-[10px] px-[3px] py-1"
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        )}
          <TrashIcon className="h-4 w-4 " />
        </span>
        <span className="mr-4 cursor-pointer text-blue-800 underline">
          <PencilSquareIcon className="h-4 w-4" />
        </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table className="text-[11px]">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  // Set the selected user's ID when the row is clicked
                  onClick={() => setSelectedUserId(row.original.id)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(DataTableDemo)
