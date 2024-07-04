/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import userStore from "@/store";
import { ToastAction } from "@radix-ui/react-toast";
import { useRouter } from "next/navigation";
import { errorType } from "@/types/users";
import { LoadingSpinner, RerouteLoader } from "@/components/Loading";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Checkbox } from "@/components/ui/checkbox";
import { useIsClient } from "@/hooks/useIsClient";
import ButtonSpinner from "@/components/spinners/ButtonSpinner";
import { clsx } from "clsx";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";
import DynamicButton from "@/components/CustomButton";
import { BsFillSendCheckFill } from "react-icons/bs";
import { FaCashRegister } from "react-icons/fa6";

const schema = z.object({
  firstname: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  title: z.string().min(1, { message: "Title is required" }),
  terms: z.boolean().refine((v) => v === true, { message: "Agree to terms" }),
  isStudent: z.boolean().optional(),
});

export default function SignUp() {
  const [response, setResponse] = React.useState([]);
  const isClient = useIsClient();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const [initialsRes, setInitialsRes] = useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const { isLoading, setIsLoading, title, setTitle, session } = userStore();
  const [isFocusedOnFirstName, setIsFocusedOnFirstName] = useState(false);
  const [isFocusedOnLastName, setIsFocusedOnLastName] = useState(false);
  const [isFocusedOnEmail, setIsFocusedOnEmail] = useState(false);
  const [isFocusedOnPassword, setIsFocusedOnPassword] = useState(false);
  const [areYouLoading, setAreYouLoading] = useState(false);
  const { hideAfterLargerScreens } = useCssMediaQueries();

  useEffect(() => {
    const fetchInitials = async () => {
      const response = await axios.get("/api/v1/auth/postgres/fetch-initials");
      console.log("Title: ", response.data.title);
      setTitle(response.data.titles);
      setInitialsRes(response.data.message);
      console.log(response.data);
    };
    fetchInitials();
  }, []);

  const onSubmit = async (data: FieldValues) => {
    // perform safeparse and log data using zod safeparse
    const parsed = schema.safeParse(data);
    console.log("Parsed::", parsed);
    // when parsing, if there are errors, log them
    if (!parsed.success) {
      console.log("Errors::", parsed.error);
    }
    setIsSubmitting(true);
    try {
      setIsLoading(true);
      const response = await axios.post("/api/v1/auth/postgres/sign-up", data);
      console.log("Res::", response);
      if (response.data.message) {
        toast({
          variant: "default",
          title: "Registration successful",
          description: JSON.stringify(response.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className: "green-toast",
        });
        reset();
        router.push("/sign-in");
      }
      console.log("RESPONSE::", response);
    } catch (err) {
      const serverError = err as errorType;
      if (serverError && serverError.response) {
        console.log("ERROR::", serverError.response.data.error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong oo.",
          description: JSON.stringify(serverError.response.data.error),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setAreYouLoading(true);
    if (session.isLoggedIn) {
      router.push("/myadmin/dashboard");
    } else {
      setAreYouLoading(false);
      router.push("/sign-up");
    }
  }, []);

  if (areYouLoading) {
    return (
      <div>
        <RerouteLoader />
      </div>
    );
  }

  const firstnameValue = watch("firstname");
  const lastnameValue = watch("lastname");
  const emailValue = watch("email");
  const passwordValue = watch("password");

  return (
    <>
      {isClient && (
        <div
          // style={{
          //   backgroundImage: "url('/bg_B.jpg')",
          //   backgroundSize: "contain",
          //   backgroundPosition: "right",
          //   backgroundRepeat: "no-repeat",
          // }}
          className={clsx(
            "flex justify-start items-center h-screen bg-[#dcdfe6]"
          )}
        >
          <form
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            className={clsx(
              "justify-start items-start grid md:grid-cols-1 gap-2 md:ml-10 md:mr-10 bg-[#fdfdfdce] rounded-3xl shadow-md md:px-[2rem]",
              hideAfterLargerScreens && "mt-[20.3rem] mb-[2.3rem]"
            )}
          >
            {/* FORM ELEMENTS */}
            <div className="p-[2rem]">
              <div className="text-start mb-4">
                <div className="flex justify-between items-center gap-4">
                  <h1 className="flex text-[2.5rem] md:text-[4rem] font-extrabold">
                    Sign Up
                  </h1>

                  <div className="">
                    <p className="text-xs">Forgot your password?</p>
                    <div>
                      <Link
                        className="inline-block align-baseline font-bold text-[11px] text-blue-500 hover:text-blue-800"
                        href="/forgot-password"
                      >
                        Reset Password
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="text-xs">
                  Applying to university? Sign up now to access exclusive
                  application <br /> resources and community forums!
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 justify-evenly mb-4">
                <div
                  className="col-span-1 flex  gap-3 justify-start bg-[#3b82f6]
             hover:bg-[#5f73f1] text-white p-2 rounded-xl items-center cursor-pointer"
                >
                  <span className="font-extrabold text-5xl">G</span>
                  <span>Sign in with Google</span>
                </div>
                <div
                  className={`flex  justify-center items-center bg-[#b994b9]
             hover:bg-[#fbd4fb] text-white  cursor-pointer rounded-xl p-2 `}
                >
                  <span>
                    <GitHubIcon style={{ fontSize: 50, color: "#fff" }} />
                  </span>
                </div>
              </div>

              {/* TITLE */}
              <div className="mb-4">
                {/* <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="initials"
            >
              Title
            </label> */}
                {isClient && (
                  <select
                    id="title"
                    disabled={isLoading}
                    {...register("title")}
                    className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  >
                    <option value="">Select your title</option>
                    {title?.map((title, index) => (
                      <option key={index} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                )}
                {errors.title && (
                  <p className="text-red-500 text-xs italic">
                    {errors.title.message?.toString()}
                  </p>
                )}
              </div>

              {/* FIRST NAME */}
              <div className="relative mb-5">
                <input
                  disabled={isLoading}
                  id="firstname"
                  type="text"
                  {...register("firstname")}
                  onFocus={() => setIsFocusedOnFirstName(true)}
                  onBlur={() => setIsFocusedOnFirstName(false)}
                  required
                  className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                />
                <label
                  htmlFor="firstname"
                  className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                    isFocusedOnFirstName || firstnameValue
                      ? "text-xs text-blue-500 -mt-5 bg-white left-5"
                      : "text-base text-gray-500 outline-none mt-1"
                  }`}
                >
                  First Name
                </label>
                {errors.firstname && (
                  <p className="text-red-500 text-xs italic">
                    {errors.firstname.message?.toString()}
                  </p>
                )}
              </div>

              {/* LAST NAME */}
              <div className="relative mb-4">
                <label
                  className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                    isFocusedOnLastName || lastnameValue
                      ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                      : "text-base text-gray-500 outline-none mt-1"
                  }`}
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  {...register("lastname")}
                  disabled={isLoading}
                  className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  id="lastname"
                  type="text"
                  onFocus={() => setIsFocusedOnLastName(true)}
                  onBlur={() => setIsFocusedOnLastName(false)}
                  required
                />
                {errors.lastname && (
                  <p className="text-red-500 text-xs italic">
                    {errors.lastname.message?.toString()}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div className="relative mb-4">
                <label
                  className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                    isFocusedOnEmail || emailValue
                      ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                      : "text-base text-gray-500 outline-none mt-1"
                  }`}
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  {...register("email")}
                  disabled={isLoading}
                  className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  id="email"
                  type="email"
                  onFocus={() => setIsFocusedOnEmail(true)}
                  onBlur={() => setIsFocusedOnEmail(false)}
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic">
                    {errors.email.message?.toString()}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div className="relative mb-4">
                <label
                  className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                    isFocusedOnPassword || passwordValue
                      ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                      : "text-base text-gray-500 outline-none mt-1"
                  }`}
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  disabled={isLoading}
                  className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  id="password"
                  type="password"
                  onFocus={() => setIsFocusedOnPassword(true)}
                  onBlur={() => setIsFocusedOnPassword(false)}
                  required
                />
                {errors.password && (
                  <p className="text-red-500 text-xs italic">
                    {errors.password.message?.toString()}
                  </p>
                )}
              </div>

              {/* CHECKBOX */}
              <div className="items-top flex space-x-2 mb-4 items-start">
                <input
                  disabled={isLoading}
                  className="text-4xl"
                  type="checkbox"
                  id="terms1"
                  {...register("terms")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms1"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept terms and conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    You agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>

                {errors.terms && (
                  <p className="text-red-500 text-xs italic">
                    {errors.terms.message?.toString()}
                  </p>
                )}
              </div>

              <div className="items-top flex space-x-2 mb-4 items-start">
                <input
                  disabled={isLoading}
                  className=""
                  type="checkbox"
                  id="terms2"
                  {...register("isStudent")}
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="terms2"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Are you a student?
                  </label>
                  <p className="text-sm text-muted-foreground">
                    Kindly check this box if you are a student, thanks!.
                  </p>
                </div>

                {errors.isStudent && (
                  <p className="text-red-500 text-xs italic">
                    {errors.isStudent.message?.toString()}
                  </p>
                )}
              </div>

              {/* SIGN UP BUTTON */}
              <section className="flex items-center justify-between mt-4 p-2">
                <DynamicButton
                  className={clsx("px-2 mx-[-.5rem] text-white")}
                  label={isLoading ? "Signing up..." : "Sign up"}
                  icon={<FaCashRegister className="size-3 text-white" />}
                  isLoading={isLoading}
                  type="submit"
                />
                <div className="">
                  <div className="text-xs">Already have an account?</div>
                  <div>
                    <Link
                      className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
                      href="/sign-in"
                    >
                      Sign In
                    </Link>
                  </div>
                </div>
              </section>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
