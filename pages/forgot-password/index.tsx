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

type errorType = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: {};
  response: {
    data: {
      message: string;
    };
    status: number;
    statusText: string;
  };
};


const VerifyOtp = () => {
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [email, setMyEmail] = useState("");

  const {
    serverResponse,
    setServerResponse,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    setEmail
  } = userStore();
  const router = useRouter();
 

  const onSendOtp = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      console.log("email::", email)
      const res = await axios.get("/api/query/getUser", {
        params: { email: email },
      });
        console.log("RESPONSE::", res);
      const response = await axios.post("/api/auth/sendOtp", { email: email });
      setEmail(email)
      console.log("RESPONSE::", response.data);
      setServerResponse(response.data);
      router.push("/verify-otp");
    } catch (err: any) {
      const serverError = err as errorType;
      if (serverError && serverError.response) {
        setIsError(true);
        setIsLoading(false);
        console.error("ERR::", serverError.response.data.message);
        setErrors(serverError.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black">
      <form onSubmit={onSendOtp} className="p-6 bg-white rounded shadow-md">
        <div>
        {isLoading && <LoadingSpinner />}
        <h2 className="text-2xl text-center mb-5">Forgot Password?</h2>
        {isError && <p className="text-red-500 text-center relative bottom-5">{errors}</p>}
        <div className="relative">
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

        <button
          type="submit"
          className="block w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Send OTP
        </button>

        <div className="flex flex-col mt-4 text-center text-xs">
          {" "}
          Dont have an account?
          <Link href="/register" className="text-blue-500 hover:text-blue-600">
            Register
          </Link>
        </div>
        </div>
      </form>

    </div>
  );
};

export default VerifyOtp;

