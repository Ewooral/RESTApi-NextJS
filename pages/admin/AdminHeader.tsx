"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import userStore from "@/store";
import logout from "@/components/LogOut"; // Assuming you're using NextAuth for authentication
import clsx from "clsx";
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import axios from "axios";

function AdminHeader() {
  const { user, logOut, notificationCount } = userStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [chatBubbleHovered, setChatBubbleHovered] = useState(false);
const [bellIconHovered, setBellIconHovered] = useState(false);

  function handleIt(event: { stopPropagation: () => void }) {
    event.stopPropagation();
    setIsOpen(!isOpen);
    console.log("IS OPEN???", isOpen);
  }

  const handleLogout = () => {
    logout();
    logOut();
  };
  // console.log("USERS???", user);
  // console.log("EMAIL???",user.imageName);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header
      className={clsx`fixed w-full flex justify-between items-center bg-[gainsboro] 
      drop-shadow-sm px-5 py-1 z-50 rounded-bl-[23px] border-[#1e1e1e]]`}
    >
      <div>
        {/* <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} /> */}
        <span className="flex justify-between p-1 bg-white rounded-md">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search..."
            className="p-1 outline-none"
          />
          <button type="submit" className="bg-blue-500 text-white p-1 rounded">
            Search
          </button>
        </span>
      </div>
      <div className="flex items-center justify-center relative mr-[14rem]">
      <div 
  className={`bg-[#c1bdbd] p-2 rounded-[50%] mr-4 hover:bg-[#454545] transition-colors duration-200`}
>
  <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-[black] hover:text-white transform transition-transform duration-200 ease-in-out active:scale-95" />
</div>
<div 
  className={`relative bg-[#c1bdbd] p-2 rounded-[50%] hover:bg-[#454545] transition-colors duration-200`}
>
  <BellIcon className="h-5 w-5 text-black hover:text-white transform transition-transform duration-200 ease-in-out" />
  <div
    className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-[9px] 
    font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
  >
    {notificationCount}
  </div>
</div>
        <Image
          className="profile-avatar mx-4"
          src={user.imageName && user.imageName.startsWith('https') ? user.imageName : `/uploads/${user.imageName}`}
          alt="img"
          width={200}
          height={200}
        />
        <DropdownMenu onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <div>
              <div
                onClick={handleIt}
                className="absolute right-[-25px] bottom-[13px] 
                h-5 w-5 text-white bg-[cornflowerblue] rounded-[10px] p-[5px]"
              >
                {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56  transition-all duration-200 ease-in-out">
            <DropdownMenuItem>Your Profile</DropdownMenuItem>
            <DropdownMenuItem>Your Projects</DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#80808059]" />
            <DropdownMenuItem
              onSelect={handleLogout}
              className="bg-[#8080802e]"
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <section className="flex">
          <div className="flex flex-col justify-center items-start">
            <span className="text-xs text-gray-800 font-extrabold">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-xs text-gray-800">
              {user.role.toLowerCase()}
            </span>
          </div>
        </section>
      </div>
    </header>
  );
}

export default AdminHeader;
