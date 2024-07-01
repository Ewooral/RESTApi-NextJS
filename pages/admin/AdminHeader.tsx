"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import clsx from "clsx";
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";
import { BellIcon } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import axios from "axios";
import Link from "next/link";
import LogoutForm from "@/components/LogOut";
import userStore from "@/store";
import { useIsClient } from "@/hooks/useIsClient";
import { useIsOnline } from "@/hooks/useIsOnline";
import useInactivityTimer from "@/hooks/useInactivityTimer";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { ClockIcon } from "@heroicons/react/24/outline";
import { UserImagePlaceholder } from "@/data/data";
import { formatDistanceToNow } from "date-fns";
// import useInternetConnectivity from "@/hooks/useInternetConnectivity";
import { useCustomToast } from "@/hooks/useToast";
import { FaCashRegister, FaCircleArrowDown } from "react-icons/fa6";
import { FaArrowCircleUp } from "react-icons/fa";
import { RiMenuFold2Fill } from "react-icons/ri";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";
import { LuMenu } from "react-icons/lu";
import DynamicButton from "@/components/CustomButton";
import { AiOutlineLogin } from "react-icons/ai";

function AdminHeader() {
  // const userIsOnline = useInternetConnectivity()
  // const prevUserIsOnlineRef = useRef(userIsOnline);
  const isClient = useIsClient();
  const { session, imageUrl, setImageUrl, lastSeenTimes } = userStore();
  const [imageLoaded, setImageLoaded] = useState(false);
  // const isOnline = useIsOnline();
  const logoutTime = 15 * 60 * 1000; // 15 minutes
  const remainingTime = useInactivityTimer(logoutTime);
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const [showProfile, setShowProfile] = useState(false);
  const { showAfterMedium, hideAfterMedium, hideAfterLargerScreens } =
    useCssMediaQueries();

  const [lastSeenTime, setLastSeenTime] = useState<Date | null>(null); // Time when user went offline

  // Function to format "last seen" message dynamically
  const getLastSeenMessage = () => {
    if (lastSeenTime) {
      return `Last seen ${formatDistanceToNow(new Date(lastSeenTime), {
        addSuffix: true,
      })}`;
    } else {
      return "";
    }
  };

  const toggleProfileDropdown = () => {
    setShowProfile(!showProfile);
  };

  useEffect(() => {
    console.log("Image URL", imageUrl);
    if (imageUrl) {
      setImageLoaded(true);
    }
  }, [imageUrl]);

  // useEffect(() => {
  //   if (prevUserIsOnlineRef.current !== userIsOnline) {
  //     if (userIsOnline) {
  //       showSuccessToast('', 'Connection is On!');
  //     } else {
  //       showErrorToast('', 'Connection is Off!');
  //     }
  //   }
  //   // Update the ref to the current value
  //   prevUserIsOnlineRef.current = userIsOnline;
  // }, [userIsOnline, showSuccessToast, showErrorToast, session.firstname]);

  // ...

  return (
    <>
      {isClient && (
        <nav
          className={clsx(
            "fixed w-full flex justify-between items-center bg-[white]",
            "drop-shadow-sm px-5 py-3 z-50  border-[#1e1e1e]]",
            hideAfterLargerScreens && ""
          )}
        >
          {/*LEFT SECTION - LOGO */}
          <section>
            {/* <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} /> */}
            <Link href="/">
              <div className="flex justify-between items-center p-1 rounded-md font-extrabold text-lg ">
                <span className="text-lgtext-[#000000]">
                  Pentecost University
                </span>
                {/* <Image
                className="profile-avatar h-[40px] w-[40px]  mx-4 "
                src={
                  "https://res.cloudinary.com/dn1lqngds/image/upload/v1713170052/uploads/pente-removebg-preview.png.png"
                }
                alt="image"
                width={200}
                height={200}
              /> */}
              </div>
            </Link>
          </section>

          {/* RIGHT SECTION */}
          <section className="flex items-center justify-center relative">
            {hideAfterMedium && (
              <>
                {/* MESSAGE ICON */}
                {session.isLoggedIn && (
                  <div
                    className={`bg-[#c1bdbd] p-2 rounded-[50%] mr-4 hover:bg-[#454545] transition-colors duration-200`}
                  >
                    <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-[black] hover:text-white transform transition-transform duration-200 ease-in-out active:scale-95" />
                  </div>
                )}

                {/* NOTIFICATION ICON */}
                {session.isLoggedIn && (
                  <div
                    className={`relative bg-[#c1bdbd] p-2 rounded-[50%] hover:bg-[#454545] transition-colors duration-200`}
                  >
                    <BellIcon className="h-5 w-5 text-black hover:text-white transform transition-transform duration-200 ease-in-out" />
                    <div
                      className="absolute top-0 right-0 inline-flex items-center justify-center w-auto h-auto p-1  text-[9px]
                  font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                    >
                      <p>{22}</p>
                    </div>
                  </div>
                )}
                {/* PROFILE ICON */}
                {session.isLoggedIn && (
                  <div className="relative">
                    <Image
                      className="profile-avatar h-[40px] w-[40px] mx-4 cursor-pointer"
                      src={
                        session.imageUrl
                          ? session.imageUrl
                          : imageUrl
                          ? imageUrl
                          : "/placeholder.png"
                      }
                      alt="image"
                      width={200}
                      height={200}
                    />
                  </div>
                )}
              </>
            )}
            {/* LOGIN */}
            {!session.isLoggedIn && (
              <>
                <Link href="/sign-in">
                  <DynamicButton
                    className="text-white mx-2"
                    label="Sign in"
                    icon={<AiOutlineLogin className="size-3" />}
                    type="button"
                  />
                </Link>
              </>
            )}

            {/* REGISTER */}
            {!session.isLoggedIn && (
              <>
                <Link href="/sign-up">
                  <DynamicButton
                    className="text-white"
                    label="Sign up"
                    icon={<FaCashRegister className="size-3" />}
                    type="button"
                  />
                </Link>
              </>
            )}

            {/* USER NAMES */}
            {hideAfterMedium && (
              <>
                {session.isLoggedIn && (
                  <section className="flex">
                    <div className="flex flex-col justify-center items-start">
                      <span className="text-xs text-gray-800 font-extrabold">
                        {session.firstname} {session.lastname}
                      </span>
                      <span
                        className={clsx`${
                          session.isAdmin && "text-[#4daa57]"
                        } relative text-[10px]  text-gray-800 `}
                      >
                        {/* {userIsOnline ? 'Online' : 'Offline'} */}
                        {session.role}
                        {/* {userIsOnline ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-[9px] w-[9px] rounded-full bg-[#4daa57] opacity-100"></span>
                      <span className="absolute inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </>
                  ) : (
                    <>
                      <span className="animate-ping absolute inline-flex h-[9px] w-[9px] rounded-full bg-red-400 opacity-100"></span>
                      <span className="absolute inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </>
                  )} */}
                      </span>
                    </div>
                  </section>
                )}
              </>
            )}

            {/* DROP DOWN ARROW */}
            <>
              {session.isLoggedIn && (
                <div
                  className="cursor-pointer mx-4"
                  onClick={toggleProfileDropdown}
                >
                  {showProfile ? (
                    <FaCircleArrowDown className="size-5 text-black" />
                  ) : (
                    <FaArrowCircleUp className="size-5 text-black" />
                  )}

                  {showProfile && (
                    <div className="absolute right-0 top-full bg-white text-xs border border-gray-300 rounded-md shadow-lg mt-1 z-10">
                      {/* Header */}
                      <div className="bg-gray-200 px-4 py-2 rounded-t-md">
                        <Link
                          href="/myadmin/user-management/student-details"
                          className="text-sm font-medium text-gray-800"
                        >
                          Profile
                        </Link>
                      </div>
                      {/* dashboard */}
                      <div className="bg-gray-200 px-4 py-2 rounded-t-md">
                        <Link
                          href="/myadmin/dashboard"
                          className="text-sm font-medium text-gray-800"
                        >
                          Dashboard
                        </Link>
                      </div>
                      {/* Body */}
                      <div className="py-1">
                        <Link href="/settings">
                          <span className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition duration-200">
                            Settings
                          </span>
                        </Link>
                      </div>
                      {/* Footer */}
                      <div className="bg-gray-200 px-4 py-2 rounded-b-md">
                        <LogoutForm />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
            {!hideAfterMedium && (
              <div className="mx-4">
                <LuMenu className="size-7 text-black" />
              </div>
            )}
          </section>
        </nav>
      )}
      {remainingTime > 0 && remainingTime <= 15 * 1000 && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 text-white flex items-center justify-center z-50">
          <div className="flex flex-col items-center space-y-4">
            {/* <HourglassEmptyIcon style={{ fontSize: 80 }} /> */}
            <ClockIcon className="h-20 w-20" />
            <div className="text-2xl">{`Logging out in ${
              remainingTime / 1000
            } seconds...`}</div>
            <div className="relative w-40 h-40 border-2 border-white rounded-full">
              {" "}
              {/* Create a circular div for the timer */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl">
                {remainingTime / 1000}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminHeader;
//Proton vpn zSuuXM>vedJA=Dvq
