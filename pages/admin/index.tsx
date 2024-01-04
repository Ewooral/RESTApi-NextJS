import React from "react";
import withAuth from "@/components/HigherOrderComponent";
import Render from "./Render";

const index = () => {
  return (
    <Render />
  );
};

export default withAuth(index);
