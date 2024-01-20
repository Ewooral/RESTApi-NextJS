'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const ImageUpload = () => {
const [image, setImage] = useState(null);
const [imageUrl, setImageUrl] = useState<string | null>(null);

const handleImageChange = (event: { target: { files:any}; }) => {
    setImage(event.target.files[0]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center space-y-5">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-lg shadow-md"
            height={200}
            width={200}
          />
        )}
        
        <label className="flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 4a4 4 0 00-4 4v6a4 4 0 108 0V8a4 4 0 00-4-4zm0 12a2 2 0 100-4 2 2 0 000 4zm8-12h-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V4H6a2 2 0 00-2 2v2a2 2 0 01-2 2v6a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 01-2-2V4z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Select a file</span>
          <input type='file' className="hidden" onChange={handleImageChange} />
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;