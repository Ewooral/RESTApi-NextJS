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
import { Modal } from "@/components/Modal";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
interface myUsers extends users {
  _id: string;
}

export function UpdateUserForm({
  children,
  userId,
  email,
  closeModal,
  openModal,
  modalIsOpen,

}: {
  children: React.ReactNode;
  userId: string;
  email: string;
  closeModal: () => void;
  openModal: () => void;
  modalIsOpen: boolean;

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
 
      const response = await axios.post("/api/query/updateUser", {
        id: userId,
        email: email,
        ...data,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  const handleImageUpload = async (e: { preventDefault: () => void }) => {
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
        const updateResult = await axios.post("/api/updateUser", {
          id: userId,
          image: imagePath,
        });
        console.log(updateResult.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {children}
      <span>Edit</span>
      <Modal isOpen={modalIsOpen} closeModal={closeModal}>
        <h2 className="font-semibold text-2xl">Edit profile</h2>
        <p>Kindly check the fields you want to update. Click save when you&apos;re done.</p>
        <form className="space-y-4">
          {Object.entries(fields).map(([field, isChecked]) => (
            <div key={field} className="grid grid-cols-2 items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  name={field}
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  {field}
                </label>
              </div>
              {isChecked && (
                <input
                  {...register(field)}
                  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={field}
                />
              )}
            </div>
          ))}
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update User
          </button>
        </form>
      </Modal>
    </div>
  );
}
