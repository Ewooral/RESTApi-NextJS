// AdminLeftSidebar.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import userStore from "@/store";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { useRouter } from "next/router";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import SidebarItem from "@/components/SidebarItem";
import logUserAction from "@/lib/logUserAction";
import { useIsClient } from "@/hooks/useIsClient";
import Image from "next/image";
import gsap from "gsap";
import { listObj } from "@/data/data";
import { Skeleton } from "@/components/ui/skeleton";
import DynamicSidebar from "@/components/sidebars/DynamicSidebar";

type CollapsedProps = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

export const AdminLeftSidebar = ({
  isCollapsed,
  setIsCollapsed,
}: CollapsedProps) => {
  const sidebarRef = useRef(null);
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      let sidebarWidth;
      if (isCollapsed) {
        sidebarWidth = "65px"; // Set collapsed width
      } else {
        // Set width based on screen breakpoints
        if (screenWidth < 640) {
          sidebarWidth = "200px";
        } else if (screenWidth < 768) {
          sidebarWidth = "300px";
        } else if (screenWidth < 1024) {
          sidebarWidth = "75px";
        } else {
          sidebarWidth = "220px";
        }
      }

      gsap.to(sidebarRef.current, { width: sidebarWidth, duration: 0.3 });
    };

    handleResize(); // Initial call
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed]); // Listen for changes in isCollapsed prop

  const { logOut, notificationCount, session } = userStore();
  const [activeLink, setActiveLink] = useState("dashboard");
  const [imageLoaded, setImageLoaded] = useState(false)

  const router = useRouter();
  const isClient = useIsClient();

  const handleLinkClick = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string
  ) => {
    setActiveLink(id);
    const actionDetail = {
      action: `clicked `,
      details: href,
    };

    try {
      await logUserAction("info", actionDetail, session.firstname);
      router.push(href);
    } catch (error) {
      console.error("Error logging user action:", error);
    }
  };
  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  const Logo =  "https://res.cloudinary.com/dn1lqngds/image/upload/v1713170052/uploads/pente-removebg-preview.png.png";
  return (
    <>
      {session.isLoggedIn && isClient && (
        <aside
          ref={sidebarRef}
          className={`fixed flex flex-col justify-between top-0 left-0 mt-[3.8rem]
          bg-[#fff] text-[black] transition-all duration-300 ease-in-out gap-3
          overflow-auto z-50 border-[#1e1e1e] m-lauto mr-auto
          ${isCollapsed ? "items-center" : "items-start"}
          `}
          style={{ height: "calc(100vh - 60px)" }}
        >
          <div 
          // style={{borderRight:'6px solid #3b82f6'}}
          className={`flex flex-col border-r-[6px] border-[#3b82f6] flex-grow-0 ${isCollapsed ? "items-center" : "items-start"} bg-[#bbb]  w-full`}>
          {!imageLoaded && <Skeleton className="w-[35px] h-[35px] p-2 bg-black rounded-full" />}
              <Image
                className="profile-avatar h-[60px] w-[60px] p-2"
                src={Logo}
                alt="image"
                width={200}
                height={200}
                onLoad={handleImageLoad}
                style={{ display: imageLoaded ? 'block' : 'none' }}
 
              />

            <div className="border-b-2 border-[#d1d1d1] w-full"></div>
          </div>
          {/* <nav className={`flex flex-col flex-grow ${isCollapsed ? "items-center" : "items-start"} gap-2 space-y-2  w-full text-xs p-2 `}>
            {listObj.map((item) => (
              <SidebarItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                name={item.name}
                href={item.href}
                activeLink={activeLink}
                onClick={handleLinkClick}
                isCollapsed={isCollapsed}
              />
            ))}
          </nav> */}
           <DynamicSidebar />
         
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`sticky flex flex-col ${isCollapsed ? "items-center" : "items-start"} 
            flex-grow-0 bg-[#bbb] w-full right-[0rem] 
            top-[50rem] mt-4 p-2`}
          >
            {isCollapsed ? (
              <ArrowForwardIosIcon
                className="h-5 w-5 text-[#000]"
                aria-hidden="true"
              />
            ) : (
              <ArrowBackIosNewIcon
                className="h-5 w-5 text-[#000]"
                aria-hidden="true"
              />
            )}
          </button>
        </aside>
      )}
    </>
  );
};

export default AdminLeftSidebar;
