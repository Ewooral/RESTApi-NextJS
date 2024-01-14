// import React, { useState } from "react";
// import { ChevronUpIcon, ChevronDownIcon, HomeIcon, UserGroupIcon, ChartBarIcon, DocumentTextIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
// import Image from "next/image";
// import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

// const Sidebar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const handleSidebarOpen = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">
//         <div className="sidebar-header-left">
//           <Image src="/logo.svg" alt="Logo" width={100} height={100} />
//           <h2>Company Name</h2>
//         </div>
//         <div className="sidebar-header-right">
//           <button onClick={handleSidebarOpen}>
//             {sidebarOpen ? <MinusIcon /> : <PlusIcon />}
//           </button>
//         </div>
//       </div>
//       <div className="sidebar-body">
//       <ul>
//     <li>
//       <a href="#">
//         <HomeIcon className="h-5 w-5" />
//         <span>Dashboard</span>
//       </a>
//     </li>
//     <li>
//       <a href="#">
//         <UserGroupIcon className="h-5 w-5" />
//         <span>My Team</span>
//       </a>
//     </li>
//     <li>
//       <a href="#">
//         <ChartBarIcon className="h-5 w-5" />
//         <span>Progress</span>
//       </a>
//     </li>
//     <li>
//       <a href="#">
//         <DocumentTextIcon className="h-5 w-5" />
//         <span>Data</span>
//       </a>
//     </li>
//     <li>
//       <a href="#">
//         <CurrencyDollarIcon className="h-5 w-5" />
//         <span>Finances</span>
//       </a>
//     </li>
//   </ul>
//       </div>
//       <div className="sidebar-footer">
//         <button>Create Project</button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import {
  MagnifyingGlassCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  WalletIcon,
  BellIcon,
  ChatBubbleBottomCenterIcon,
  PlusCircleIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "#", icon: DocumentTextIcon },
  { name: "My Team", href: "#", icon: UserGroupIcon },
  { name: "Progress", href: "#", icon: ChartBarIcon },
  { name: "Data", href: "#", icon: CurrencyDollarIcon },
  { name: "Finances", href: "#", icon: WalletIcon },
  { name: "Wallet", href: "#", icon: BellIcon },
  { name: "Notification", href: "#", icon: ChatBubbleBottomCenterIcon },
];

export function Sidebar() {
  return (
    <>
      {/* <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r dark:bg-gray-900 dark:border-gray-700"> */}
      <div className="flex flex-row items-center justify-between  dark:bg-gray-900 dark:border-gray-700">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Front-end Dev
        </h2>
        <MagnifyingGlassCircleIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
      </div>
      <div className="mt-10">
        {navigation.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-row items-center p-2 text-base font-medium text-gray-600 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name}
          </a>
        ))}
      </div>
      <div className="flex flex-col mt-auto">
        <button className="flex flex-row items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 rounded-md shadow-sm">
          <PlusCircleIcon className="w-4 h-4 mr-3" />
          Create projects
        </button>
      </div>
      {/* </div> */}
    </>
  );
}

const navigation1 = [
  { name: "Dashboard", href: "#", icon: DocumentTextIcon },
  { name: "My Team", href: "#", icon: UserGroupIcon },
  { name: "Progress", href: "#", icon: ChartBarIcon },
  { name: "Data", href: "#", icon: CurrencyDollarIcon },
  { name: "Finances", href: "#", icon: WalletIcon },
  { name: "Wallet", href: "#", icon: BellIcon },
  { name: "Notification", href: "#", icon: MagnifyingGlassCircleIcon },
];

export function Sidebar2() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="">
      <div className="relative flex flex-row items-center justify-between">
        {/* <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">
          Front-end Dev
        </h2> */}
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute top-[530px] left-[89%]  transform transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </div>
      </div>
      <div className={`mt-10 ${isOpen ? "block" : "hidden"}`}>
        {navigation.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="flex flex-row text-sm items-center p-2 font-medium text-gray-600 rounded-md dark:text-gray-300 dark:hover:bg-gray-700"
          >
            <item.icon className="w-4 h-4 mr-3" />
            {item.name}
          </a>
        ))}
      </div>
      {/* <div className="flex flex-col mt-auto">
        <button
          className="flex flex-row items-center justify-center w-full px-4 py-2 text-base 
        font-medium text-white bg-indigo-600 rounded-md shadow-sm"
        >
          <PlusCircleIcon className="w-4 h-4 mr-3" />
          Create projects
        </button>
      </div> */}
    </div>
  );
}
