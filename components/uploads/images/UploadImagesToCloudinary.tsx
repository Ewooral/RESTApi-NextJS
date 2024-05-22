import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image'
import userStore from "@/store";
import { Skeleton } from '@/components/ui/skeleton';

type Data = {
    message: string;
    imageUrl: string
}

const cloudinaryLoader = ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const path = new URL(src).pathname;
    const cleanPath = path.replace('/dn1lqngds/image/upload/', '');
    return `https://res.cloudinary.com/dn1lqngds/image/upload/w_${width},q_${quality || 75}/${cleanPath}`
}
const fetchImage = async (imageId: string) => {
    const res = await axios.get(`/api/v1/uploads/get-uploaded-image?imageId=${imageId}`);
    return res.data as Data;
}
const UploadImage: React.FC = () => {
    const [file, setFile] = useState<File | null>(null)
    const { data  , refetch, isError, error} = useQuery(
        {queryKey:['uploadedImage'],
            queryFn:  () => imageId ? fetchImage(imageId) : Promise.reject('No imageId')
        })

    const queryClient = useQueryClient();
    const {imageId, setImageId, setImageUrl} = userStore();

    const uploadImageMutation = useMutation({
        mutationFn: async (file: File) => {
            try {
                const formData = new FormData();
                formData.append('userImage', file);
                const res = await axios.post('/api/v1/uploads/upload-image-to-cloudinary', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImageUrl(res.data.imageUrl)
                setImageId(res.data.imageId);
                return res.data;
            } catch (error) {
                throw new Error('Failed to upload image');
            }
        },

        onSuccess: (data) => {
            //@ts-ignore
            queryClient.invalidateQueries('uploadedImage');
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    const handleUploadImage = async () => {
        if (file) {
            try {
                await uploadImageMutation.mutateAsync(file);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    }

    useEffect(() => {
        const storedImageId = localStorage.getItem('imageId');
        if (storedImageId) {
            setImageId(storedImageId);
        }
        refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uploadImageMutation.isSuccess]);

    useEffect(() => {
        if (imageId) {
            localStorage.setItem('imageId', imageId);
        }
    }, [imageId]);

    if (isError) {
        // return <div>Error: {error.message}</div>
        console.log(error)
    }

    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="mt-5 md:mt-0 md:col-span-2 ">
                    <input type="file" onChange={handleFileChange}
                           className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"/>
                    <button onClick={handleUploadImage}
                            className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Upload
                    </button>
                </div>
            </div>
            {data ? (
                <div className="mt-5 bg-white">
                    <Image loader={cloudinaryLoader} src={data?.imageUrl} alt="Uploaded" width={500} height={500} priority />
                </div>
            ) : (
                <div className="mt-5 bg-white" style={{width: '500px', height: '500px'}}>
                    <Skeleton/> {/* Display the skeleton while the image is loading */}
                </div>
            )}
        </div>
    );
};

export default UploadImage;