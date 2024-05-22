"use client";
import { useState, ChangeEvent } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";

const UploadImagePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("userImage", selectedFile);

    try {
      setUploading(true);
      const response: AxiosResponse<{ imageUrl: string }> = await axios.post(
        "/api/v1/query/neo4j/uploadImageNode",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setProgress(percentCompleted);
            }
          },
        }
       
      );
      console.log(response.data);
      setImageUrl(response.data.imageUrl);
    } catch (error: any) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-end items-center p-[10rem]">
      <h1>click the icon below to load an image</h1>
      <div className="flex flex-col justify-center items-center">
        <label
          htmlFor="uploadInput"
          className="cursor-pointer block text-blue-600"
        >
          {/* Use Heroicons upload icon */}
          <UserCircleIcon className="h-[50px] w-[50px] inline-block" />
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg> */}
          {/* <span className="ml-2 text-black">Select Image</span> */}
        </label>
        <input
          id="uploadInput"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {selectedFile && <p className="mt-2">{selectedFile.name}</p>}
      </div>
      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-md focus:outline-none"
        onClick={handleUploadImage}
        disabled={uploading}
      >
        Upload
      </button>
      {uploading && <div className="mt-4">Uploading: {progress}%</div>}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Uploaded"
          className="mt-4"
          width={500}
          height={500}
        />
      )}
    </div>
  );
};

export default UploadImagePage;
