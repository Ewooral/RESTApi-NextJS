import { sidebarData } from "@/data/data";
import React, { useState, useEffect } from "react";
import userStore from "@/store";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import logUserAction from "@/lib/logUserAction";
import { useIsClient } from "@/hooks/useIsClient";
import clsx from "clsx";

type DynamicSidebarProps = {
    sidebarWidth?: string;
    // include other props if any
};

const SidebarMenu: React.FC<DynamicSidebarProps> = ({ sidebarWidth }) => {

    // const [open, setOpen] = useState<boolean[]>(
    //     Array(sidebarData.length).fill(false)
    // );
    const {session, open, setOpen, activeLink, setActiveLink} = userStore();
    const router = useRouter();
    const isClient = useIsClient();
    const pathname = usePathname()
    console.log("current path name", pathname)

    useEffect(() => {
        // Initialize active menu based on the current pathname
        const currentPathname = pathname?.split("/")[1]; // Assuming the pathname format is "/menu/submenu"
        setActiveLink(currentPathname || "Dashboard"); // Set activeLink to the first part of the pathname or "Dashboard" if empty
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []); // Run only once when the component mounts
     
      useEffect(() => {
        if (open.length !== sidebarData.length) {
          setOpen(Array(sidebarData.length).fill(false));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [sidebarData, setOpen, open]);



      useEffect(() => {
        // Load the state from local storage after the component mounts
        const savedActiveLink = localStorage.getItem('activeLink');
        if (savedActiveLink) {
          setActiveLink(savedActiveLink);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      
      useEffect(() => {
        // Save the state to local storage whenever it changes
        localStorage.setItem('activeLink', activeLink as string);
      }, [activeLink]);

    const handleClick = (index: number) => {
        const newOpen = [...open];
        newOpen[index] = !open[index];
        setOpen(newOpen);
    };

    console.log("Sidebar Width: ", sidebarWidth);

    const handleLinkClick = async (
        event: React.MouseEvent<HTMLAnchorElement>,
        label: string,
        href: string,
    ) => {
        setActiveLink(label); // Set activeLink to the label of the clicked item
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
    return (
        <>
            {
                session.isLoggedIn && isClient && (
                    <div className="">
                        <ul>
                            {sidebarData.map((item, index) => {
                                const isActive = activeLink === item.label;
                                return (
                                    <li key={index}>
                                        <Link href={item.url ? item.url : ""}>
                                            <div
                                                className={clsx`flex items-center justify-between py-2 px-4 cursor-pointer
                                           ${isActive && "bg-blue-500 text-white rounded-r-[31px]"}
                                          `}
                                                onClick={(event) => {
                                                    item.children.length && handleClick(index);
                                                    // @ts-ignore
                                                    handleLinkClick(event, item.label, item.url);
                                                }}
                                            >
                                                <div className="flex items-center">
                                                    {item.icon}
                                                    <span className="ml-2">{item.label}</span>
                                                </div>
                                                {item.children.length ? (
                                                    open[index] ? (
                                                        <ExpandLessIcon />
                                                    ) : (
                                                        <ExpandMoreIcon />
                                                    )
                                                ) : null}
                                            </div>
                                        </Link>
                                        {item.children.length > 0 && open[index] && (
                                            <ul>
                                                {item.children.map((childItem, childIndex) => {
                                                    const isActive = activeLink === childItem.label;
                                                    return (
                                                        <li key={childIndex} className="pl-8 ">
                                                            <Link href={childItem.url ? childItem.url : ""}>
                                                                <div className={clsx`flex items-center cursor-pointer py-2 px-4
                                 ${isActive && "bg-blue-500 text-white rounded-r-[31px] w-full"}
                            `}
                                                                     onClick={(event) => {
                                                                         // @ts-ignore
                                                                         handleLinkClick(event, childItem.label, childItem.url);
                                                                     }}
                                                                >
                                                                    {childItem.icon}
                                                                    <span className="ml-2">{childItem.label}</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )
            }
        </>
    );
};
export default SidebarMenu;
