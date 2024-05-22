"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import Cookies from "js-cookie";
import React from "react";
import userStore from "@/store";
import { LoadingSpinner } from "@/components/Loading";
import Link from "next/link";
import { errorType } from "@/types/users";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import clsx from "clsx";

const SendOtp = () => {
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setMyEmail] = useState("");
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const {
    serverResponse,
    setServerResponse,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    setEmail,
  } = userStore();
  const router = useRouter();

  const onSendOtp = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      setIsLoading(true);
      const res = await axios.get("/api/v1/query/getUser", {
        params: { email: email },
      });
      console.log("RESPONSE::", res);
      const response = await axios.post("/api/v1/auth/sendOtp", { email: email });
      setEmail(email);
      if (res.data.message) {
        toast({
          variant: "default",
          title: "Email sent successfully!",
          description: JSON.stringify(response.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className: "green-toast",
        });
        setIsError(false);
        setIsLoading(false);
        setIsSubmitting(false);
        console.error("ERR::", response.data.message);
        setErrors(response.data.message);
      }
      console.log("RESPONSE::", response.data);
      setServerResponse(response.data);
      router.push("/verify-otp");
      setIsSubmitting(false);
    } catch (err: any) {
      const serverError = err as errorType;
      if (serverError && serverError.response) {
        setIsError(true);
        setErrors(err.message);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: JSON.stringify(serverError.response.data.message),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setIsError(true);
        setIsLoading(false);
        setIsSubmitting(false);
        console.error("ERR::", serverError.response.data.message);
        setErrors(serverError.response.data.message);
      }
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black">
      <form
        onSubmit={onSendOtp}
        className="grid md:grid-cols-2  bg-white rounded shadow-md"
      >
        {/* IMAGE */}
        <div
          className="flex flex-col justify-center items-center "
          style={{
            backgroundImage: "url(/emailB.jpg)",
            backgroundSize: "cover",
          }}
        ></div>

        {/* FORM */}
        <div className="ml-5  p-6">
          {isLoading && <LoadingSpinner />}
          <h2 className="text-2xl text-center mb-5">Forgot Password?</h2>
          <div className="relative mb-5">
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setMyEmail(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
              className="border-2 border-gray-300 rounded w-64 py-2 px-4 focus:border-blue-500"
            />
            <label
              htmlFor="email"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocused || email
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Email
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
            {isSubmitting ? "Sendiing..." : "Send Otp"}
          </Button>

          <div className="flex flex-col mt-4 text-center text-xs">
            {" "}
            Dont have an account?
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SendOtp;
