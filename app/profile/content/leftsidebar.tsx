// import React from 'react';
// import { Fragment } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// interface SidebarProps {
//   username: string;
// }

// const Sidebar = (props: SidebarProps) => {
//   const leftSidebarObj = [
//     {
//       id: 1,
//       name: 'Profile',
//       link: '/profile'
//     },
//     {
//       id: 2,
//       name: 'Friends',
//       link: '/profile/friends'
//     },
//     {
//       id: 3,
//       name: 'Photos',
//       link: '/photos'
//     },
//     {
//       id: 4,
//       name: 'Videos',
//       link: '/videos'
//     }
//   ]
//   return (
//     <Fragment>
//       <div className="fixed bg-gray-100 top-0 left-0 h-screen w-48  mt-[88px] border-gray-200 shadow-sm">
//         <div className="flex flex-col items-center pt-8 space-y-8">
//           {/* <Image src="/regi.avif" alt="Avatar" className="w-16 h-16 rounded-full" height={200} width={200} /> */}
//           <h4 className="text-lg font-bold">{props.username}</h4>
//           <ul className="flex flex-col items-center space-y-2">
//             {leftSidebarObj.map((obj) => (
//               <li key={obj.id} className="w-full">
//                 <Link href={obj.link} className="w-full px-4 py-2 hover:bg-gray-200 rounded-lg">
//                   {obj.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </Fragment>
//   );
// };

// export default Sidebar;



'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface MenuItem {
  id: number;
  label: string;
  children?: MenuItem[];
  link: string;
}

const LeftSidebar: React.FC = () => {
  const menuData: MenuItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      link: '/application',
      children: [
        { id: 11, label: 'eCommerce', link: '/application', },
        { id: 12, label: 'Analytics', link: '/application', },
      ],
    },
    {
      id: 2,
      label: 'Application',
      link: '/application',
      children: [
        { id: 21, label: 'Email', link: '/application', },
        { id: 22, label: 'Chat Box', link: '/application', },
        { id: 23, label: 'File Manager', link: '/application', },
        { id: 24, label: 'Contacts', link: '/application', },
        { id: 25, label: 'Todo List' , link: '/application',},
        { id: 26, label: 'Invoice' , link: '/application',},
        { id: 27, label: 'Calendar' , link: '/application',},
      ],
    },
    {
      id: 3,
      label: 'UI Elements',
      link: '/application',
    },
    {
      id: 4,
      label: 'Widgets',
      link: '/application',
      children: [
        {
          id: 41,
          label: 'eCommerce',
          link: '/application',
          children: [
            { id: 411, label: 'Products', link: '/application', },
            { id: 412, label: 'Product Details' , link: '/application',},
            { id: 413, label: 'Add New Products' , link: '/application',},
            { id: 414, label: 'Orders', link: '/application', },
          ],
        },
      ],
    },
    {
      id: 5,
      label: 'Components',
      link: '/application',
      children: [
        { id: 51, label: 'Alerts', link: '/application', },
        { id: 52, label: 'Accordions' , link: '/application',},
        { id: 53, label: 'Badges', link: '/application', },
        { id: 54, label: 'Buttons', link: '/application', },
        { id: 55, label: 'Cards' , link: '/application',},
        { id: 56, label: 'Carousels' , link: '/application',},
      ],
    },
    {
      id: 6,
      label: 'Content',
      link: '/application',
    },
    {
      id: 7,
      label: 'Icons',
      link: '/application',
    },
    {
      id: 8,
      label: 'Pages',
      link: '/application',
      children: [
        { id: 81, label: 'Authentication', link: '/application', },
        { id: 82, label: 'User Profile' , link: '/application',},
        { id: 83, label: 'Timeline' , link: '/application',},
        { id: 84, label: 'Errors' , link: '/application',},
        { id: 85, label: 'FAQ' , link: '/application',},
        { id: 86, label: 'Pricing' , link: '/application',},
        { id: 87, label: 'Charts & Maps',  link: '/application',
        children: [
          { id: 871, label: 'Charts', link: '/application', },
          { id: 872, label: 'Maps' , link: '/application',},
        ] },
      ],
    },
    {
      id: 9,
      label: 'Others',
      link: '/application',
      children: [
        { id: 91, label: 'Menu Levels' , link: '/application',},
        { id: 92, label: 'Documentation' , link: '/application',},
        { id: 93, label: 'Support' , link: '/application',},
      ],
    },
  ];

  const [expandedItems, setExpandedItems] = useState<number[]>([]);

  const toggleItem = (itemId: number) => {
    setExpandedItems((prevExpandedItems) =>
      prevExpandedItems.includes(itemId)
        ? prevExpandedItems.filter((id) => id !== itemId)
        : [...prevExpandedItems, itemId]
    );
  };

  const renderMenuItems = (items: MenuItem[]) => {
    return (
      <ul className="ml-4">
        {items.map((item) => (
          <li key={item.id} className="py-1">
            <div
              onClick={() => toggleItem(item.id)}
              className="cursor-pointer flex items-center text-gray-600 hover:text-gray-800 transition-all duration-500"
            >
              {item.children && (
                <span className="mr-1">
                  {expandedItems.includes(item.id) ? '[-]' : '[+]'}
                </span>
              )}
              <Link href={item.link}>{item.label}</Link>
            </div>
            <div
              className={`overflow-hidden transition-all duration-500 opacity-0 ${
                expandedItems.includes(item.id) ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              {item.children && renderMenuItems(item.children)}
            </div>
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    <div className="fixed flex items-start justify-center bg-gray-100 top-0 left-0 h-screen w-48  mt-[88px] border-gray-200 shadow-sm overflow-y-scroll">
      <div className="py-4 px-6">
        <h2 className="text-2xl font-bold mb-4">Left Sidebar</h2>
        {renderMenuItems(menuData)}
      </div>
    </div>
  );
};

export default LeftSidebar;


// HOW I SET IT UP

/**
 * Let's break down the logic used to build the LeftSidebar component:

    Component Structure:
        The component is a functional component written in TypeScript.
        It takes no props as input but directly uses the menu data inside the component.

    State Management:
        The component uses the useState hook to manage the state of expanded menu items.
        The state variable expandedItems is an array of menu item IDs that are currently expanded.

    Toggle Function:
        The toggleItem function is defined to handle the click event on a menu item.
        It toggles the expansion state of a menu item by adding or removing its ID from the expandedItems array.

    Rendering Menu Items:
        The renderMenuItems function takes an array of MenuItem objects and recursively renders them.
        It uses the map function to iterate over the menu items and renders each item as an <li> element.
        For each menu item, it renders a clickable <div> representing the menu item label.
        If the menu item has children, it renders a nested <div> with a dynamic max-height based on the expanded state.
        The transition-all and duration-300 classes are added for smooth animations.

    Component Rendering:
        In the component's return statement, it renders the top-level div with a dark background and white text.
        The rendered menu items are indented using the ml-4 class.
        The component has a minimalistic design with a title "Left Sidebar" at the top.

    Usage Example:
        The example at the end of the component demonstrates how to use the LeftSidebar component by providing it with menu data.

Overall, the logic is centered around recursively rendering menu items and managing the expanded state with a simple toggle function. The use of Tailwind CSS classes adds styling, animations, and transitions to create a visually appealing and interactive left sidebar component.

 */