"use client";
import Header from "@/components/Header";
import Link from "next/link";
import withAuth from "@/components/HigherOrderComponent";
import logout from "@/components/LogOut";
import { LeftSidebar } from "@/components/sidebars/LeftSidebar";

interface LayoutProps {
  children?: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const leftSideWidth = 17.78;
  const rightSideWidth = 100 - leftSideWidth;
  return (
    <div className="flex  h-screen bg-[#e3e0e0]">
      <LeftSidebar  />

      <div className="flex-1 text-sm ">
      <Header />

        <span> Content goes here...</span>
        {children}
      </div>
    </div>
  );
}

export default withAuth(Layout);
