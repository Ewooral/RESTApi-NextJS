/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";

import { ToastAction } from "@radix-ui/react-toast";
import router from "next/router";
import { errorType } from "@/types/users";
import { LoadingSpinner } from "@/components/Loading";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";


const schema = z.object({
  firstname: z.string().nonempty({ message: "First name is required" }),
  lastname: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  initials: z.string().nonempty({ message: "Initials are required" }),
});

export default function SignIn({isFocused, setIsFocused, isLoading}: {isFocused: boolean[], setIsFocused: any, isLoading: boolean}) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { toast } = useToast();
//   const { isLoading, setIsLoading, initials, setInitials } = userStore();
  const emailValue = watch("email");
  const passwordValue = watch("password");


  const onSubmit = async (data: FieldValues) => {
    console.log("onSubmit called");
    console.log("errors:", errors);
    console.log("data:", data);
  };


  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <form
        // onSubmit={(data) => { console.log('handleSubmit called'); onSubmit(data); }}
        onSubmit={handleSubmit(onSubmit)}
        className=" justify-center items-center mb-4 grid md:grid-cols-2 gap-2  bg-white rounded shadow-md"
      >
        {/* IMAGE */}
        <div
          className="flex flex-col col-span-1 justify-center items-center border-r-2 border-gray-200"
          style={{
            backgroundImage:
              "url(https://i.pinimg.com/originals/e1/59/25/e15925c931a81678a3c2e0c0a40db781.gif)",
            // "url(https://i.pinimg.com/originals/36/91/6f/36916f619c448fb8975f7730959e8562.gif)",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "100%",
            width: "100%",
            // backgroundColor:"#fedc6b"
          }}
        ></div>

        {/* FORM ELEMENTS */}
        <div className="p-5">
          {isLoading && <LoadingSpinner />}
          <div className="text-center mb-4">
            <h1 className="mb-4 text-2xl font-bold text-center">Sign In</h1>
            <p className="text-xs text-[gray]">
              Registered? Sign in now to access
              <br />
              exclusive application resources and community forums!
            </p>
          </div>

          {/* EMAIL */}
          <div className="relative mb-5">
            <input
              id="email"
              type="text"
              {...register("email", { required: true })}
              onFocus={() => setIsFocused[0](true)}
              onBlur={() => setIsFocused[0](false)}
              className="border-2 border-gray-300 rounded w-full py-2 px-4 "
            />

            {errors.email && (
              <>
                <p className="flex items-center text-red-500">
                  <ExclamationCircleIcon
                    className="h-5 w-5 mr-2 text-red-500"
                    aria-hidden="true"
                  />
                  This field is required
                </p>
              </>
            )}
            <label
              htmlFor="email"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocused[0] || emailValue
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Email
            </label>
          </div>
                
             {/* PASSWORD */}
          <div className="relative mb-5">
            <input
              id="password"
              type="password"
              {...register("password", { required: true })}
              onFocus={() => setIsFocused[1](true)}
              onBlur={() => setIsFocused[1](false)}
              className="border-2 border-gray-300 rounded w-full py-2 px-4"
            />

            {errors.password && (
              <>
                <p className="flex items-center text-red-500">
                  <ExclamationCircleIcon
                    className="h-5 w-5 mr-2 text-red-500"
                    aria-hidden="true"
                  />
                  This field is required
                </p>
              </>
            )}
            <label
              htmlFor="password"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocused[1] || passwordValue
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Password
            </label>
          </div>

              {/* BUTTON */}
          <div className="flex items-center justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 text-xs px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>

            {/* Github SignIn Button */}
            {/* <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 text-xs px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleGithubLogin}
            >
                Github
            </button> */}

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
            <p className="text-xs">Have not registered yet?</p>
            <Link
              className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
              href="/sign-up"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
