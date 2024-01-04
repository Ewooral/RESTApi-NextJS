import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image"; // Import the Image component from the appropriate package

import React, { useState } from "react";
import { users } from "@/types/users";
import { LucideArchiveX } from "lucide-react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { UpdateUserForm } from "@/pages/admin/forms/UpdateUser";
import axios from "axios";

interface myUsers extends users {
  _id: string;
}

export interface UserTableProps {
  users: myUsers[];
  handleSort: (field: string) => void;
  openModal: () => void;
  closeModal: () => void;
  modalIsOpen: boolean;
  refresh: () => void;
  itemsPerPage: number;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  handleSort,
  openModal,
  closeModal,
  modalIsOpen,
  refresh,
}) => {
  const openEditButton = (id: string, email: string) => {
    console.log("user id::", id);
    console.log("user email::", email);
  };

  async function handleDelete(id: string) {
    console.log("user id::", id);
    try {
      const response = await axios.delete("/api/query/deleteUser/", {
        params: { id: id },
      });
      console.log("response::", response.data.message);
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Table className="mt-12 border bg-[transparent]">
        {/* <TableCaption>Users</TableCaption> */}
        <TableHeader className="text-[white]">
          <TableRow className="bg-[#fff] text-[black] ">
            <TableHead
              className="text-[black] border"
              onClick={() => handleSort("imageName")}
            >
              Image
            </TableHead>
            <TableHead
              className="cursor-pointer border px-[20px] py-0 text-[black]"
              onClick={() => handleSort("firstName")}
            >
              First Name
            </TableHead>
            <TableHead
              className="cursor-pointer border px-[20px] py-0 text-[black]"
              onClick={() => handleSort("lastName")}
            >
              Last Name
            </TableHead>
            <TableHead
              className="cursor-pointer border px-[20px] py-0 text-[black]"
              onClick={() => handleSort("email")}
            >
              Email
            </TableHead>
            <TableHead
              className="cursor-pointer border px-[20px] py-0 text-[black]"
              onClick={() => handleSort("role")}
            >
              Role
            </TableHead>
            <TableHead
              onClick={() => handleSort("edit")}
              className="text-[black] border"
            >
              Edit
            </TableHead>
            <TableHead
              onClick={() => handleSort("delete")}
              className="text-[black] border"
            >
              Delete
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id} className="border px-[20px] py-0 flex flex-col md:table-row">
              <TableCell className="text-xs border-black px-[20px] py-0 md:table-cell">
                <div className="profile-avatar">
                  <Image
                    src={`/uploads/${user.imageName}`}
                    alt="img"
                    width={200}
                    height={200}
                  />
                </div>
              </TableCell>
              <TableCell className="text-xs  border px-[20px] py-0">
                {user.firstName}
              </TableCell>
              <TableCell className="text-xs  border px-[20px] py-0">
                {user.lastName}
              </TableCell>
              <TableCell className="text-xs  border px-[20px] py-0">
                {user.email}
              </TableCell>
              <TableCell>
                <span
                  className={`text-xs border px-[20px] py-0 ${
                    user.role === "ADMINISTRATOR"
                      ? "bg-green-800 text-white rounded-md"
                      : user.role === "STUDENT"
                      ? "bg-red-500 text-white  rounded-md"
                      : user.role === "TUTOR OR LECTURER"
                      ? "bg-indigo-500 text-white  rounded-md"
                      : ""
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell className="text-xs  border px-[20px] py-0">
                <UpdateUserForm
                  userId={user._id}
                  email={user.email}
                  openModal={openModal}
                  closeModal={closeModal}
                  modalIsOpen={modalIsOpen}
                >
                  <PencilSquareIcon
                    onClick={() => {
                      openModal();
                      openEditButton(user._id, user.email);
                    }}
                    className=" mr-2 h-5 w-5 cursor-pointer text-blue-500
                  transform transition-transform duration-200 ease-in-out active:scale-95"
                  />
                </UpdateUserForm>
              </TableCell>
              <TableCell className="text-xs  border px-[20px] py-0">
                <LucideArchiveX
                  onClick={() => handleDelete(user._id)}
                  className="cursor-pointer text-red-500 h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out active:scale-95"
                />
                <span>Delete</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UserTable;
