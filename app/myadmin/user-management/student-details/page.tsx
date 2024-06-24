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
import { format } from "date-fns";
import { Snippet, Card } from "@nextui-org/react";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";

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
  const {showAfterMedium, hideAfterMedium, hideAfterLargerScreens} = useCssMediaQueries();

  const formattedExpiryTime = format(
    session.expiryTime,
    "MMMM dd, yyyy HH:mm:ss"
  );

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
        <div className={clsx("col-span-1 bg-[white]",
          hideAfterLargerScreens && "col-span-5",
        )}>
          <div className="border-b-2 w-full">
            <h1 className="font-extrabold text-lg p-2 text-[#3b82f6]">
              Student Details Page
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
              <span
                className={clsx(
                  "p-1 rounded-lg",
                  session.status === "Inactive" &&
                    "bg-[#80000052] text-[#501212]",
                  session.status === "Active" &&
                    "bg-[#0080002c] text-[#125012]",
                  session.status === "Pending" &&
                    "bg-[#6200802c] text-[#620080]"
                )}
              >
                {session.status}
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
            <h2>
              Expiry Time:{" "}
              <span className="text-[#153464] bg-[#3b83f63b] p-1 rounded-lg">
                {formattedExpiryTime}
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
        <div className={clsx("col-span-3 bg-[white]",
           hideAfterLargerScreens && "col-span-5",
        )}>
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

            {/* NEXTUI ORG COMPONENT */}
            <Card className="w-[200px] space-y-5 p-4" radius="lg">
              <Skeleton color="green" className="rounded-lg">
                <div className="h-24 rounded-lg bg-green-200"></div>
              </Skeleton>
              <div className="space-y-3">
                <Skeleton className="w-3/5 rounded-lg">
                  <div className="h-3 w-3/5 rounded-lg bg-[#0000001c]"></div>
                </Skeleton>
                <Skeleton className="w-4/5 rounded-lg">
                  <div className="h-3 w-4/5 rounded-lg bg-[#0000001c]"></div>
                </Skeleton>
                <Skeleton className="w-2/5 rounded-lg">
                  <div className="h-3 w-2/5 rounded-lg bg-[#0000001c]"></div>
                </Skeleton>
              </div>
            </Card>
          </div>
        </div>

        {/* THIRD COLUMN */}
        <div className={clsx("col-span-1 bg-[white]",
           hideAfterLargerScreens && "col-span-5",
        )}>
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
                <Skeleton className="w-[240px] h-[240px] bg-[#bddfff] rounded-[50px] border-[8px] border-[#6b6b6b]" />
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
