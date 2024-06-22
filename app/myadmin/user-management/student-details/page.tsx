"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import userStore from "@/store";
import { FaRegEdit } from "react-icons/fa";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import clsx from "clsx";
import { set } from "date-fns";

const StudentDetails = () => {
  const { session } = userStore();
  const [animateFaRegEdit, setAnimateFaRegEdit] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
    // Create a ref for the file input
    const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAnimateFaRegEdit = () => {
    setAnimateFaRegEdit(true);
     // Trigger click on file input
     fileInputRef.current?.click();
    setTimeout(() => {
      setAnimateFaRegEdit(false);
    }, 500);
  };
 
  
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <>
      <section className="grid grid-cols-5 justipfy-center items-start  w-full gap-4">
        {/* FIRST COLUMN ......................................................................................................  */}
        <div className="col-span-1 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 text-[#3b82f6]">
              Student Details
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4 p-4">
            <h2>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      Student ID:{" "}
                      <span className="bg-[#e2e2e2] rounded-md p-1 cursor-pointer">
                        {session.userId.length > 20
                          ? `${session.userId.slice(0, 20)} ...`
                          : session.userId}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{session.userId}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </h2>
            <h2>
              Student Role:{" "}
              <span className="bg-[#a8a80745] text-[#585817] p-1 rounded-lg">
                {session.role}
              </span>
            </h2>
            <h2>
              Student Status:{" "}
              <span className="bg-[#0080002c] text-[#125012] p-1 rounded-lg">
                {session.isLoggedIn ? "Active" : "Not active"}
              </span>
            </h2>
            <h2>
              Student First Name:{" "}
              <span className="bg-[#e2e2e2] rounded-md p-1">
                {session.firstname}
              </span>
            </h2>
            <h2>
              Student Last Name:{" "}
              <span className="bg-[#e2e2e2] rounded-md p-1">
                {session.lastname}
              </span>
            </h2>
            <h2>
              Student Email:{" "}
              <span className="text-[#153464] bg-[#3b83f63b] p-1 rounded-lg">
                {session.email}
              </span>
            </h2>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end p-4 border-t-2">
            <button className="flex items-center justify-center bg-[#f5f5f5] border border-gray-300 p-2 rounded-lg gap-4">
              <span>Edit</span>
              <FaRegEdit className="text-[#3b82f6] size-4" />
            </button>
          </div>
        </div>

        {/* SECOND COLUMN...................................................................................................... */}
        <div className="col-span-3 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
              Student Details
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Consequatur quaerat libero veniam atque, illo in accusamus autem
              architecto. Nemo expedita officia odio facilis quos odit dolores
              quam qui quibusdam corporis.
            </p>
          </div>
        </div>

        {/* THIRD COLUMN ...................................................................................................... */}
        <div className="col-span-1 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
              Student Image
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur. perferendis! Adipisci,
              eligendi molestiae.
            </p>
            <div className="p-4 relative">
              <Image
                src={session.imageUrl ?? "/placeholder.png"}
                alt="Student Image"
                width={240}
                height={240}
                className="rounded-[50px] border-[8px] border-[#f1f1f1] p-4"
              />
              <FaRegEdit
                onClick={handleAnimateFaRegEdit}
                className={clsx(
                  "absolute right-0 bottom-[29px] bg-white text-[#3b83f66c] size-8 cursor-pointer",
                  animateFaRegEdit && "animate-bounce text-[#3b82f8]"
                )}
              />
              <input
              type="file"
              name="image"
              id="image"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
              />

            </div>
            <p className="border-t-2">
              <span className="flex justify-start p-3">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Impedit minima a, iste voluptate quasi assumenda, optio tenetur
                mollitia deserunt, aliquam et quis velit? Fugit, numquam?
                Inventore, perferendis! Adipisci, eligendi molestiae.
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudentDetails;

/**
 *
 *
 */
