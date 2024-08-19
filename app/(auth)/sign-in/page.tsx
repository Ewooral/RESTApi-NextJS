"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import userStore from "@/store";
import { UserImageProps, UserResponseProps } from "@/types/users";
import { useRouter } from "next/navigation";
import { RerouteLoader } from "@/components/Loading";
import { signInSchema } from "@/lib/schemas";
import { useCustomToast } from "@/hooks/useToast";
import { userService_POSTGRES, userService_POSTGRES_REFACTORED } from "@/services/userService";
import { LoginForm } from "./LoginForm";




const LogIn: React.FC = () => {
  const {
  } = useForm({
    resolver: zodResolver(signInSchema),
  });
  const {showSuccessToast, showErrorToast} = useCustomToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    setIsLoading,
    session,
    setSession,
    setImageUrl,
    imageUrl,
    setIsLoggedIn
  } = userStore();
  const router = useRouter();
  const [areYouLoading, setAreYouLoading] = useState(false);

 

  
  const onSubmit = async (data: { email: string; password: string }) => {
    setIsSubmitting(true);
    try {
      setIsLoading(true);
      // Ensure signIn is completed before proceeding
      const response: UserResponseProps = await userService_POSTGRES.signIn(data);
  
      // Check if the response and its data are valid
      if (!response || !response.data) {
        throw new Error("Invalid response structure from signIn");
      }
  
      // At this point, response is ready and valid, proceed with userId
      const userId = response.data.session.userId;
  
      // Ensure fetchUserImage is completed before proceeding
      const GetUserImageResponse: UserImageProps = await userService_POSTGRES.fetchUserImage(userId);
      console.log("User Image Object::", GetUserImageResponse);
  
      // Proceed with the rest of your logic
      setImageUrl(GetUserImageResponse.imageUrl);
      setSession(response.data.session);
      setIsLoggedIn(true);
      showSuccessToast(response.data.message, `Welcome ${response.data.session.firstname}!`);
      router.push("/myadmin/user-management/student-details");
    } catch (err: any) {
      console.log("Errorrr:::: ", err as string);
      showErrorToast(err.message || "An error occurred", 'Login Failed');
    } finally {
      // Ensure loading state is reset whether operation succeeds or fails
      setIsLoading(false);
      setIsSubmitting(false);
    }
  };


  // const onSubmit = async (data: { email: string; password: string }) => {
  //   setIsSubmitting(true);
  //   try {
  //     setIsLoading(true);
  //     // Log the raw response for debugging
  //     const response = await userService_POSTGRES.signIn(data);
  //     console.log("Raw signIn response:", response);
  
  //     // Fallback or conditional check for undefined data
      // if (!response || !response.message || !response.data || !response.session) {
      //   throw new Error("Invalid response structure from signIn");
      // }
  
  //     const userId = response.data?.session.userId;
  //     const GetUserImageResponse: UserImageProps = await userService_POSTGRES.fetchUserImage(userId);
  //     console.log("User Image Object::", GetUserImageResponse);
  //     setImageUrl(GetUserImageResponse.imageUrl);
  //     setSession(response.data?.session);
  //     setIsLoggedIn(true);
  //     showSuccessToast(response.data?.message, `Welcome ${response.data?.session.firstname}!`);
  //     router.push("/myadmin/user-management/student-details");
  //   } catch (err: any) {
  //     console.log("Errorrr:::: ", err);
  //     showErrorToast(err.message || "An error occurred", 'Login Failed');
  //   } finally {
  //     setIsLoading(false);
  //     setIsSubmitting(false);
  //   }
  // };
  useEffect(() => {
    setAreYouLoading(true);
    if (session.isLoggedIn) {
      router.push("/myadmin/user-management/student-details");
    } else {
      setAreYouLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (areYouLoading) {
    return (
      <div>
        <RerouteLoader />
      </div>
    );
  }



  return (
   <>
   <LoginForm onSubmit={onSubmit} />
   </>
  );
};

export default LogIn;

