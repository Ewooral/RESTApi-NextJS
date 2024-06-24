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
import { set } from "date-fns";
import { SideMenuModal } from "../modals/SideMenuModal";
import { useMediaQuery } from "react-responsive";
import { useCssMediaQueries } from "@/hooks/useCssMediaQueries";

type DynamicSidebarProps = {
  sidebarWidth?: string;
};

const SidebarMenu: React.FC<DynamicSidebarProps> = ({ sidebarWidth }) => {
  const { session, open, setOpen, activeLink, setActiveLink } = userStore();
  const [label, setLabel] = useState("");
  const [icon, setIcon] = useState<React.ReactNode | null>(null);
  const { hideAfterLargerScreens } = useCssMediaQueries();

  // State to track which modal is currently active
  const [currentModal, setCurrentModal] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const isClient = useIsClient();
  const pathname = usePathname();

  console.log("current path name", pathname);

  useEffect(() => {
    // Initialize active menu based on the current pathname
    const currentPathname = pathname?.split("/")[1]; // Assuming the pathname format is "/menu/submenu"
    setActiveLink("Student Details"); // Set activeLink to the first part of the pathname or "Student Details" if empty
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once when the component mounts

  useEffect(() => {
    // Load the state from local storage after the component mounts and only if it's not already set to "Student Details"
    const savedActiveLink = localStorage.getItem("activeLink");
    if (savedActiveLink && savedActiveLink !== "Student Details") {
      setActiveLink(savedActiveLink);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Save the state to local storage whenever it changes
    localStorage.setItem("activeLink", activeLink as string);
  }, [activeLink]);

  useEffect(() => {
    if (open.length !== sidebarData.length) {
      // Initialize all items to false
      const initialOpenState = Array(sidebarData.length).fill(false);
      // Set the second item to true if it exists
      if (sidebarData.length >= 2) {
        initialOpenState[1] = true;
      }
      setOpen(initialOpenState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarData, setOpen, open]);

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
    icon?: React.ReactNode
  ) => {
    setActiveLink(label); // Set activeLink to the label of the clicked item
    const actionDetail = {
      action: `clicked `,
      details: href,
    };

    switch (label) {
      case "Add User":
        setIsButtonDisabled(true);
        setCurrentModal("Add User");
        setLabel(label);
        setIcon(icon);
        break;
      case "Edit Profile":
        setIsButtonDisabled(true);

      default:
        setCurrentModal("");
        break;
    }

    try {
      await logUserAction("info", actionDetail, session.firstname);
      router.push(href);
    } catch (error) {
      console.error("Error logging user action:", error);
    }
  };

  useEffect(() => {
    console.log("current modal", currentModal);
    console.log("label:: ", label);
    console.log("icon:: ", icon);
  }, [currentModal, label, icon]);
  return (
    <>
      {session.isLoggedIn && isClient && (
        <div className="">
          {/* {currentModal === "Add User" && (
            <SideMenuModal
            // label={label}
            // icon={icon}
            // isActive={isActive}
            />
          )} */}
          <ul>
            {sidebarData.map((item, index) => {
              const isActive = activeLink === item.label;
              return (
                <li key={index}>
                  <Link href={item.url ? item.url : ""}>
                    <div
                      className={clsx(
                        "flex items-center justify-between py-2 px-4 cursor-pointer",
                        isActive && "bg-blue-500 text-white rounded-r-[31px]",
                        hideAfterLargerScreens && "rounded-r-none"
                      )}
                      onClick={(event) => {
                        item.children.length && handleClick(index);
                        // @ts-ignore
                        handleLinkClick(event, item.label, item.url, item.icon);
                      }}
                    >
                      <div className={clsx("flex items-center")}>
                        {item.icon}
                        {!hideAfterLargerScreens && (
                          <span className="ml-2">{item.label}</span>
                        )}
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
                              <div
                                className={clsx`flex items-center cursor-pointer py-2 px-4
                                 ${
                                   isActive &&
                                   "bg-blue-500 text-white rounded-r-[31px] w-full"
                                 }
                            `}
                                onClick={(event) => {
                                  // @ts-ignore
                                  handleLinkClick(
                                    // @ts-ignore
                                    event,
                                    childItem.label,
                                    childItem.url
                                  );
                                }}
                              >
                                <span className={clsx("",
                                      // hideAfterLargerScreens && "size-2"
                                )}>{childItem.icon}</span>

                                <span
                                  className={clsx(
                                    "ml-2",
                                    hideAfterLargerScreens && "hidden",
                                    
                                  )}
                                >
                                  {childItem.label}
                                </span>
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
      )}
    </>
  );
};
export default SidebarMenu;
