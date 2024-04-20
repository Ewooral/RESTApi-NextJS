'use client'
import React, { useState } from 'react';

interface MenuItem {
  id: number;
  label: string;
  children?: MenuItem[];
}

const LeftSidebar: React.FC = () => {
  const menuData: MenuItem[] = [
    {
      id: 1,
      label: 'Dashboard',
      children: [
        { id: 11, label: 'eCommerce' },
        { id: 12, label: 'Analytics' },
      ],
    },
    {
      id: 2,
      label: 'Application',
      children: [
        { id: 21, label: 'Email' },
        { id: 22, label: 'Chat Box' },
        { id: 23, label: 'File Manager' },
        { id: 24, label: 'Contacts' },
        { id: 25, label: 'Todo List' },
        { id: 26, label: 'Invoice' },
        { id: 27, label: 'Calendar' },
      ],
    },
    {
      id: 3,
      label: 'UI Elements',
    },
    {
      id: 4,
      label: 'Widgets',
      children: [
        {
          id: 41,
          label: 'eCommerce',
          children: [
            { id: 411, label: 'Products' },
            { id: 412, label: 'Product Details' },
            { id: 413, label: 'Add New Products' },
            { id: 414, label: 'Orders' },
          ],
        },
      ],
    },
    {
      id: 5,
      label: 'Components',
      children: [
        { id: 51, label: 'Alerts' },
        { id: 52, label: 'Accordions' },
        { id: 53, label: 'Badges' },
        { id: 54, label: 'Buttons' },
        { id: 55, label: 'Cards' },
        { id: 56, label: 'Carousels' },
      ],
    },
    {
      id: 6,
      label: 'Content',
    },
    {
      id: 7,
      label: 'Icons',
    },
    {
      id: 8,
      label: 'Pages',
      children: [
        { id: 81, label: 'Authentication' },
        { id: 82, label: 'User Profile' },
        { id: 83, label: 'Timeline' },
        { id: 84, label: 'Errors' },
        { id: 85, label: 'FAQ' },
        { id: 86, label: 'Pricing' },
        { id: 87, label: 'Charts & Maps', children: [
          { id: 871, label: 'Charts' },
          { id: 872, label: 'Maps' },
        ] },
      ],
    },
    {
      id: 9,
      label: 'Others',
      children: [
        { id: 91, label: 'Menu Levels' },
        { id: 92, label: 'Documentation' },
        { id: 93, label: 'Support' },
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
              className="cursor-pointer flex items-center text-white hover:text-[#dadada]
              transition-all duration-300"
            >
              {item.children && (
                <span className="mr-1">
                  {expandedItems.includes(item.id) ? '▼' : '►'}
                </span>
              )}
              {item.label}
            </div>
            <div
              className={`overflow-hidden transition-max-h duration-300 ${
                expandedItems.includes(item.id) ? 'max-h-screen' : 'max-h-0'
              }`}
            >
              <>                      
              {item.children && renderMenuItems(item.children.map(child => ({...child, label: '|---◾' + child.label})))}
              
              </>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  

  return (
    // <div className="bg-gray-900 text-white h-screen">
    <div className="fixed flex items-start justify-center bg-gray-900 text-white top-0 left-0 h-screen w-48 border-gray-200 shadow-sm overflow-y-scroll">

      <div className="py-4 px-6">
        <h2 className="text-2xl font-bold mb-4">Pentecost University</h2>
        {renderMenuItems(menuData)}
      </div>
    </div>
  );
};

export default LeftSidebar;
