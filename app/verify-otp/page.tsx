/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, {useRef} from "react";
import userStore from "@/store";
import { LoadingSpinner } from "@/components/Loading";
import Link from "next/link";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import clsx from "clsx";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { errorType } from "@/types/users";

const ForgotPassword = () => {
  const [isError, setIsError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { toast } = useToast();
  

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

  const onVerify = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);

      try {
        setIsLoading(true);
        const response = await axios.post("/api/v1/auth/verifyOtp", {
          otp: otp,
          email: user.email,
        });
        if(response.data.message){
          toast({
            variant: "default",
          title: "Login successful",
          description: JSON.stringify(response.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className:"green-toast"
        });
          setIsError(true);
          setIsLoading(false);
          setIsSubmitting(false);
          console.error("ERR::", response.data.message);
          setErrors(response.data.message);
        }
        console.log("RESPONSE::", response.data);
        setServerResponse(response.data);
        router.push("/reset-password");
        setIsSubmitting(false);
      } catch (err: any) {
        const serverError = err as errorType;
        if (serverError && serverError.response) {
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
    },
    [otp, user.email, router]
  );

  React.useEffect(() => {
    if (otp.length === 6) {
      onVerify(new Event("submit") as any);
    }
  }, [otp]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black">
      <form
        onSubmit={onVerify}
        className="grid md:grid-cols-2  bg-white rounded shadow-md"
      >
        {/* IMAGE */}
         <div
          className="flex flex-col justify-center items-center"
          style={{ backgroundImage: "url(/enter-otp.jpg)", backgroundSize: "cover" }}
        >
        </div>

        {/* FORM  */}
        <div className="ml-5  p-6">
          {isLoading && <LoadingSpinner />}
          <h2 className="text-2xl text-center mb-5">Verify OTP</h2>
          {/* {isError && (
            <p className="text-red-500 text-center relative bottom-5">
              {errors}
            </p>
          )} */}
          <div className="relative">
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => {
                if (e.target.value.length <= 6) {
                  setOtp(e.target.value);
                }
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              required
              className="border-2 border-gray-300 rounded w-64 py-2 px-4 focus:border-blue-500"
            />
            <label
              htmlFor="otp"
              className={`absolute top-0 left-0 py-2 px-4 transition-all duration-200 ease-in-out ${
                isFocused || otp
                  ? "text-xs text-blue-500 -mt-5 bg-white px-1 left-5"
                  : "text-base text-gray-500 outline-none mt-1"
              }`}
            >
              Verify Otp
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
            {isSubmitting ? "Verifying..." : "Verify Otp"}
          </Button>
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
