import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/lib/schemas";
import { useIsClient } from "@/hooks/useIsClient";
import userStore from "@/store";
import { LoadingSpinner } from "@/components/Loading";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import ButtonSpinner from "@/components/spinners/ButtonSpinner";
import clsx from "clsx";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";
import { DevTool } from "@hookform/devtools";
import DynamicButton from "@/components/CustomButton";
import { AiOutlineLogin } from "react-icons/ai";

interface LoginFormProps {
  onSubmit: (data: any) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const { isLoading } = userStore();
  const [isFocusedOnEmail, setIsFocusedOnEmail] = useState(false);
  const [isFocusedOnPassword, setIsFocusedOnPassword] = useState(false);
  const {hideAfterLargerScreens} = useCssMediaQueries();

  const isClient = useIsClient();
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const isAdmin = watch("isAdmin");

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
          className="flex justify-start items-center h-screen bg-[#dcdfe6]"
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("justify-start items-start grid md:grid-cols-1 gap-2 md:ml-10 md:mr-10 bg-[#fdfdfdce] rounded-3xl",
            "shadow-md md:px-[2rem]",
            hideAfterLargerScreens && "mt-[6.3rem]"
          )}
          >
            {/* FORM ELEMENTS */}
            <div className="p-[2rem]">
              {/* {isLoading && <LoadingSpinner />} */}
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
                  Already applied to a university? Sign in now to access
                  exclusive application <br /> resources and community forums!
                </p>
                {/*<p className="text-xs mt-4">*/}
                {/*  Time since component mounted:{" "}*/}
                {/*  <i className="font-medium text-green-800 font-bolder">{timeAgo}</i>*/}
                {/*</p>*/}
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
                    <GithubIcon style={{ fontSize: 50, color: "#fff" }} />
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
                  className="border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                  id="password"
                  type="password"
                  disabled={isLoading}
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
                <input
                  disabled={isLoading}
                  className="text-4xl"
                  type="checkbox"
                  id="isAdmin"
                  {...register("isAdmin")}
                />
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

                {errors.isAdmin && (
                  <p className="text-red-500 text-xs italic">
                    {errors.isAdmin.message?.toString()}
                  </p>
                )}
              </div>

              {isAdmin && (
                <div className="flex flex-col gap-2">
                  <p>Enter your admin secret key</p>
                  <input
                    disabled={isLoading}
                    className={clsx(
                      "border-2 border-gray-300 rounded w-full py-2 px-4 focus:border-blue-500"
                    )}
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
              )}

              {/* SIGN IN BUTTON */}
              <section className="flex items-center justify-between mt-4 p-2">              
                <DynamicButton
                  className={clsx("px-2 mx-[-.5rem] text-white")}
                  label={isLoading ? "Signing in..." : "Sign in"}
                  icon={<AiOutlineLogin className="size-4 text-white" />}
                  isLoading={isLoading}
                  type="submit"
                />

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
          <DevTool control={control} />
        </div>
      )}
    </>
  );
};
