import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";

type AccordionItemProps = {
  title: string;
  content: string;
  icon: ReactNode;
  status?: string;
  imageUrl?: string;
  firstname?: string;
  lastname?: string;
  email?: string;
  className?: string;
};

const UserAccordion: React.FC<AccordionItemProps> = ({
  title,
  content,
  icon,
  status,
  imageUrl,
  firstname,
  lastname,
  email,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  const updateNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    return () => {
      window.removeEventListener("online", updateNetworkStatus);
      window.removeEventListener("offline", updateNetworkStatus);
    };
  }, []);

  return (
    <div className="bg-[#edecec] mb-4 border-b border-[#0000002a] overflow-hidden">
      <div className="flex items-center  p-[1rem] justify-between">
        {/* Profile Picture */}
        <div className="rounded-full">
          <Avatar className="block w-20 h-20">
            <AvatarImage
              src={imageUrl ? imageUrl : "https://i.pravatar.cc/300"}
              alt="Avatar"
              className="rounded-full"
            />
            <AvatarFallback className="rounded-full" />
          </Avatar>
        </div>

        {/* USER'S CREDENTIALS */}
        <div className="flex flex-col items-start ">
          {/* Firstname and lastname */}
          <h2 className="text-2xl font-bold border-b border-[#0000002a]">
            {firstname} {lastname}
          </h2>

          {/* Email */}
          <p className="text-gray-500">{email}</p>

          <div className="flex justify-between items-center w-full">
            {/* USERS STATUS (guest, applicant or student) */}
            <p
              className={clsx`${className}p-1 rounded-md text-xs shadow-sm border-b border-[#0000002a]`}
            >
              {status}
            </p>

            {/* ONLINE OR OFFLINE */}
            <div className="flex justify-between items-center">
              <span className="mr-2 text-xs">
                {isOnline ? "online" : "offline"}
              </span>
              <div className="relative w-3 h-3">
                <div
                  className={`absolute inset-0 rounded-full ${
                    isOnline ? "bg-green-500" : "bg-red-500"
                  }`}
                ></div>
                {isOnline ? (
                  <>
                    <div className={`absolute top-[-6px] right-[-6px]  ripple-green p-2 delay-2000 `}></div>
                    <div className={`absolute top-[-10px] right-[-10px] ripple-green p-3 delay-4000`}></div>
                    {/* <div className="absolute  ripple p-4 delay-3000"></div> */}
                  </>
                ) : (
                  <>
                   <div className={`absolute top-[-6px] right-[-6px]  ripple-red p-2 delay-2000 `}></div>
                    <div className={`absolute top-[-10px] right-[-10px] ripple-red p-3 delay-4000`}></div>
                  </>
                )}
              </div>
            </div>

            {/* ....................... */}
          </div>
        </div>
      </div>

      {/* USER'S INFORMATION TITLE AND CONTENT */}
      <div
        className="px-4 py-3 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center bg-[white] p-2 rounded-tr-2xl font-semibold text-lg">
          {icon as React.ReactNode}
          {title}
        </span>
      </div>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "ease-in max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-2 text-[#00000095]">{content}</div>
      </div>
    </div>
  );
};

export default UserAccordion;

/**
 *  HOW THE ONLINE AND OFFLINE THING WORKS
 *
 * You can use the navigator.onLine property to check if the browser is online or offline. This property returns a boolean
 * value: true for online and false for offline. You can also listen for the online and offline events on the window object
 * to detect when the network status changes
 *
 * In this component, useState is used to create a state variable isOnline that tracks the current network status. useEffect
 * is used to add event listeners for the online and offline events when the component mounts, and to remove them when the
 * component unmounts. The updateNetworkStatus function updates isOnline based on navigator.onLine whenever the network status
 * changes.
 */
