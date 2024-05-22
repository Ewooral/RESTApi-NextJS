import React, { useState } from 'react';
import axios from 'axios';
import ImageUploading from 'react-images-uploading';
import Image from 'next/image';

const UploadMultipleImages = () => {
  const [images, setImages] = useState([]);
  const maxNumber = 10; // Maximum number of images allowed to upload

  const onChange = (imageList: any) => {
    setImages(imageList);
  };

  const handleImageUpload = async () => {
    try {
      // Iterate through the list of selected images and upload each one to the server
      await Promise.all(
        images.map(async (image) => {
          const formData = new FormData();
        //   @ts-ignore
          formData.append('userImage', image.file as File);

          // Send a POST request to the API endpoint to upload the image
          const response = await axios.post('/api/v1/uploads/upload-image-to-cloudinary', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          console.log('Image uploaded:', response.data);
        })
      );
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="space-y-4">
            <button
              className={`w-full px-4 py-2 text-white rounded-md transition duration-300 ${
                isDragging ? 'bg-red-500' : 'bg-indigo-500 hover:bg-indigo-600'
              }`}
              onClick={onImageUpload}
              {...dragProps}
            >
              {isDragging ? 'Drop Here' : 'Click or Drop Images'}
            </button>
            <button
              className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              onClick={onImageRemoveAll}
            >
              Remove All Images
            </button>
            <div className="grid gap-4 grid-cols-3">
              {imageList.map((image, index) => (
                <div key={index} className="relative">
                  <Image src={image['data_url']} alt="" className="w-full h-auto rounded-md" width={500} height={500} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 hover:bg-opacity-60">
                    <button
                      className="text-white hover:text-gray-200"
                      onClick={() => onImageRemove(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      <button
        className="w-full mt-4 px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
        onClick={handleImageUpload}
      >
        Upload Images
      </button>
    </div>
  );
};

export default UploadMultipleImages;
