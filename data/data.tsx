import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReceiptIcon from '@mui/icons-material/Receipt';
import EventIcon from '@mui/icons-material/Event';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import React from "react";
import {AcademicCapIcon, UserGroupIcon, WindowIcon, UserMinusIcon, GiftIcon} from "@heroicons/react/24/outline";
import SimpleRadarChart from "@/components/charts/SimpleRadarChart";


export const serviceObjectList = [
    {
        title: "Library Services",
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
        footer: "Read More"
    },
    {
        title: "Counseling Services",
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
        footer: "Read More"
    },
    {
        title: "Sports and Recreation",
        content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
        footer: "Read More"
    },
    // {
    //     title: "Health Services",
    //     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    //     footer: "Read More"
    // },
    // {
    //     title: "Academic Support",
    //     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    //     footer: "Read More"
    // },
    // {
    //     title: "Career Services",
    //     content: "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ",
    //     footer: "Read More"
    // },
    
  ]

export const content = "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore"




export const listObj = [
    {
      id: "dashboard",
      name: "Dashboard",
      icon: <AddHomeOutlinedIcon />,
      href: "/admin/dashb",
    },
    {
      id: "profile",
      name: "Profile",
      icon: <AccountCircleOutlinedIcon />,
      href: "/admin/profile",
    },
    {
      id: "settings",
      name: "Settings",
      icon: <SettingsSuggestOutlinedIcon />,
      href: "/settings",
    },
    {
      id: "notifications",
      name: "Notifications",
      icon: <NotificationsNoneIcon />,
      href: "/notification",
    },
    {
      id: "upload file",
      name: "upload-file",
      icon: <CloudUploadIcon />,
      href: "/upload",
    },
  ];


// Dynamic Sidebar 
export interface SidebarItem {
  label: string;
  icon: JSX.Element;
  url?: string;
  children: SidebarItem[];
  disabled?: boolean;

}

//   {
//     label: 'Dashboard Home',
//     icon: <DashboardIcon />,
//     url: '/admin/dashb',
//     children: [],
//   },
//   {
//     label: 'User Management',
//     icon: <PeopleIcon />,
//     url: '#',
//     children: [
//       {
//         label: 'View Users',
//         icon: <VisibilityIcon />,
//         children: [],
//         url: '/user-management/view-users',
//       },
//       {
//         label: 'Add User',
//         icon: <PersonAddIcon />,
//         children: [],
//         url: '/user-management/add-user',
//       },
//       {
//         label: 'Edit User',
//         icon: <PersonIcon />,
//         children: [],
//         url: '/user-management/edit-user',
//       },
//       {
//         label: 'Reset Password',
//         icon: <LockIcon />,
//         children: [],
//         url: '/user-management/reset-password',
//       },
//       {
//         label: 'Manage Roles',
//         icon: <SupervisorAccountIcon />,
//         children: [],
//         url: '/user-management/manage-roles',
//       },
//     ],
//   },
//   {
//     label: 'Applications',
//     icon: <AssignmentIcon />,
//     url: '#',
//     children: [
//       {
//         label: 'Browse Programs',
//         icon: <AccountBalanceIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Apply to Programs',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Track Application Status',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Submit Documents',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Pay Application Fee',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Communication',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Programs',
//     icon: <AccountBalanceIcon />,
//     children: [
//       {
//         label: 'View All Programs',
//         icon: <AccountBalanceIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Add New Program',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Manage Programs',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Program Analytics',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Documents',
//     icon: <DescriptionIcon />,
//     children: [
//       {
//         label: 'View All Documents',
//         icon: <DescriptionIcon />,
//         url: '/admin/documents',
//         children: [],
//       },
//       {
//         label: 'Upload New Document',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Manage Document Templates',
//         icon: <DescriptionIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Reports & Analytics',
//     icon: <AssignmentIcon />,
//     children: [
//       {
//         label: 'Generate Reports',
//         icon: <AssignmentIcon />,
//         url: '/admin/reports',
//         children: [],
//       },
//       {
//         label: 'Application Trends',
//         icon: <AssignmentIcon />,
//         url: '/admin/trends',
//         children: [],
//       },
//       {
//         label: 'Processing Times',
//         icon: <AssignmentIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Export Data',
//         icon: <AssignmentIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Settings',
//     icon: <SettingsIcon />,
//     children: [
//       {
//         label: 'System Settings',
//         icon: <SettingsIcon />,
//         url: '/settings',
//         children: [],
//       },
//       {
//         label: 'User Management',
//         icon: <SettingsIcon />,
//         url: '/settings/user-management',
//         children: [],
//       },
//       {
//         label: 'Access Control',
//         icon: <SettingsIcon />,
//         url: '/settings/access-control',
//         children: [],
//       },
//       {
//         label: 'Application Form Customization',
//         icon: <SettingsIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Help & Support',
//     icon: <HelpIcon />,
//     children: [
//       {
//         label: 'User Guides',
//         icon: <HelpIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'Contact Support',
//         icon: <HelpIcon />,
//         url: '/help-support',
//         children: [],
//       },
//       {
//         label: 'FAQs',
//         icon: <HelpIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//       {
//         label: 'System Updates',
//         icon: <HelpIcon />,
//         url: '/admin/dashb',
//         children: [],
//       },
//     ],
//   },
//   {
//     label: 'Logout',
//     icon: <ExitToAppIcon />,
//     children: [],
//   },
// ];


