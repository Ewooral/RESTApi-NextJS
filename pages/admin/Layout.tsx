"use client";
import withAuth from "@/components/HigherOrderComponent";
import AdminLeftSidebar from "./AdminLeftSidebar";
import AdminHeader from "./AdminHeader";
import { Toaster } from "@/components/ui/toaster"

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout:React.FC<LayoutProps> = ({ children }) =>{
  return (
    <div className="flex  h-screen bg-[#fafafa]">
      <AdminLeftSidebar  />

      <div className="flex-1 text-sm ">
      <AdminHeader />
      <Toaster />
        {children}
      </div>
    </div>
  );
}

export default withAuth(Layout);
