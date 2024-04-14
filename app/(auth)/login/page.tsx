"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/authContext";
import Cookies from "js-cookie";
import React from "react";
import userStore from "@/store";
import { LoadingSpinner } from "@/components/Loading";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import useThemeStore from "@/store/themeStore";

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

const roles = ["ADMINISTRATOR", "TUTOR OR LECTURER", "STUDENT"];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [secretPin, setSecretPin] = useState("");
  const [showError, setShowError] = useState("");
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
    secretPin: "",
  });

  const {
    serverResponse,
    setServerResponse,
    errors,
    setErrors,
    setUser,
    isLoading,
    setIsLoading,
  } = userStore();
  const { setToken } = useAuth();
  const router = useRouter();

  const { theme } = useThemeStore();
  // useEffect(() => {
  //   // This effect will re-run whenever the theme changes
  //   // It will trigger a re-render of the component
  //   // You can perform any necessary actions here
  //   console.log("Theme changed:", theme);
  // }, [theme]); // Re-run the effect when the theme changes

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/login", data);
      setToken(response.data.token);
      console.log("RESPONSE::", response.data);
      setServerResponse(response.data);

      // get the user data
      const userResponse = await axios.get("/api/query/getUser", {
        params: { email: data.email },
      });
      const user = userResponse.data;
      setUser(userResponse.data);
      Cookies.set("token", response.data.token);
      if (response.data.isAdmin && response.data.loggedIn) {
        toast({
          variant: "default",
          title: "Login successful",
          description: JSON.stringify(response.data.message),
          action: <ToastAction altText="Dismiss">Dismiss</ToastAction>,
          className: "green-toast",
        });
        setIsError(false);
        setIsLoading(false);
        setIsSubmitting(false);
        console.error("ERR::", response.data.message);
        setErrors(response.data.message);
        router.push("/admin");
        // setIsLoading(false);
      } else {
        router.push("/dashboard");
        // setIsLoading(false);
      }
      console.log("USER:: ", user);
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
        setIsLoading(false);
      }
      console.error("ERR::", serverError.response.data.message);
      setErrors(serverError.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: any) => {
    data.role = e.target.value;
    setSelectedRole(data.role);
  };

  const handleSecretPin = (e: any) => {
    setSecretPin(e.target.value);
    setData({ ...data, secretPin: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black">
      <form
        onSubmit={login}
        className="grid md:grid-cols-2  bg-white rounded shadow-md"
      >
        {isLoading && <LoadingSpinner />}

        {/* IMAGE */}
        <div
          className="flex flex-col justify-center items-center"
          style={{
            backgroundImage: "url(/nice1.jpg)",
            backgroundSize: "cover",
          }}
        ></div>
        {/* FORM */}
        <div className="p-6">
          <h2 style={{color:theme.primaryColor}} className="text-2xl mb-4 text-center">Login</h2>
          {/* {isError && <p className="text-red-500 text-center">{errors}</p>} */}
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="block w-full p-2 mb-4 border rounded"
            placeholder="Email"
          />
          <input
            type="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="block w-full p-2 mb-4 border rounded"
            placeholder="Password"
          />
          <select
            className="block w-full p-2 mb-4 border rounded"
            required
            onChange={handleChange}
            value={selectedRole}
          >
            <option value="">Select a role</option>
            {roles.map((role, id) => (
              <React.Fragment key={id}>
                <option value={role}>{role}</option>
              </React.Fragment>
            ))}
          </select>
          {selectedRole === "ADMINISTRATOR" && (
            <input
              type="password"
              value={secretPin}
              onChange={handleSecretPin}
              maxLength={6}
              className="block w-full p-2 mb-4 border rounded"
              placeholder="Enter your secret pin"
            />
          )}
          <Button
            style={{ background: `${theme.primaryColor}` }}
            type="submit"
            variant="outline"
            className={`block w-full p-2 text-white bg-blue-500 rounded ${
              isSubmitting && "bg-[gray] text-white"
            } hover:bg-blue-600`}
          >
            {isSubmitting && !isError
              ? "Loading..."
              : isSubmitting && isError
              ? "An Error occured!"
              : "Login"}
          </Button>

          <div className="flex flex-col mt-4 text-center text-xs">
            {" "}
            Don&apos;t have an account?
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
            Forgot Password?
            <Link
              href="/forgot-password"
              className="text-blue-500 hover:text-blue-600"
            >
              reset
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
export default LoginPage;
