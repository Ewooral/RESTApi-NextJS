"use client";
import withAuth from "@/components/HigherOrderComponent";
import AdminLeftSidebar from "./AdminLeftSidebar";
import AdminHeader from "./AdminHeader";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from 'next/router';
import UsersHome from "./users/UsersHome";
interface LayoutProps {
  children?: React.ReactNode
}

const Layout:React.FC<LayoutProps> = ({ children }) =>{

  return (
    <div 
    className="flex  h-screen bg-[#fafafa]">
      <AdminLeftSidebar />

      <div className="flex-1 text-sm pl-[180px]">
      <AdminHeader />
      <Toaster />
       <div className="mt-[60px] p-6">
       {children}
       </div>
      </div>
    </div>
  );
}

export default withAuth(Layout);
