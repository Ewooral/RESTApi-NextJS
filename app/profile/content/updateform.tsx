"use client";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import clsx from "clsx";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import userStore from "@/store";
import Accordion from "@/components/accordions/ProfileAccordion";
import UserAccordion from "@/components/accordions/UsersCredentialsAccordion";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { CheckCircle } from "lucide-react";

const UpdateUser = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedB, setIsFocusedB] = useState(false);
  const [isFocusedC, setIsFocusedC] = useState(false);
  const [isFocusedD, setIsFocusedD] = useState(false);
  const [isFocusedE, setIsFocusedE] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const firstnameValue = watch("firstname");
  const lastnameValue = watch("lastname");
  const initialsValue = watch("initials");
  const fields = watch([
    "email",
    "password",
    "firstname",
    "lastname",
    "initials",
  ]);

  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");

  const { isLoading, setIsLoading, postgresUser } =
    userStore();
  const [isClient, setIsClient] = useState(false);

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    if (image) {
      formData.append("userImage", image);
    }
    // Create a new object with the watch variables as keys
    const newData: { [key: string]: any } = {
      email: fields[0],
      password: fields[1],
      firstname: fields[2],
      lastname: fields[3],
      initials: fields[4],
    };

    // Append other form data
    for (const key in newData) {
      if (newData.hasOwnProperty(key)) {
        formData.append(key, newData[key]);
      }
    }
    console.log(formData.entries());
    setIsSubmitting(true);
    try {
      const response = await axios.put("/api/query/postgres/updateUser", data);
      console.log(response.data);
      toast({
        variant: "default",
        title: "User updated successfully!",
        description: JSON.stringify(response.data.message),
        action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
        className: "green-toast",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: JSON.stringify(err),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (event: { target: { files: any } }) => {
    setImage(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };

  const handleImaageSubmit = () => {};

  const title = "User Information";
  const content = "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Fragment>
      {isClient && (
        <div className="grid grid-cols-4 gap-2 ml-[12%] mr-[3%]">
          {/* COLUMN A */}
          <div className="col-span-1 self-start">
            <UserAccordion
              icon={<CheckCircle className="w-5 h-5 text-gray-500 mr-4" />}
              title={title}
              content="Full name, date of birth, nationality, and contact information."
              status="Student"
              firstname={postgresUser.firstname}
              lastname={postgresUser.lastname}
              email={postgresUser.email}
              className="bg-[#126209] text-[white]"
            />
            <span className="mt-4">
              <UserAccordion
                icon={<CheckCircle className="w-5 h-5 text-gray-500 mr-4" />}
                title={title}
                content="Full name, date of birth, nationality, and contact information."
                status="Aplicant"
                firstname={postgresUser.firstname}
                lastname={postgresUser.lastname}
                email={postgresUser.email}
                className="bg-[#fff8bc]"
              />
            </span>
          </div>

          {/* COLUMN B */}
          <div className="col-span-2 bg-[#edecec] self-start">
            <Accordion />
          </div>

          {/* COLUMN C */}
          <div className="col-span-1 grid grid-rows-3 gap-4 self-start">
            {/* <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded shadow-md"
            >
              <div className="p-5">
                <h2 className="text-2xl text-center mb-5 ">Update User</h2>

                <div className="relative mb-5">
                  <input
                    id="email"
                    type="text"
                    {...register("email", { required: true })}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  />

                  {errors.email && (
                    <>
                      <p className="text-red-500">
                        <ExclamationCircleIcon
                          className="h-5 w-5 text-red-500"
                          aria-hidden="true"
                        />
                        This field is required
                      </p>
                    </>
                  )}
                  <label
                    htmlFor="email"
                    className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                      isFocused || emailValue
                        ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                        : "text-base text-gray-500 outline-none mt-1"
                    }`}
                  >
                    Email
                  </label>
                </div>

                <div className="relative mb-5">
                  <input
                    id="firstname"
                    type="text"
                    {...register("firstname", { required: false })}
                    onFocus={() => setIsFocusedC(true)}
                    onBlur={() => setIsFocusedC(false)}
                    className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  />
                  <label
                    htmlFor="firstname"
                    className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                      isFocusedC || firstnameValue
                        ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                        : "text-base text-gray-500 outline-none mt-1"
                    }`}
                  >
                    First Name
                  </label>
                </div>

                <div className="relative mb-5">
                  <input
                    id="lastname"
                    type="text"
                    {...register("lastname", { required: false })}
                    onFocus={() => setIsFocusedD(true)}
                    onBlur={() => setIsFocusedD(false)}
                    className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  />
                  <label
                    htmlFor="lastname"
                    className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                      isFocusedD || lastnameValue
                        ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                        : "text-base text-gray-500 outline-none mt-1"
                    }`}
                  >
                    Last Name
                  </label>
                </div>

                <div className="relative mb-5">
                  <select
                    id="initials"
                    {...register("initials", { required: false })}
                    onFocus={() => setIsFocusedE(true)}
                    onBlur={() => setIsFocusedE(false)}
                    className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  >
                    <option value=""></option>
                    {initials.map((initial, index) => (
                      <option key={index} value={initial}>
                        {initial}
                      </option>
                    ))}
                  </select>
                  <label
                    htmlFor="initials"
                    className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                      isFocusedE || initialsValue
                        ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                        : "text-base text-gray-500 outline-none mt-1"
                    }`}
                  >
                    Select your title
                  </label>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant={"outline"}
                  className={clsx`block w-full p-2 mt-5 text-white bg-blue-500 ${
                    isSubmitting && "bg-[gray]"
                  } rounded 
          hover:bg-blue-600`}
                >
                  {isSubmitting ? "Updating..." : "Update User"}
                </Button>
              </div>
            </form> */}

            {/* ....COLUMN C-A1 */}
            {/*.......UPLOAD IMAGE............... */}
            <div className="bg-[#edecec] self-start">
              <div className="flex items-center">
                <div className="w-full p-4">
                  <h1 className="text-3xl font-bold">Upload Image</h1>
                  <form onSubmit={handleImaageSubmit} className="">
                    <label
                      className="flex flex-col items-center px-4 py-6
                       text-blue rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer 
                       hover:bg-blue hover:text-white"
                    >
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 4a4 4 0 00-4 4v6a4 4 0 108 0V8a4 4 0 00-4-4zm0 12a2 2 0 100-4 2 2 0 000 4zm8-12h-2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V4H6a2 2 0 00-2 2v2a2 2 0 01-2 2v6a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 01-2-2V4z" />
                      </svg>
                      <span className="mt-2 text-base leading-normal">
                        {fileName || "Select an image"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </form>
                </div>
                {/* .....COLUMN C-B1..... */}

                <div className="w-full p-4 self-start">
                  <h1 className="text-3xl font-bold">Delete User</h1>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet</p>
                </div>

                {/* .....COLUMN C-C1..... */}
                <div className="w-full p-4">Thank you Jesus!</div>
              </div>

              {/* ...COLUMN C-A2.... */}
              <div className="flex items-center">
                <div className="w-full p-4">
                  <h1 className="text-3xl font-bold">Delete User</h1>
                  <p className="text-gray-500">Lorem ipsum dolor sit amet,</p>
                </div>

                {/* .....COLUMN C-B2..... */}
                <div className="w-full p-4">Thank you Jesus!</div>

                {/* .....COLUMN C-C2..... */}
                <div className="w-full p-4">Thank you Jesus!</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateUser;
