"use client";
import React, { ChangeEvent, useRef, useState, useEffect } from "react";
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
import ButtonSpinner from "@/components/spinners/ButtonSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { IoCloudUpload } from "react-icons/io5";
import { useCustomToast } from "@/hooks/useToast";

type Data = {
  message: string;
  imageUrl: string;
  imageId: string;
};

const cloudinaryLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  const path = new URL(src).pathname;
  const cleanPath = path.replace("/dn1lqngds/image/upload/", "");
  return `https://res.cloudinary.com/dn1lqngds/image/upload/w_${width},q_${
    quality || 75
  }/${cleanPath}`;
};

const StudentDetails: React.FC = () => {
  const { session, imageId, setImageId, setImageUrl, setSession } = userStore();
  const [animateFaRegEdit, setAnimateFaRegEdit] = useState(false);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const fetchImage = async (email: string) => {
    try {
      const res = await axios.get(
        `/api/v1/uploads/get-uploaded-image?email=${email}`
      );
      setImageUrl(res.data.imageUrl);
      setImageId(res.data.imageId);
      setSession({
        ...session,
        imageUrl: res.data.imageUrl,
        imageId: res.data.imageId,
      });
      console.log("Data:: ", res.data);
      console.log("Image URL:: ", res.data.imageUrl);
      console.log("Image ID:: ", res.data.imageId);

      return res.data as Data;
    } catch (error) {
      throw new Error("Fetching failed miserably");
    }
  };

  const queryClient = useQueryClient();
  const { data, refetch, isError, error } = useQuery({
    queryKey: ["uploadedImage"],
    queryFn: () =>
      session.email ? fetchImage(session.email) : Promise.reject("No imageId"),
  });

  const uploadImageMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("userImage", file);
        setIsButtonLoading(true);
        const response = await axios.post(
          "/api/v1/uploads/upload-image-to-cloudinary",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        showSuccessToast("Image uploaded successfully", data?.message ?? "");
        setIsButtonLoading(false);
        console.log("Ress::: ", response.data);

        return response.data;
      } catch (error) {
        throw new Error("Failed to upload Image");
      } finally {
        setIsButtonLoading(false);
      }
    },
    onSuccess: (data) => {
      //@ts-ignore
      queryClient.invalidateQueries("uploadedImage");
    },

    onError(error, variables, context) {
      showErrorToast("Error uploading image", error.toString());
      console.error("Error uploading image:", error);
    },
  });

  const handleAnimateFaRegEdit = () => {
    setAnimateFaRegEdit(true);
    setIsFileSelected(true);
    fileInputRef.current?.click();
    setTimeout(() => {
      setAnimateFaRegEdit(false);
    }, 500);
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUploadImage = async () => {
    if (file) {
      try {
        await uploadImageMutation.mutateAsync(file);
        setFile(null);
        setIsFileSelected(false);
      } catch (err) {
        showErrorToast("Error uploading image", err as string);
        console.error("Error uploading image:", err);
      }
    }
  };

  if (isError) {
    console.error(error);
  }

  return (
    <>
      <section className="grid grid-cols-5 justify-center items-start w-full gap-4">
        {/* FIRST COLUMN */}
        <div className="col-span-1 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 text-[#3b82f6]">
              Details
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
              Role:{" "}
              <span className="bg-[#a8a80745] text-[#585817] p-1 rounded-lg">
                {session.role}
              </span>
            </h2>
            <h2>
              Status:{" "}
              <span className="bg-[#0080002c] text-[#125012] p-1 rounded-lg">
                {session.isLoggedIn ? "Active" : "Not active"}
              </span>
            </h2>
            <h2>
              First Name:{" "}
              <span className="bg-[#e2e2e2] rounded-md p-1">
                {session.firstname}
              </span>
            </h2>
            <h2>
              Last Name:{" "}
              <span className="bg-[#e2e2e2] rounded-md p-1">
                {session.lastname}
              </span>
            </h2>
            <h2>
              Email:{" "}
              <span className="text-[#153464] bg-[#3b83f63b] p-1 rounded-lg">
                {session.email}
              </span>
            </h2>
          </div>
          {/* BUTTON */}
          <div className="flex justify-start p-4 border-t-2">
            <button className="flex items-center justify-center bg-[#f5f5f5] border border-gray-300 p-2 rounded-lg gap-4">
              <span>Edit</span>
              <FaRegEdit className="text-[#3b82f6] size-4" />
            </button>
          </div>
        </div>

        {/* SECOND COLUMN */}
        <div className="col-span-3 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
              More Details
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

        {/* THIRD COLUMN */}
        <div className="col-span-1 bg-[white]">
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
              Upload Image
            </h1>
          </div>
          <div className="flex flex-col justify-center items-start gap-4">
            <p className="p-2">
              Lorem ipsum dolor sit amet consectetur. Perferendis! Adipisci,
              eligendi molestiae.
            </p>
            <div className="p-2 relative">
              {data ? (
                <Image
                  loader={cloudinaryLoader}
                  src={data.imageUrl ?? "/placeholder.png"}
                  alt="Student Image"
                  width={240}
                  height={240}
                  className="rounded-[50px] border-[8px] border-[#f1f1f1] p-4"
                />
              ) : (
                <Skeleton className="w-[240px] h-[240px] bg-black" />
              )}
              <FaRegEdit
                onClick={handleAnimateFaRegEdit}
                className={clsx(
                  "absolute right-0 bottom-[29px] bg-white text-[#3b82f8] size-5 cursor-pointer",
                  animateFaRegEdit && "animate-bounce"
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

            {file && isFileSelected && (
              <h5 className="px-2">
                <span className="font-bold">Uploaded File&apos;s name: </span>
                {isFileSelected ? file.name : "No file selected"}
              </h5>
            )}
            {/* UPLOAD IMAGE BUTTON */}
            {isFileSelected && file && (
              <div className="p-2">
                <button
                  type="button"
                  onClick={handleUploadImage}
                  className={clsx(
                    "flex gap-2 bg-[#3b82f6] text-white p-2 text-xs rounded-lg",
                    // isFileSelected ? "cursor-pointer" : "cursor-not-allowed",
                    isButtonLoading && "bg-[#6e6e6e]",
                    isButtonLoading && "cursor-not-allowed"
                  )}
                >
                  <IoCloudUpload className="size-5" />
                  {isButtonLoading ? "Uploading..." : "Upload"}
                  {isButtonLoading && <ButtonSpinner />}
                </button>
              </div>
            )}

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
