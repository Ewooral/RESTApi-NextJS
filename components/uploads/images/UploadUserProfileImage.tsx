import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { IoCloudUpload } from "react-icons/io5";
import Image from "next/image"; // Assuming you're using Next.js
import clsx from "clsx";
import ButtonSpinner from "@/components/spinners/ButtonSpinner";
import { Skeleton } from "@/components/ui/skeleton";

// Define the props interface
interface UploadUserProfileImageComponentProps {
  hideAfterLargerScreens: boolean;
  data: { imageUrl?: string } | null;
  cloudinaryLoader: any; // Define the correct type based on your loader function
  handleAnimateFaRegEdit: () => void;
  animateFaRegEdit: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  isFileSelected: boolean;
  handleUploadImage: () => void;
  isUploadButtonLoading: boolean;
}

const UploadUserProfileImage: React.FC<
  UploadUserProfileImageComponentProps
> = ({
  hideAfterLargerScreens,
  data,
  cloudinaryLoader,
  handleAnimateFaRegEdit,
  animateFaRegEdit,
  fileInputRef,
  handleFileChange,
  file,
  isFileSelected,
  handleUploadImage,
  isUploadButtonLoading,
}) => {
  return (
    <>
      <div className="border-b-2 w-full">
        {/* <h1 className="font-extrabold text-lg p-2 bg-white text-[#3b82f6]">
          Upload Image
        </h1> */}
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
            // <Skeleton className="w-[240px] h-[240px] bg-[#d3e8fb] rounded-[50px] border-[8px] border-[#dbdbdb]" />
            <Skeleton className="w-96 h-96 bg-[#d3e8fb] rounded-lg border-8 border-[#dbdbdb] sm:w-80 sm:h-80 md:w-72 md:h-72 lg:w-64 lg:h-64 xl:w-56 xl:h-56 2xl:w-48 2xl:h-48" />
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
                isUploadButtonLoading && "bg-[#6e6e6e]",
                isUploadButtonLoading && "cursor-not-allowed"
              )}
            >
              <IoCloudUpload className="size-5" />
              {isUploadButtonLoading ? "Uploading..." : "Upload"}
              {isUploadButtonLoading && <ButtonSpinner fillColor="#6e6e6e" />}
            </button>
          </div>
        )}

        <p className="border-t-2">
          <span className="flex justify-start p-3">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit
            minima a, iste voluptate quasi assumenda, optio tenetur mollitia
            deserunt, aliquam et quis velit? Fugit, numquam? Inventore,
            perferendis! Adipisci, eligendi molestiae.
          </span>
        </p>
      </div>
    </>
  );
};

export default UploadUserProfileImage;
