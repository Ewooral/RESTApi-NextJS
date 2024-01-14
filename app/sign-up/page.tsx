"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import userStore from "@/store";
import { ToastAction } from "@radix-ui/react-toast";
import router from "next/router";
import { errorType } from "@/types/users";
import { LoadingSpinner } from "@/components/Loading";

const schema = z.object({
  firstname: z.string().nonempty({ message: "First name is required" }),
  lastname: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  initials: z.string().nonempty({ message: "Initials are required" }),
});

export default function SignUp() {
  const [response, setResponse] = React.useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [initialsRes, setInitialsRes] = useState("");
  const [initials, setInitials] = useState([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const { isLoading, setIsLoading, setErrors } = userStore();

  useEffect(() => {
    const fetchInitials = async () => {
      const response = await axios.get("/api/auth/postgres/fetch-initials");
      setInitials(response.data.initials);
      setInitialsRes(response.data.message);
      console.log(response.data);
    };
    fetchInitials();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    if (
      errors.firstname ||
      errors.lastname ||
      errors.email ||
      errors.password ||
      errors.initials
    ) {
      console.log("Errors::", errors);
      return;
    }
     setIsSubmitting(true);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/postgres/sign-up", data);
      console.log("Res::", response);
      if (response.data.message) {
        toast({
          variant: "default",
          title: "Registration successful",
          description: JSON.stringify(response.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className: "green-toast",
        });

        router.push("/sign-in");
      }
      console.log("RESPONSE::", response);
    } catch (err) {
      const serverError = err as errorType;
      if (serverError && serverError.response) {
        console.log("ERROR::", serverError.response.data)
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: JSON.stringify(serverError.response.data.error),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }

    // setResponse(response);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" justify-center items-center mb-4 grid md:grid-cols-2 gap-2  bg-white rounded shadow-md"
      >
        {/* IMAGE */}
        <div
          className="flex flex-col col-span-1 justify-center items-center"
          style={{
            backgroundImage: "url(/regi.avif)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
          }}
        ></div>

        {/* FORM ELEMENTS */}
        <div className="p-5">
           {isLoading && <LoadingSpinner />}
          <div className="text-center mb-4">
            <h1 className="mb-4 text-2xl font-bold text-center">Sign Up</h1>
            <p className="text-xs">
              Applying to university? Sign up now to access
              <br />
              exclusive application resources and community forums!
            </p>
          </div>
          <div className="w-full max-w-xs mx-auto mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="initials"
            >
              Title
            </label>
            <select
              id="initials"
              {...register("initials")}
              className="block w-full bg-white border border-gray-300 focus:border-indigo-500 text-base leading-6 shadow-sm py-2 pl-3 pr-10 rounded-md focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select your title</option>
              {initials.map((initial, index) => (
                <option key={index} value={initial}>
                  {initial}
                </option>
              ))}
            </select>
            {errors.initials && (
              <p className="text-red-500 text-xs italic">
                {errors.initials.message?.toString()}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              {...register("firstname")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="firstname"
              type="text"
            />
            {errors.firstname && (
              <div className="text-red-500 text-xs italic">
                {errors.firstname && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstname.message?.toString()}
                  </p>
                )}
              </div>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              {...register("lastname")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="lastname"
              type="text"
            />
            {errors.lastname && (
              <p className="text-red-500 text-xs italic">
                {errors.lastname.message?.toString()}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password")}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-xs px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign Up
            </button>

            <div>
              <p className="text-xs">Forgot your password?</p>
              <Link
                className="inline-block align-baseline font-bold text-[11px] text-blue-500 hover:text-blue-800"
                href="/forgot-password"
              >
                Reset Password
              </Link>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-xs">Already have an account?</p>
            <Link
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
              href="/sign-in"
            >
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
