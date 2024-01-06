import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "../contexts/authContext"; // import the AuthProvider
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex justify-around items-center text- py-1">
            <section className="flex items-center">
              <Avatar className="mr-2 w-7 h-7">
                <AvatarImage src="/copLogo.jpg" alt="avatar" />
                <AvatarFallback>PU</AvatarFallback>
              </Avatar>
              <h4 className="font-bold text-blue-500">PENTECOST UNIVERSITY</h4>
            </section>
            <section className="flex flex-col items-center justify-center">
              <h1 className="font-bold text-blue-500">
                Student Management and Automation System
              </h1>
            </section>
          </div>{" "}
          {/* Wrap the children with AuthProvider */}
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
