import { useState } from "react";
import Link from "next/link";
import logout from "@/components/LogOut";
import userStore from "@/store";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import MarkUnreadChatAltOutlinedIcon from '@mui/icons-material/MarkUnreadChatAltOutlined';
import clsx from "clsx";
export const AdminLeftSidebar = () => {
  const { logOut } = userStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeLink, setActiveLink] = useState(0);

  const listObj = [
    {
      name: "Home",
      icon: <AddHomeOutlinedIcon />,
      href: "/home"
    },
    {
      name: "Users",
      icon: <AccountCircleOutlinedIcon />,
      href: "/admin/users"
    },
    {
      name: "Settings",
      icon: <SettingsSuggestOutlinedIcon />,
      href: "/settings"
    },
    {
      name: "Logout",
      icon: <LogoutOutlinedIcon />,
      href: "#"
    },
  ];
  


  function handleLogout() {
    logout();
    logOut();
  }

  const sidebarWidth = isCollapsed ? "w-12" : "w-40";
  const Logo = isCollapsed ? "" : "Logo";

  return (
    <div className="relative">
      <aside
        className={clsx` bg-[whitesmoke] rounded shadow-lg transition-all duration-500 
        ease-in-out ${sidebarWidth} md:${sidebarWidth} h-full overflow-auto py-1 mr-1
        ${sidebarWidth === "w-40" ? "px-5" : "p-[0.45rem]"}
        `}
      >
        <h2 className="text-xl font-semibold text-gray-800">{Logo}</h2>
        <nav className="space-y-2  mt-[3.25rem] w-fit text-xs">
          {listObj.map((item, id) => (
            <Link
              key={id}
              href={item.href}
              onClick={() => setActiveLink(id)}
              className={clsx`block py-1 px-1 rounded transition duration-200 hover:bg-blue-500 hover:text-white
                ${activeLink === id && "bg-blue-500 text-white"}
              `}
            >
                {isCollapsed ? item.icon : item.name}
            </Link>
            ))}
        </nav>
      </aside>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute right-0 top-60 mt-4 mr-4"
      >
        {isCollapsed ? <ArrowCircleRightOutlinedIcon /> : <ArrowCircleLeftOutlinedIcon />}
      </button>
    </div>
  );
};

export default AdminLeftSidebar;
