import React, { Fragment } from 'react';
import Header from './content/header';
import Sidebar from './content/leftsidebar';
import Image from 'next/image';

import CustomData from '@/components/table/CustomData';
import SearchBar from './content/searchBar';
import Main from './content/main';
import UpdateUser from './content/updateform';



interface ProfileProps {}

const Profile = (props: ProfileProps) => {
  return (
    <Fragment>
      <Main />
      <UpdateUser />
    </Fragment>
  );
};

export default Profile;