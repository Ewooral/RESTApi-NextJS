'use client';
import React, { Fragment } from 'react';
import Header from './header';
import Sidebar from './leftsidebar';
import Image from 'next/image';
import userStore from '@/store';
import CustomData from '@/components/table/CustomData';


interface ProfileProps {}

const Profile = (props: ProfileProps) => {
    const { postgresUser } = userStore();
  return (
    <Fragment>
      <Header />

          {/* Search Bar */}
          <div className="flex mt-[-2rem] justify-evenly items-center fixed z-10 h-16 w-full
           bg-white border-b  border-gray-200">
            <h1 className="px-4">Hello</h1>
            <h1>  <input
            type="text"
            placeholder="Search"
            className="h-8 w-1/2 rounded-lg border border-gray-200 px-4"
          />
          <button className=" h-8 w-20 ml-4 bg-blue-500 text-white rounded-lg">
            Search
          </button></h1>
      </div>
       
      <Sidebar />

      <div className="container mx-auto px-4 py-16 mt-[68px]">
        <div className="flex flex-col items-center space-y-8">
          {/* <Image src="/coverA.png" alt="Cover Photo" className="w-full h-48 object-cover" height={200} width={200} /> */}
          <div className="w-full max-w-5xl">
            <h1 className="text-3xl font-bold">{postgresUser.firstname}</h1>
            <p className="text-gray-500">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget lacus eget nunc luctus vulputate. Donec ac turpis eget ipsum rhoncus scelerisque. Sed aliquam erat volutpat. Maecenas dignissim lacus eu posuere ultricies. Maecenas condimentum laoreet imperdiet.</p>
            
            {/* <CustomData /> */}
          </div>
        </div>

      </div>
    </Fragment>
  );
};

export default Profile;