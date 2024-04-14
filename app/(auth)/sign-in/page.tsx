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
import { errorType } from "@/types/users";
import { LoadingSpinner } from "@/components/Loading";
import GitHubIcon from "@mui/icons-material/GitHub";
// import { login } from "@/pages/session";
import { useRouter } from "next/navigation";
import LogInServerForm, {
  LogInServerProps,
} from "./Form";
import { useTimeAgo__util } from "@/utils/utils";
import {useIsClient} from "@/hooks/useIsClient";
import {RerouteLoader} from "@/components/Loading";




const schema = z.object({
  email: z.string().email({ message: "Email must be a valid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  isAdmin: z.boolean().optional(),
  adminKey: z.string().min(6, { message: "Admin key must be exactly 6 characters" }).max(6, { message: "Admin key must be exactly 6 characters" }).optional(),
  });


const LogIn: React.FC= () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  const { isLoading, setIsLoading, session, setSession } = userStore();
  const [isFocusedOnEmail, setIsFocusedOnEmail] = useState(false);
  const [isFocusedOnPassword, setIsFocusedOnPassword] = useState(false);
  const router = useRouter();
  const startTime = new Date();
  const timeAgo = useTimeAgo__util(startTime);
  const isClient = useIsClient()
  const [areYouLoading, setAreYouLoading] = useState(false)


  type UserResponseProps = {
    data: {
      message: string;
      session: {
        userId: string;
        email: string;
        isstudent: boolean;
        isLoggedIn: boolean;
        firstname: string;
        lastname: string;
        isAdmin: boolean
        role: string
      }
    }
  }

  type UserResponseKey = keyof UserResponseProps;


  const onSubmit = async (
    data: { email: string; password: string }
  ) => {
    // perform safeparse and log data using zod safeparse
    const parsed = schema.safeParse(data);
    console.log("Parsed::", parsed);
    // when parsing, if there are errors, log them
    if (!parsed.success) {
      return <div className="text-center text-red-500">An error occured, please try again later</div>
    }
    setIsSubmitting(true);
    try {
      setIsLoading(true);
      // const response = await login(data);
      const response: UserResponseProps = await axios.post("/api/auth/postgres/sign-in", data);
      setSession(response.data.session)
      console.log("Res::", response.data);
      if (response?.data.session.isLoggedIn) {
        toast({
          variant: "default",
          title: "Registration successful",
          description: JSON.stringify(response?.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className: "green-toast",
        });
         router.push("/admin/dashb");
        // reset();
       
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          //@ts-ignore
          description: JSON.stringify(response?.data.message),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err: any) {

      console.log("There is an Error please boss!: ", err.response.data.message);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: JSON.stringify(err.response.data.message),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };


  useEffect(() => {
    setAreYouLoading(true)
    if (session.isLoggedIn) {
     router.back()
    }
    else{
      setAreYouLoading(false)
    }
  }, [router]);

if(areYouLoading){
  return <div><RerouteLoader /></div>
}

  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isAdmin = watch("isAdmin")

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
          onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
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
              <p className="text-xs mt-4">
                Time since component mounted:{" "}
                <i className="font-medium text-green-800 font-bolder">{timeAgo}</i>
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

            {/* ARE YOU ADMIN? */}
          <div className="items-top flex space-x-2 mb-4 items-start">
            <input className="text-4xl" type="checkbox" id="isAdmin" {...register("isAdmin")} />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="isAdmin"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Are you an administrator?
              </label>
              <p className="text-sm text-muted-foreground">
                Sign in with your admin secret key generated for you.
              </p>
            </div>

            {
              errors.isAdmin && (
                <p className="text-red-500 text-xs italic">
                  {errors.isAdmin.message?.toString()}
                </p>
              )
            }
          </div>

          {
            isAdmin && (
              <div className="flex flex-col gap-2"> 
                <p>Enter your admin secret key</p>
                <input
                className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                 type="password" 
                 placeholder="Enter your admin secret key"
                 {...register("adminKey")}

                 />

                 {errors.adminKey && (
                  <p className="text-red-500 text-xs italic">
                    {errors.adminKey.message?.toString()}
                  </p>
                )}

              </div>
            )
          }

            {/* SIGN IN BUTTON */}
            <section className="flex items-center justify-between mt-4 p-2">
              <button
                className="bg-black hover:bg-[#0000008f] text-white font-bold py-4 text-xs px-8 rounded-3xl focus:outline-none focus:shadow-outline"
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
};

// export async function getServerSideProps() {
//   // Fetch data from the server or perform any necessary operations
//   // For example:
//   // const data = await fetchData();

//   // You can pass initial values or fetched data as props to the component
//   return {
//     schema,
//     isLoading: false,
//     setIsLoading: () => {},
//     setTitle: () => {},
//     setIsClient: () => {},
//     isClient: false,
//     toast: () => {},
//     handleSubmit: () => {},
//     errors: {},
//     register: () => {},
//     setIsFocusedOnPassword: () => {},
//     setIsFocusedOnEmail: () => {},
//     isFocusedOnEmail: false,
//     isFocusedOnPassword: false,
//     emailValue: "",
//     passwordValue: "",
//   };
// }

export default LogIn;
