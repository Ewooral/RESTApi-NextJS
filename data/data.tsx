import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import DashboardIcon from '@mui/icons-material/Dashboard';
import DescriptionIcon from '@mui/icons-material/Description';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';



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
  url: string;
  children: SidebarItem[];

}

export const sidebarData: SidebarItem[] = [
  {
    label: 'Dashboard Home',
    icon: <DashboardIcon />,
    url: '/admin/dashb',
    children: [],
  },
  {
    label: 'Applications',
    icon: <AssignmentIcon />,
    url: '/admin/dashb',
    children: [
      {
        label: 'Browse Programs',
        icon: <AccountBalanceIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Apply to Programs',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Track Application Status',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Submit Documents',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Pay Application Fee',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Communication',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Programs',
    icon: <AccountBalanceIcon />,
    url: '/admin/dashb',
    children: [
      {
        label: 'View All Programs',
        icon: <AccountBalanceIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Add New Program',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Manage Programs',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Program Analytics',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Documents',
    icon: <DescriptionIcon />,
    url: '/admin/documents',
    children: [
      {
        label: 'View All Documents',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Upload New Document',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Manage Document Templates',
        icon: <DescriptionIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Reports & Analytics',
    icon: <AssignmentIcon />,
    url: '/admin/dashb',
    children: [
      {
        label: 'Generate Reports',
        icon: <AssignmentIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Application Trends',
        icon: <AssignmentIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Processing Times',
        icon: <AssignmentIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Export Data',
        icon: <AssignmentIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Settings',
    icon: <SettingsIcon />,
    url: '/settings',
    children: [
      {
        label: 'System Settings',
        icon: <SettingsIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'User Management',
        icon: <SettingsIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Access Control',
        icon: <SettingsIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Application Form Customization',
        icon: <SettingsIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Help & Support',
    icon: <HelpIcon />,
    url: '/admin/dashb',
    children: [
      {
        label: 'User Guides',
        icon: <HelpIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'Contact Support',
        icon: <HelpIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'FAQs',
        icon: <HelpIcon />,
        url: '/admin/dashb',
        children: [],
      },
      {
        label: 'System Updates',
        icon: <HelpIcon />,
        url: '/admin/dashb',
        children: [],
      },
    ],
  },
  {
    label: 'Logout',
    icon: <ExitToAppIcon />,
    url: '/admin/dashb',
    children: [],
  },
];
