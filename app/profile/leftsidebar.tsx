import React from 'react';
import { Fragment } from 'react';
import Image from 'next/image';
interface SidebarProps {}

const Sidebar = (props: SidebarProps) => {
  return (
    <Fragment>
      <div className="fixed top-0 left-0 h-screen w-48  mt-[88px] border-gray-200 shadow-sm">
        <div className="flex flex-col items-center pt-8 space-y-8">
          {/* <Image src="/regi.avif" alt="Avatar" className="w-16 h-16 rounded-full" height={200} width={200} /> */}
          <h4 className="text-lg font-bold">Username</h4>
          <ul className="flex flex-col items-center space-y-2">
            <li>
              <a href="/profile" className="text-gray-500">Profile</a>
            </li>
            <li>
              <a href="/friends" className="text-gray-500">Friends</a>
            </li>
            <li>
              <a href="/photos" className="text-gray-500">Photos</a>
            </li>
            <li>
              <a href="/videos" className="text-gray-500">Videos</a>
            </li>
          </ul>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;