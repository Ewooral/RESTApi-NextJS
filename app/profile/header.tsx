import React from 'react';
import { Fragment } from 'react';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <Fragment>
      <nav className="bg-gray-100 border-b border-gray-200 shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <a href="/" className="text-xl font-bold">My Profile</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/settings" className="text-gray-500">Settings</a>
              <a href="/logout" className="text-gray-500">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      
    </Fragment>
  );
};

export default Header;