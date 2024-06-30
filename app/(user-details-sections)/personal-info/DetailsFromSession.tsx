import React from 'react';
import clsx from 'clsx';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@radix-ui/react-tooltip';

type UserDetailsFromSessionProps = {
  session: {
    userId: string;
    role: string;
    status: string;
    firstname: string;
    lastname: string;
    email: string;
    
  };
  formattedExpiryTime: string;
};
const UserDetailsFromSession:React.FC<UserDetailsFromSessionProps> = ({ session, formattedExpiryTime }) => {
  return (
    <div className="flex flex-col justify-center items-start gap-4 p-4">
      <h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                Student ID:{" "}
                <span className="bg-[#e2e2e2] rounded-md p-1 cursor-pointer">
                  {session.userId.length > 20
                    ? `${session.userId.slice(0, 20)} ...`
                    : session.userId}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{session.userId}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h2>
      <h2>
        Role:{" "}
        <span className="bg-[#a8a80745] text-[#585817] p-1 rounded-lg">
          {session.role}
        </span>
      </h2>
      <h2>
        Status:{" "}
        <span
          className={clsx(
            "p-1 rounded-lg",
            session.status === "Inactive" && "bg-[#80000052] text-[#501212]",
            session.status === "Active" && "bg-[#0080002c] text-[#125012]",
            session.status === "Pending" && "bg-[#6200802c] text-[#620080]"
          )}
        >
          {session.status}
        </span>
      </h2>
      <h2>
        First Name:{" "}
        <span className="bg-[#e2e2e2] rounded-md p-1">
          {session.firstname}
        </span>
      </h2>
      <h2>
        Last Name:{" "}
        <span className="bg-[#e2e2e2] rounded-md p-1">
          {session.lastname}
        </span>
      </h2>
      <h2>
        Email:{" "}
        <span className="text-[#153464] bg-[#3b83f63b] p-1 rounded-lg">
          {session.email}
        </span>
      </h2>
      <h2>
        Expiry Time:{" "}
        <span className="text-[#153464] bg-[#3b83f63b] p-1 rounded-lg">
          {formattedExpiryTime}
        </span>
      </h2>
    </div>
  );
};

export default UserDetailsFromSession;