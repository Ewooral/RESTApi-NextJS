"use client";
import Image from "next/image";
import clsx from "clsx";
import {ChatBubbleLeftEllipsisIcon} from "@heroicons/react/24/outline";
import {BellIcon} from "lucide-react";
import {Avatar} from "@/components/ui/avatar";
import axios from "axios";
// import LogoutForm from "@/components/LogOut";
import {getSession} from "@/lib/sessionManager";
import Link from "next/link";
import LogoutForm from "@/components/LogOut";
import userStore from "@/store";
import {useEffect, useState} from "react";

function AdminHeader() {
    const {session} = userStore();
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    const user = {
        imageName: "/uploads/images.jpg",
    };

    return (
        <>
            {
                isClient && (
                    <nav
                        className={clsx`fixed w-full flex justify-between items-center bg-[white] 
      drop-shadow-sm px-5 py-1 z-50  border-[#1e1e1e]]`}
                    >
                        {/*LEFT SECTION - LOGO */}
                        <section>
                            {/* <Image src="/path/to/logo.png" alt="Logo" width={50} height={50} /> */}
                            <Link href="/">
                                <div className="flex justify-between items-center p-1 rounded-md font-extrabold text-2xl">
                                    <span className="text-[#000000]">COP</span>
                                    <Image
                                        className="profile-avatar mx-4"
                                        src={
                                            "/copLogo.jpg"
                                        }
                                        alt="image"
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </Link>
                        </section>

                        {/* RIGHT SECTION */}
                        <section className="flex items-center justify-center relative">
                            {/* MESSAGE ICON */}
                            {session.isLoggedIn && (
                                <div
                                    className={`bg-[#c1bdbd] p-2 rounded-[50%] mr-4 hover:bg-[#454545] transition-colors duration-200`}
                                >
                                    <ChatBubbleLeftEllipsisIcon
                                        className="h-5 w-5 text-[black] hover:text-white transform transition-transform duration-200 ease-in-out active:scale-95"/>
                                </div>
                            )}

                            {/* NOTIFICATION ICON */}
                            {session.isLoggedIn && (
                                <div
                                    className={`relative bg-[#c1bdbd] p-2 rounded-[50%] hover:bg-[#454545] transition-colors duration-200`}
                                >
                                    <BellIcon
                                        className="h-5 w-5 text-black hover:text-white transform transition-transform duration-200 ease-in-out"/>
                                    <div
                                        className="absolute top-0 right-0 inline-flex items-center justify-center w-3 h-3 text-[9px]
                    font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                                    >
                                        {/* {notificationCount} */}0
                                    </div>
                                </div>
                            )}
                            {/* PROFILE ICON */}
                            {session.isLoggedIn && (
                                <Image
                                    className="profile-avatar mx-4"
                                    src={
                                        user.imageName ? user.imageName : "/uploads/images.jpg" // default image
                                    }
                                    alt="image"
                                    width={200}
                                    height={200}
                                />
                            )}

                            {/* LOGIN */}
                            {!session.isLoggedIn && (
                                <section
                                    className="mx-2 bg-black hover:bg-[#0000008f] text-white font-bold py-2 text-xs px-4 rounded-3xl focus:outline-none focus:shadow-outline">
                                    <Link href="/sign-in">Login</Link>
                                </section>
                            )}

                            {/* REGISTER */}
                            {!session.isLoggedIn && (
                                <section
                                    className="mx-2 bg-black hover:bg-[#0000008f] text-white font-bold py-2 text-xs px-4 rounded-3xl focus:outline-none focus:shadow-outline">
                                    <Link href="/sign-up">Register</Link>
                                </section>
                            )}

                            {/* USER NAMES */}
                            {session.isLoggedIn && (
                                <section className="flex">
                                    <div className="flex flex-col justify-center items-start">
              <span className="text-xs text-gray-800 font-extrabold">
                {session.firstname} {session.lastname}
              </span>
                                        <span className="text-xs text-gray-800">
                {session.role.toLowerCase()}
              </span>
                                    </div>
                                </section>
                            )}


                            {/*PREMIUM*/}
                            {session.isLoggedIn && (
                                <section
                                    className="mx-2 bg-black hover:bg-[#0000008f] text-white font-bold py-2 text-xs px-4 rounded-3xl focus:outline-none focus:shadow-outline">
                                    <Link href="/premium">Settings</Link>
                                </section>
                            )}

                            {/* LOGOUT  */}
                            {session.isLoggedIn && (
                                <section className="mx-2">
                                    <LogoutForm/>
                                </section>
                            )}
                        </section>
                    </nav>
                )
            }
        </>
    );
}

export default AdminHeader;
