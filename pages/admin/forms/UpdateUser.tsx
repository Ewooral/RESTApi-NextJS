import { LoadingSpinner } from "@/components/Loading";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import userStore from "@/store";
import { users } from "@/types/users";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";

export function UpdateUserForm({
  children,
  userId,
  email,
}: {
  children: React.ReactNode;
  userId: string;
  email: string;
}) {
  const [isError, setIsError] = useState(false);
  const {
    serverResponse,
    setServerResponse,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    user,
  } = userStore();

  const { register, handleSubmit, watch, setValue } = useForm();
  const [image, setImage] = useState<File | null>(null);

  
  const watchedFields = watch([
    "firstName",
    "lastName",
    "email",
    "password",
    "role",
    "secretPin",
    "imageName",
  ]);

  const [fields, setFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    role: false,
    secretPin: false,
    imageName: false,
  });

  const handleCheckboxChange = (event: {
    target: { name: any; checked: any };
  }) => {
    setFields({ ...fields, [event.target.name]: event.target.checked });
  };

  const handleFileChange = (e: any) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      // Assuming that the user's ID is stored in a variable called `userId`
      setIsLoading(true);

      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      const response1 = await axios.post("/api/upload", formData, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              });
      const response = await axios.post("/api/query/updateUser", {
        id: userId,
        email: email,
        ...data,
      });
     
      console.log(response.data);
      console.log(response1.data);
      
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      if (image) {
        const formData = new FormData();
        formData.append("image", image);
  
        const response = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        const imagePath = response.data.path; // The path to the image
  
        // Update the image field in the database
        const updateResult = await axios.post('/api/updateUser', { id: userId, image: imagePath });
        console.log(updateResult.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      {/* @ts-ignore */}
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Kindly update your credentials. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {Object.entries(fields).map(([field, isChecked]) => (
  <div key={field}>
    <input
      type="checkbox"
      name={field}
      onChange={handleCheckboxChange}
      className="mr-2"
    />
    <label>{field}</label>
    {isChecked && (
      <>
        {field === "imageName" ? (
          <>
            <input
              type="file"
              accept="image/*"
              {...register(field)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <button type="button" onClick={handleImageUpload} className="bg-blue-500 text-white p-2 rounded mt-2">
              Upload Image
            </button>
          </>
        ) : (
          <input
            {...register(field)}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        )}
      </>
    )}
  </div>
))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update User
          </button>
        </form>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
