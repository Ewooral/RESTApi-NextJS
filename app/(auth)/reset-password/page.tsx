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
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

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

const ForgotPassword = () => {
  const [isError, setIsError] = useState(false);
  const [isFocusedA, setIsFocusedA] = useState(false);
  const [isFocusedB, setIsFocusedB] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    serverResponse,
    setServerResponse,
    errors,
    setErrors,
    isLoading,
    setIsLoading,
    user,
  } = userStore();
  const router = useRouter();

  const onReset = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (password !== confirmPassword) {
        setErrors("Passwords do not match");
        return;
      }
      console.log("password::", password);

      const response = await axios.post("/api/v1/auth/resetPassword", {
        email: user.email,
        password: confirmPassword,
      });
      setPassword(password);
      console.log("RESPONSE::", response.data);
      setServerResponse(response.data);
      router.push("/login");
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
      <form
        onSubmit={onReset}
        className="grid md:grid-cols-2  bg-white rounded shadow-md"
      >
        {/* IMAGE */}
        <div
          className="flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url(/reset.jpg)",
            backgroundSize: "cover",
          }}
        ></div>

         {/* FORM */}
        <div className="p-6">
          {isLoading && <LoadingSpinner />}
          <h2 className="text-2xl text-center mb-5">Reset Password</h2>
          {isError && (
            <p className="text-red-500 text-center relative bottom-5">
              {errors}
            </p>
          )}
          <div className="relative mb-8">
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocusedA(true)}
              onBlur={() => setIsFocusedA(false)}
              required
              className="border-2 border-gray-300 rounded w-64 py-2 px-4 focus:border-blue-500"
            />
            <label
              htmlFor="reset-password"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocusedA || password
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Password
            </label>
          </div>
          <div className="relative mb-4">
            <input
              id="reset-passwordB"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onFocus={() => setIsFocusedB(true)}
              onBlur={() => setIsFocusedB(false)}
              required
              className="border-2 border-gray-300 rounded w-64 py-2 px-4 focus:border-blue-500"
            />
            <label
              htmlFor="reset-passwordB"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocusedB || confirmPassword
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Confirm Password
            </label>
          </div>

          <button
            type="submit"
            className="block w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Reset
          </button>
          <div className="flex flex-col mt-4 text-center text-xs">
            {" "}
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-600"
            >
              Back <KeyboardBackspaceOutlinedIcon />
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
