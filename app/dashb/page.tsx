"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import  DataTableDemo from "@/components/table/CustomData";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers";
import { Sidebar, Sidebar2 } from "@/components/cards/sidebarCard";

const AdminDashboard = () => {
  const router = useRouter();
  const { users, error } = useFetchAllUsers();
  console.log("users", users);

  return (
    <div className="flex h-screen">
      {/* Header */}
      <header className="flex justify-between items-center h-16 w-full bg-gray-100 border-b border-gray-200 fixed top-0 z-30">
        <div className="flex items-center ml-4">
          <Image src="/bg.avif" alt="Logo" width={40} height={40} />
          <p className="text-sm font-bold ml-2">Pentecost University</p>
        </div>
        <div className="flex items-center mr-4">
          <p className="text-sm font-bold mr-2">Priscilla Lily</p>
          <Image
            src="/bg.avif"
            alt="Avatar"
            width={30}
            height={30}
            className="rounded-full"
          />
        </div>
      </header>

      {/* Search Bar */}
      <div className="flex justify-between items-center fixed ml-[2.5rem]  z-10 h-16 w-[100%] bg-white border-b mt-[58px] border-gray-200">
        <div className="flex items-center text-sm font-bold">Admin Dashboard</div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="h-8 w-1/2 rounded-lg border border-gray-200 px-4"
          />
          <button className="h-8 w-20 ml-4 bg-blue-500 text-white rounded-lg">
            Search
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <aside
        className="flex flex-col h-full w-[15%] bg-gray-100 border-r mt-[58px] border-gray-200 fixed top-16 left-0 
      overflow-y-auto z-20"
      >
        <Sidebar2 />
      </aside>

      {/* Main Content */}
      <div className="flex h-full ml-[18%] mt-40">

        {/* DATABASE USERS TABLE */}
        {/* <div className="flex mt-40"> */}
        <div className="mr-4">
          <DataTableDemo />
        </div>

      {/* USERS ACTIONS PERFORMED */}
        <div className="flex flex-col fixed top-[177px] right-[16px]">
          <div className="flex flex-col  p-4 bg-[#e1e1e1] h-fit mb-4">
            <div className="flex  text-2xl font-bold mt-4">
              Recently Registered
            </div>
            <div className="flex h-fit items-center font-bold mr-4 mt-4">
              <Image
                className=""
                src="/bg.avif"
                alt="Avatar"
                width={30}
                height={30}
              />
              <p className="ml-2 text-xs">Priscilla Lily</p>
            </div>
          </div>

          <div className="flex flex-col  p-4 bg-[#e1e1e1] h-fit">
            <div className="flex  text-2xl font-bold mt-4">Recent Actions</div>
            <div className="flex h-fit items-center font-bold mr-4 mt-4">
              {/* <Image
              className=""
              src="/bg.avif"
              alt="Avatar"
              width={30}
              height={30}
            /> */}
              <p className="ml-2 text-xs">Priscilla Lily Deleted a user</p>
            </div>
          </div>
        </div>

        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
