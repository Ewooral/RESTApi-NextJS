"use client";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/authContext"; // import the AuthProvider
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import Header from "./content/header";
import Sidebar from "./content/leftsidebar";
import SearchBar from "./content/searchBar";
import userStore from "@/store";
import { metadata } from "@/metadata";
import React from "react";
import LeftSidebarB from "@/components/LeftSidebarB";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { postgresUser } = userStore();
  const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);
  return (
    <AuthProvider>
      {/* Wrap the children with AuthProvider */}
      <Toaster />
      <Header />
      <SearchBar />
      {/* <LeftSidebarB /> */}
      {
        isClient && (
          //@ts-ignore
            <Sidebar username={postgresUser.firstname} />
        )
      }
      <div className="mt-[3.5rem]">{children}</div>
    </AuthProvider>
  );
}