// ADMIN LEFT SIDEBAR MENU DATA
export const sidebarData: SidebarItem[] = [
  {
    label: 'Dashboard',
    icon: <DashboardIcon />,
    url: '/myadmin/dashboard',
    children: [],
    disabled: false
  },
  {
    label: 'User Management',
    icon: <PeopleIcon />,
    children: [
      {
        label: 'View Users',
        icon: <VisibilityIcon />,
        children: [],
        url: '/myadmin/user-management/view-users',
      },
      {
        label: 'User Profile',
        icon: <VisibilityIcon />,
        children: [],
        url: '/myadmin/user-management/student-details',
      },
      // {
      //   label: 'Add User',
      //   icon: <PersonAddIcon />,
      //   children: [],
      //   url: '/myadmin/user-management/add-user',
        
      // },
      // {
      //   label: 'Edit User',
      //   icon: <PersonIcon />,
      //   children: [],
      //   url: '/myadmin/user-management/edit-user',
      // },
      {
        label: 'Reset Password',
        icon: <LockIcon />,
        children: [],
        url: '/myadmin/user-management/reset-password',
      },
      {
        label: 'Manage Roles',
        icon: <SupervisorAccountIcon />,
        children: [],
        url: '/myadmin/user-management/manage-roles',
      },
    ],
  },
  {
    label: 'Applications',
    icon: <AssignmentIcon />,
    url: '#',
    children: [
      {
        label: 'Browse Programs',
        icon: <AccountBalanceIcon />,
        url: '/myadmin/applications/browse',
        children: [],
      },
      {
        label: 'Apply to Programs',
        icon: <DescriptionIcon />,
        url: '/myadmin/applications/apply',
        children: [],
      },
      {
        label: 'Track Application Status',
        icon: <ReceiptIcon />,
        url: '/myadmin/applications/status',
        children: [],
      },
      {
        label: 'Submit Documents',
        icon: <DescriptionIcon />,
        url: '/myadmin/applications/submit-documents',
        children: [],
      },
      {
        label: 'Pay Application Fee',
        icon: <ReceiptIcon />,
        url: '/myadmin/applications/pay-fee',
        children: [],
      },
      {
        label: 'Communication',
        icon: <EventIcon />,
        url: '/applications/communication',
        children: [],
      },
    ],
  },
  {
    label: 'Programs',
    icon: <LocalLibraryIcon />,
    children: [
      {
        label: 'View All Programs',
        icon: <LibraryBooksIcon />,
        url: '/myadmin/programs/view-all',
        children: [],
      },
      {
        label: 'Add New Program',
        icon: <DescriptionIcon />,
        url: '/myadmin/programs/add',
        children: [],
      },
      {
        label: 'Manage Programs',
        icon: <LocalLibraryIcon />,
        url: '/myadmin/programs/manage',
        children: [],
      },
      {
        label: 'Program Analytics',
        icon: <ReceiptIcon />,
        url: '/myadmin/programs/analytics',
        children: [],
      },
    ],
  },
  {
    label: 'Documents',
    icon: <DescriptionIcon />,
    children: [
      {
        label: 'View All Documents',
        icon: <LibraryBooksIcon />,
        url: '/myadmin/documents/view-all',
        children: [],
      },
      {
        label: 'Upload New Document',
        icon: <DescriptionIcon />,
        url: '/myadmin/documents/upload',
        children: [],
      },
      {
        label: 'Manage Document Templates',
        icon: <DescriptionIcon />,
        url: '/myadmin/documents/manage-templates',
        children: [],
      },
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: <ReceiptIcon />,
    children: [
      {
        label: 'Generate Reports',
        icon: <ReceiptIcon />,
        url: '/myadmin/reports/generate',
        children: [],
      },
      {
        label: 'Application Trends',
        icon: <ReceiptIcon />,
        url: '/myadmin/reports/trends',
        children: [],
      },
      {
        label: 'Processing Times',
        icon: <ReceiptIcon />,
        url: '/myadmin/reports/processing-times',
        children: [],
      },
      {
        label: 'Export Data',
        icon: <ReceiptIcon />,
        url: '/myadmin/reports/export',
        children: [],
      },
    ],
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    children: [
      {
        label: 'System Settings',
        icon: <SettingsIcon />,
        url: '/myadmin/settings/system',
        children: [],
      },
      {
        label: 'User Management',
        icon: <SettingsIcon />,
        url: '/myadmin/settings/user-management',
        children: [],
      },
      {
        label: 'Access Control',
        icon: <SettingsIcon />,
        url: '/myadmin/settings/access-control',
        children: [],
      },
      {
        label: 'Application Form Customization',
        icon: <SettingsIcon />,
        url: '/myadmin/settings/form-customization',
        children: [],
      },
    ],
  },
  {
    label: 'Help & Support',
    icon: <HelpIcon />,
    children: [
      {
        label: 'User Guides',
        icon: <MenuBookIcon />,
        url: '/myadmin/help/user-guides',
        children: [],
      },
      {
        label: 'Contact Support',
        icon: <SupervisorAccountIcon />,
        url: '/myadmin/help/contact',
        children: [],
      },
      {
        label: 'FAQs',
        icon: <HelpIcon />,
        url: '/myadmin/help/faqs',
        children: [],
      },
      {
        label: 'System Updates',
        icon: <HelpIcon />,
        url: '/myadmin/help/updates',
        children: [],
      },
    ],
  },
  {
    label: 'Logout',
    icon: <ExitToAppIcon />,
    children: [],
    url: '/logout',
  },
];



// INFO CARD OBJECT
export interface InfoCardProps {
  Icon?: JSX.Element;
  iconColor?: string;
  title?: string;
  value?: string;
  bgColor?: string;
  Component?: React.FC<{}>;
  colSpan?: string; // Add this line
}
export const data: InfoCardProps[] = [
  {
    Icon: <UserGroupIcon />,
    iconColor: "#000",
    title: "Total Users",
    value: "7, 000",
    bgColor: "white",
    colSpan: "col-span-10 md:col-span-5 lg:col-span-2"
  },
  {
    Icon: <AcademicCapIcon />,
    iconColor: "#000",
    title: "Administrators",
    value: "2, 000",
    bgColor: "white",
    colSpan: "col-span-10 md:col-span-5 lg:col-span-2"
  },
  // {
  //   // @ts-ignore
  //   Component: SimpleRadarChart,
  //   colSpan: "col-span-10 md:col-span-5 lg:col-span-2",
  //   bgColor: "white",
  // },
  {
    Icon: <GiftIcon />,
    iconColor: "#000",
    title: "Guests",
    value: "300",
    bgColor: "white",
    colSpan: "col-span-10 md:col-span-5 lg:col-span-2"
  },
  {
    Icon: <UserMinusIcon />,
    iconColor: "#000",
    title: "Total Number of Applicants",
    value: "300",
    bgColor: "white",
    colSpan: "col-span-10 md:col-span-5 lg:col-span-2"
  },
  {
    Icon: <WindowIcon />,
    iconColor: "#000",
    title: "Career Opportunities",
    value: "90",
    bgColor: "white",
    colSpan: "col-span-10 md:col-span-5 lg:col-span-2"
  },

];





// LINE CHARTS DATA
export const lineChartData = [12, 19, 3, 5, 2, 3];
export const labels = ['January', 'February', 'March', 'April', 'May', 'June'];


// IMAGES
export const UserImagePlaceholder = {
  imageName:
    "https://res.cloudinary.com/dn1lqngds/image/upload/v1713170322/uploads/profilepicplaceholder.png.png",
  };


    // Data options for the select component
    export const genderOptions = [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "other", label: "Other" },
    ];

