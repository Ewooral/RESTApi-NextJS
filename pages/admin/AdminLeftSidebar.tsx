import { useState } from "react";
import Link from "next/link";
import logout from "@/components/LogOut";
import userStore from "@/store";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import clsx from "clsx";
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { ArrowRightCircle, ArrowRightCircleIcon, Bell } from "lucide-react";
import BellAlertIcon from "@mui/icons-material/NotificationsOutlined";
export const AdminLeftSidebar = () => {
  const { logOut, notificationCount } = userStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const listObj = [
    {
      name: "Home",
      icon: <AddHomeOutlinedIcon />,
      href: "/admin",
    },
    {
      name: "Users",
      icon: <AccountCircleOutlinedIcon />,
      href: "/admin/table",
    },
    {
      name: "Settings",
      icon: <SettingsSuggestOutlinedIcon />,
      href: "",
    },
    {
      name: "Notifications",
      icon: <BellAlertIcon />,
      href: "/notification",
    },
    {
      name: "upload-csv",
      icon: <ArrowUpTrayIcon />,
      href: "/admin/upload-csv",
    },
  ];

  function handleLogout() {
    logout();
    logOut();
  }

  const sidebarWidth = isCollapsed ? "w-12" : "w-40";
  const Logo = isCollapsed ? "cop" : "Pentecost University";

  return (
    <div className="fixed top-0 left-0 h-screen z-50">
      <aside
        className={clsx` bg-[#000000e6] text-[wheat] shadow-lg transition-all  duration-500  
        ease-in-out ${sidebarWidth} md:${sidebarWidth} h-full overflow-auto py-1 mr-1 z-50 rounded-tr-[25px] border-[#1e1e1e]
        ${sidebarWidth === "w-40" ? "px-5" : "p-[0.45rem]"}
        `}
      >
        <h2 className="text-xl font-semibold text-[wheat] mt-[1rem] w-full">
          {Logo}
        </h2>
        <hr className="my-2" />
        <nav className="space-y-2  mt-[3.25rem] w-fit text-xs">
          {listObj.map((item, id) => (
            <Link
              key={id}
              href={item.href}
              onClick={() => setActiveLink(id)}
              className={clsx`relative block py-1 px-1 rounded transition duration-200 hover:bg-blue-500 hover:text-white
                ${activeLink === id && "bg-blue-500 text-white"}
              `}
            >
              {isCollapsed ? item.icon : item.name}
              {item.name === "Notifications" && (
                <div
                  className="absolute top-[2px] right-[8px] inline-flex items-center justify-center w-3 h-3 text-[9px] 
    font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
                >
                  {notificationCount}
                </div>
              )}{" "}
            </Link>
          ))}
        </nav>
      </aside>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-[-26px] top-60 mt-4 mr-4"
      >
        {isCollapsed ? (
          <ArrowLeftCircleIcon
            className="h-5 w-5 text-[#000000]"
            aria-hidden="true"
          />
        ) : (
          <ArrowRightCircleIcon
            className="h-5 w-5 text-[#000000]"
            aria-hidden="true"
          />
        )}
      </button>
    </div>
  );
};

export default AdminLeftSidebar;
