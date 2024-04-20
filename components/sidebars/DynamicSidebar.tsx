import { sidebarData } from '@/data/data';
import React, { useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';

const DynamicSidebar: React.FC = () => {
    const [open, setOpen] = useState<boolean[]>(Array(sidebarData.length).fill(false));
  
    const handleClick = (index: number) => {
      const newOpen = [...open];
      newOpen[index] = !open[index];
      setOpen(newOpen);
    };
  
    return (
      <div className="">
        <ul>
          {sidebarData.map((item, index) => (
            <li key={index}>
              <Link href={item.url}>
                  <div
                    className="flex items-center justify-between py-2 px-4 cursor-pointer"
                    onClick={() => item.children.length && handleClick(index)}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-2">{item.label}</span>
                    </div>
                    {item.children.length ? (open[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />) : null}
                  </div>
              </Link>
              {item.children.length && open[index] && (
                <ul>
                  {item.children.map((childItem, childIndex) => (
                    <li key={childIndex} className="pl-8 py-2 px-4">
                      <Link href={childItem.url}>
                          <div className="flex items-center">
                            {childItem.icon}
                            <span className="ml-2">{childItem.label}</span>
                          </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
export default DynamicSidebar;
