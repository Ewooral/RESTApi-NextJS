"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DataTableDemo } from "@/components/table/CustomData";

const AdminDashboard = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col h-screen">

      {/* Header */}
      <header className="flex justify-between items-center h-16 w-full bg-gray-100 border-b border-gray-200 fixed top-0 z-10">
        <div className="flex items-center ml-4">
          <Image src="/bg.avif" alt="Logo" width={40} height={40} />
          <p className="text-xl font-bold ml-2">Admin Dashboard</p>
        </div>
        <div className="flex items-center mr-4">
          <p className="text-lg font-bold mr-2">Priscilla Lily</p>
          <Image src="/bg.avif" alt="Avatar" width={30} height={30} className="rounded-full" />
        </div>
      </header>

      {/* Navigation Menu */}
      <aside className="flex flex-col h-full w-1/5 bg-gray-100 border-r mt-[58px] border-gray-200 fixed top-16 left-0 overflow-y-auto z-20">
        <Link href="/admin/students">
          <div className="nav-item">Students</div>
        </Link>
        <Link href="/admin/teachers">
          <div className="nav-item">Teachers</div>
        </Link>
        {/* Add other navigation links here */}
      </aside>

      {/* Main Content */}
      <div className="flex h-full overflow-auto">

        {/* Main Content Area */}
        <div className="flex flex-col h-full w-4/5 ml-1/5 fixed top-16 left-0">

          {/* Search Bar */}
          <div className="flex justify-between items-center h-16 w-[131%] bg-white border-b border-gray-200">
            <p className="text-xl font-bold ml-4">Admin Dashboard</p>
            <div className="flex items-center mr-4">
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

          {/* Main Dashboard Content */}
          <div className="flex h-full">

            {/* Left Panel */}
            <div className="flex flex-col w-[80%]">
              {/* Student Box */}
              
              
            </div>

            {/* Right Panel */}
            <div className="flex flex-col w-[180%]">
              {/* All Exam Results Box */}
              {/* <div className="flex flex-col h-full w-[131%] mt-4 bg-white rounded-lg border border-gray-200"> */}
               <DataTableDemo />
              {/* </div> */}

            

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
