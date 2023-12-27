/* eslint-disable react/display-name */
import { useRouter } from 'next/navigation';
import { useEffect, FC } from 'react';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: FC) => {
  return (props: JSX.IntrinsicAttributes) => {
    const Router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        Router.replace('/login');
      }
    }, [Router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;