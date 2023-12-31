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
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { DeleteIcon, LucideArchiveX } from "lucide-react";
import { ArchiveBoxIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { UpdateUserForm } from "@/pages/admin/forms/UpdateUser";
import axios from "axios";

interface myUsers extends users {
  _id: string;
}

export interface UserTableProps {
  users: myUsers[];
  handleSort: (field: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleSort }) => {
  const [showForm, setShowForm] = useState(false);

  const openEditButton = (id: string, email: string) => {
    setShowForm(true);
    console.log("user id::", id);
    console.log("user email::", email);
  };

  const handleUpdate = async (id: string, field: string, value: string) => {
    try {
      const response = await axios.put(`/api/users/${id}`, { [field]: value });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Table className="mt-6">
      {/* <TableCaption>Users</TableCaption> */}
      <TableHeader className="text-[wheat]">
        <TableRow className="bg-[#2e2e2e] ">
          <TableHead
            className="cursor-pointer border px-[20px] py-0"
            onClick={() => handleSort("firstName")}
          >
            First Name
          </TableHead>
          <TableHead
            className="cursor-pointer border px-[20px] py-0"
            onClick={() => handleSort("lastName")}
          >
            Last Name
          </TableHead>
          <TableHead
            className="cursor-pointer border px-[20px] py-0"
            onClick={() => handleSort("email")}
          >
            Email
          </TableHead>
          <TableHead
            className="cursor-pointer border px-[20px] py-0"
            onClick={() => handleSort("role")}
          >
            Role
          </TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user._id} className="border px-[20px] py-0">
            <TableCell className="text-xs  border px-[20px] py-0">
              {user.firstName}
            </TableCell>
            <TableCell className="text-xs  border px-[20px] py-0">
              {user.lastName}
            </TableCell>
            <TableCell className="text-xs  border px-[20px] py-0">
              {user.email}
            </TableCell>
            <TableCell className="text-xs  border px-[20px] py-0">
              {user.role}
            </TableCell>
            <TableCell className="text-xs  border px-[20px] py-0">
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
              <UpdateUserForm userId={user._id} email={user.email}>
                <PencilSquareIcon
                  onClick={() => openEditButton(user._id, user.email)}
                  className="cursor-pointer text-blue-500 h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out active:scale-95"
                />
              </UpdateUserForm>
            </TableCell>
            <TableCell className="text-xs  border px-[20px] py-0">
              <LucideArchiveX className="cursor-pointer text-red-500 h-4 w-4 mr-2 transform transition-transform duration-200 ease-in-out active:scale-95" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
