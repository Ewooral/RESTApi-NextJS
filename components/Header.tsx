"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import userStore from "@/store";
import logout from "@/components/LogOut"; // Assuming you're using NextAuth for authentication

function Header() {
  const { user } = userStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <header className="flex justify-between items-center p-6 bg-white shadow-md">
      <div>
        <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} />
      </div>
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-10 block"
        >
          {isClient && user.imageName && (
          <div className='profile-avatar'>
            <Image src={`/uploads/${user.imageName}`} alt='' width={200} height={200} />
          </div>
        )}
        </button>
        {isOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
            >
              Your Projects
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm capitalize text-gray-700 hover:bg-blue-500 hover:text-white"
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
