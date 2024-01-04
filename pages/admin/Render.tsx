import React from "react";
import withAuth from "@/components/HigherOrderComponent";
import Layout from "./Layout";
import UsersHome from "./users/UsersHome";
import { useRouter } from "next/router";
import { DataTableDemo } from "@/components/table/CustomData";

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
