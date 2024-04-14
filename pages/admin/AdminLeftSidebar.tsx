'use client'
import {useState} from "react";
import Link from "next/link";
import userStore from "@/store";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";

import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

import clsx from "clsx";
import {
    ArrowLeftCircleIcon,
    ArrowLeftIcon,
    ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import BellAlertIcon from "@mui/icons-material/NotificationsOutlined";
import {useIsClient} from "@/hooks/useIsClient";
import logUserAction from "@/lib/logUserAction";


type CollapsedProps = {
    isCollapsed: boolean
    setIsCollapsed: (isCollapsed: boolean) => void
}
export const AdminLeftSidebar = ({isCollapsed, setIsCollapsed}: CollapsedProps) => {
    const {logOut, notificationCount, session} = userStore();
    const [activeLink, setActiveLink] = useState(0);
const isClient = useIsClient()

    const listObj = [
        {
            name: "Dashboard",
            icon: <AddHomeOutlinedIcon/>,
            href: "/admin/dashb",
        },
        {
            name: "Users",
            icon: <AccountCircleOutlinedIcon/>,
            href: "/admin/table",
        },
        {
            name: "Settings",
            icon: <SettingsSuggestOutlinedIcon/>,
            href: "",
        },
        {
            name: "Notifications",
            icon: <BellAlertIcon/>,
            href: "/notification",
        },
        {
            name: "upload-csv",
            icon: <ArrowUpTrayIcon/>,
            href: "/admin/upload-csv",
        },
    ];

    const handleLinkClick = async (event: React.MouseEvent<HTMLAnchorElement>, id: number, href: string) => {
        event.preventDefault();
        setActiveLink(id);
        // const actionDetail = `clicked on ${href} link`;
        const actionDetail = {
            action: `clicked `,
            details: href,

        };
        try {
            await logUserAction('info', actionDetail, session.firstname);
        } catch (error) {
            console.error('Error logging user action:', error);
        }
    };


    const sidebarWidth = isCollapsed ? "w-20" : "w-50";
    const Logo = isCollapsed ? "PU" : "Pentecost University";

    return (
        <>
            {
                session.isAdmin &&  isClient && (
                    <div className="fixed top-0 left-0 h-screen z-50 mt-[4.5rem]">
                        <aside
                            className={clsx` bg-[#fff] text-[black] shadow-lg transition-all  duration-300  
        ease-in-out ${sidebarWidth} md:${sidebarWidth} h-full overflow-auto py-1 mr-1 z-50 border-[#1e1e1e]
        ${sidebarWidth === "w-50" ? "px-5" : "p-[1.6rem]"}
        `}
                        >
                            <h2 className="text-xl font-semibold text-[black] mt-[1rem] w-full">
                                {Logo}
                            </h2>
                            <hr className="my-2"/>
                            <nav className="space-y-2  mt-[3.25rem] w-fit text-xs">
                                {listObj.map((item, id) => (
                                    <Link
                                        key={id}
                                        href={item.href}
                                        onClick={(event) => handleLinkClick(event, id, item.href)}
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
                            className="absolute right-[0rem] top-[50rem] mt-4 mr-4"
                        >
                            {isCollapsed ? (
                                <ArrowCircleRightIcon
                                    className="h-5 w-5 text-[#000]"
                                    aria-hidden="true"
                                />
                            ) : (
                                <ArrowCircleLeftIcon
                                    className="h-5 w-5 text-[#000]"
                                    aria-hidden="true"
                                />
                            )}
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default AdminLeftSidebar;
