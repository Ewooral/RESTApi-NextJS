// import Cookies from 'js-cookie';

// const logout = () => {
//     Cookies.remove('token');
//     // Redirect the user to the login page or home page
//     window.location.href = '/login';
//   };

// export default logout

"use client";
import userStore from "@/store";
import axios from "axios";
import { useRouter } from "next/navigation";

const LogoutForm = () => {
  const {logOut} = userStore()
  const router = useRouter();
  const logoutHandler = async () => {
    try {
      const response = await axios.post("/api/auth/postgres/logout");
      logOut();
      // Redirect the user to the login page or home page
      router.push("/sign-in");
      // window.location.href = "/sign-in";
      console.log("Logout Response:", response.data);
    } catch (error: any) {
      console.error("Logout Error:", error.response?.data || error.message);
    }
  };

  return <p className="text-sm font-medium text-gray-800" onClick={logoutHandler}>Logout</p>;
};

export default LogoutForm;
