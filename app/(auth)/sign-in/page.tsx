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
import { userService_POSTGRES } from "@/services/userService";
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
      // @ts-ignore
      const response: UserResponseProps = await userService_POSTGRES.signIn(data);
      const userId = response?.data.session.userId;
      const GetUserImageResponse: UserImageProps = await userService_POSTGRES.fetchUserImage(userId);
      console.log("User Image Object::", GetUserImageResponse);
      setImageUrl(GetUserImageResponse.imageUrl);
      setSession(response?.data.session);
      setIsLoggedIn(true);
      showSuccessToast(response?.data.message, `Welcome ${response?.data.session.firstname}!`);
        router.push("/myadmin/user-management/student-details");
    } catch (err: any) {
      console.log("Errorrr:::: ", err as string);
      
      showErrorToast(err.error, 'Login Failed');
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

