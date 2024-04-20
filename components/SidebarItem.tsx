// SidebarItem.tsx

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

type SidebarItemProps = {
  id: string;
  name: string;
  icon: JSX.Element;
  href: string;
  activeLink: string;
  isCollapsed: boolean
  onClick: (
    event: React.MouseEvent<HTMLAnchorElement>,
    id: string,
    href: string
  ) => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  id,
  name,
  icon,
  href,
  activeLink,
  onClick,
  isCollapsed
}) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <div
    //   @ts-ignore
        onClick={(event) => onClick(event, id, href)}
        className={`relative block py-1 px-1 rounded transition duration-200 hover:bg-blue-500 
        hover:text-white ${activeLink === id && "bg-blue-500 text-white w-full"} 
        ${isActive && "bg-blue-500 text-white"}`}
      >
        {icon}
        {name && !isCollapsed && <span className="ml-2">{name}</span>}
        {name === "Notifications" && (
          <div className="absolute top-[2px] right-[8px] inline-flex items-center justify-center 
          w-3 h-3 text-[9px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2
        bg-red-600 rounded-full">
            0 {/* Assuming notificationCount is not used in SidebarItem */}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SidebarItem;
