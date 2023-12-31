"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import userStore from "@/store";
import logout from "@/components/LogOut"; // Assuming you're using NextAuth for authentication
import clsx from "clsx";
import { Button } from "@/components/ui/button";
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

function AdminHeader() {
  const { user, logOut } = userStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
      className={clsx`flex justify-between items-center bg-[gainsboro] drop-shadow-sm px-5 py-1 relative z-50`}
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
      <div className="flex items-center justify-center relative mr-[2rem]">
        <ChatBubbleLeftEllipsisIcon className="h-7 w-7 mr-2 text-[grey] transform transition-transform duration-200 ease-in-out active:scale-95" />
        <BellIcon className="h-7 w-7 text-[grey] transform transition-transform duration-200 ease-in-out active:scale-95" />
        <Image
          className="profile-avatar mx-4"
          src={`/uploads/${user.imageName}`}
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
