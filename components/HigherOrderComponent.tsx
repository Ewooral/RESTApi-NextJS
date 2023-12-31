/* eslint-disable react/display-name */
import { useRouter } from 'next/navigation';
import { useEffect, FC, useState } from 'react';
import Cookies from 'js-cookie';
import userStore from '@/store'
import { LoadingSpinner } from './Loading';
const withAuth = (WrappedComponent: FC) => {
  return (props: any) => {
    const Router = useRouter();
    const { serverResponse } = userStore()
    const [isLoading, setIsLoading] = useState(true);

   console.log("serverResponse", serverResponse)

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token && !serverResponse.loggedIn) {
        Router.replace('/login');
        // setIsLoading(false)
      }
      else if(token && serverResponse.loggedIn  && serverResponse.isAdmin){
        Router.replace('/admin')
      }
      else if(token && serverResponse.loggedIn && !serverResponse.isAdmin){
        Router.replace('/dashboard')
      }

      
      setIsLoading(false)
      
    }, [Router, serverResponse.loggedIn, serverResponse.isAdmin]);

  
    if (isLoading) {
      return <div><LoadingSpinner /></div>; // Or your custom loading component
    }


    return <WrappedComponent {...props} />;
  };
};

export default withAuth;