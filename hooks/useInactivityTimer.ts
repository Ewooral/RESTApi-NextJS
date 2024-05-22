import { useEffect, useRef, useState } from "react";
import axios from "axios";
import userStore from "@/store";
import { useRouter } from "next/navigation";

const useInactivityTimer = (logoutTime: number) => {
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [remainingTime, setRemainingTime] = useState<number>(logoutTime);
  const { logOut, isLoggedIn } = userStore();
  const router = useRouter();
  const startTimer = () => {
  if(isLoggedIn){
    logoutTimerRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime <= 1000) {
          try {
            const response = axios.post("/api/v1/auth/postgres/logout");
            logOut();
            // Redirect the user to the login page or home page
            router.push("/sign-in");
            // window.location.href = "/sign-in";
            console.log("Logout Response:", response);
            if (logoutTimerRef.current) clearInterval(logoutTimerRef.current); // Clear the interval
          } catch (error: any) {
            console.error(
              "Logout Error:",
              error.response?.data || error.message
            );
          }
          return 0;
        }
        return prevTime - 1000;
      });
    }, 1000);
  }
  };

  const resetTimer = () => {
    if (logoutTimerRef.current) clearInterval(logoutTimerRef.current);
    if(isLoggedIn){
      setRemainingTime(logoutTime);
      startTimer();
    }
  };

  useEffect(() => {
    startTimer();
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("mousedown", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("scroll", resetTimer);
    window.addEventListener("touchmove", resetTimer);

    return () => {
      if (logoutTimerRef.current) clearInterval(logoutTimerRef.current);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("mousedown", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("scroll", resetTimer);
      window.removeEventListener("touchmove", resetTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return remainingTime;
};

export default useInactivityTimer;
