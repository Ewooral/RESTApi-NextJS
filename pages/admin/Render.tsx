import React from "react";
import withAuth from "@/components/HigherOrderComponent";
import UsersHome from "./users/UsersHome";


const Render = () => {
    // const router = useRouter();
    // let content;
    // switch (router.pathname) {
    //   case '/admin':
    //     content = <UsersHome />;
    //     break;
    //   case '/table':
    //     content = <DataTableDemo />;
    //     break;
    //   case '/contact':
    //     content = <Contact />;
    //     break;
    //   default:
    //     content = <Home />;
  return (
    <>
    <UsersHome />
    </>
  );
};

export default withAuth(Render);
