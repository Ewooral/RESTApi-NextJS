import React from "react";
import withAuth from "@/components/HigherOrderComponent";
import Layout from "./Layout";
import UsersHome from "./users/UsersHome";

const index = () => {
  return (
    <Layout>
      <div className="">
        <UsersHome />
      </div>
    </Layout>
  );
};

export default withAuth(index);
