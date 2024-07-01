// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "../contexts/authContext"; // import the AuthProvider
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from "./profile/content/header";
import AdminHeader from "@/pages/admin/AdminHeader";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "ag-grid-community/styles/ag-theme-balham.css";
// import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Automated School Management system",
  description: "Developed by Elijah Owusu Boahen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Automated School Management system" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Automated School Management system</title>
      </head> */}
      <body className={inter.className}>
        <AuthProvider>
          {/* Wrap the children with AuthProvider */}
          {/* <Header /> */}
          {/* {pathname === "/" ? null : <AdminHeader />} */}
          <AdminHeader />
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
