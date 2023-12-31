"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import userStore from "@/store";
import logout from "@/components/LogOut"; // Assuming you're using NextAuth for authentication
import clsx from "clsx";

function Header() {
  const { user, logOut } = userStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

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
      className={clsx`flex justify-between items-center bg-[wheat] drop-shadow-sm px-5 py-1`}
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
      <div className="relative z-50">
        <div onClick={() => setIsOpen(!isOpen)} className="relative z-10 block">
          {isClient && user.imageName && (
            <div className="profile-avatar">
              <Image
                src={`/uploads/${user.imageName}`}
                alt="img"
                width={200}
                height={200}
              />
            </div>
          )}
        </div>
        {isOpen && (
          <div className="dropdown absolute right-0 mt-2 py-2 w-[100px] bg-[gainsboro] rounded-md shadow-xl z-50">
            <a
              href="#"
              className="block px-4 py-2 text-xs capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-xs capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Your Projects
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-xs capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
