import React, { FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { ToastAction } from "@radix-ui/react-toast";
import { LoadingSpinner } from "@/components/Loading";
import GitHubIcon from "@mui/icons-material/GitHub";
import Link from "next/link";
import { useForm } from "react-hook-form";

export interface LogInServerProps {
  toast: Function;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setTitle: (title: string[]) => void; // Adjust type as needed
  schema: z.ZodObject<any>;
  setIsClient: React.Dispatch<React.SetStateAction<boolean>>;
  isClient: boolean;
  // handleSubmit: (data: any) => void;
  register: any;
  errors: any;
  setIsFocusedOnPassword: any;
  setIsFocusedOnEmail: any;
  isFocusedOnEmail: any;
  isFocusedOnPassword: any;
  emailValue: any;
  passwordValue: any;
  setIsSubmitting: any;
  setRes: any;
  reset: any;
  startTime: any;
  timeAgo: any;
  onSubmit: any;
}

export default function LogInServerForm({
  toast,
  isLoading,
  setIsLoading,
  setTitle,
  schema,
  setIsClient,
  isClient,
  errors,
  register,
  setIsFocusedOnPassword,
  setIsFocusedOnEmail,
  isFocusedOnEmail,
  isFocusedOnPassword,
  emailValue,
  passwordValue,
  setIsSubmitting,
  setRes,
  reset,
  startTime,
  timeAgo,
  onSubmit,
}: LogInServerProps) {
  const router = useRouter();
   const {
    handleSubmit,
  
  } = useForm();

  return (
    isClient && (
      <div
        style={{
          backgroundImage: "url('/login.jpg')",
          backgroundSize: "contain",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
        className="flex justify-start items-center h-screen bg-[#ffd4e8]"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}
          className="justify-start items-start grid md:grid-cols-1 gap-2 md:ml-10 md:mr-10 bg-[#fdfdfdce] rounded-3xl shadow-md md:px-[2rem]"
        >
          {/* FORM ELEMENTS */}
          <div className="p-[2rem]">
            {isLoading && <LoadingSpinner />}
            <div className="text-start mb-4">
              <div className="flex justify-between items-center gap-4">
                <h1 className="flex text-[2.5rem] md:text-[4rem] font-extrabold">
                  Sign In
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
                Already applied to a university? Sign in now to access exclusive
                application <br /> resources and community forums!
              </p>
              <p className="text-lg text-gray-600">
                Time since component mounted:{" "}
                <span className="font-medium text-gray-800">{timeAgo}</span>
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 justify-evenly mb-4">
              <div
                className="col-span-1 flex  gap-3 justify-start bg-[#22318f]
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

            {/* SIGN IN BUTTON */}
            <section className="flex items-center justify-between mt-4 p-2">
              <button
                className="bg-black hover:bg-[#0000008f] text-white font-bold py-6 text-xs px-8 rounded-3xl focus:outline-none focus:shadow-outline"
                type="submit"
                // onClick={onSubmit}
              >
                Sign In
              </button>

              <div className="">
                <div className="text-xs">Don&apos;t have an account?</div>
                <div>
                  <Link
                    className="inline-block align-baseline font-bold text-xs text-blue-500 hover:text-blue-800"
                    href="/sign-up"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </form>
      </div>
    )
  );
}
