"use client";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/lib"; // Adjusted the import path as necessary
import { NextApiRequest, NextApiResponse } from "next";
import { sessionData } from "@/lib/sessionManager";
import React from "react";
import { useTimeAgo__util } from "@/utils/utils";
import { useIsClient } from "@/hooks/useIsClient";
import UploadImage from "@/components/uploads/images/UploadImagesToCloudinary";

export async function getServerSideProps({
  req,
}: {
  req: NextApiRequest & { session?: any };
}) {
  const session = await getIronSession<sessionData>(
    req,
    {} as NextApiResponse,
    sessionOptions
  );
  console.log("session data:: ", session);

  // If there's no user in the session, redirect to login
  if (!session.isLoggedIn) {
    return {
      redirect: {
        destination: "/access-denied",
        permanent: false,
      },
    };
  }

  // If there is a user, return the user data as props
  return {
    props: { session }, // Will be passed to the page component as props
  };
}

interface UserProps {
  user: {
    name: string;
  };
}

function ProtectedPage({ firstname, isLoggedIn }: sessionData) {
  const startTime = new Date();
  // const timeAgo = useTimeAgo__util(startTime);
  const isClient = useIsClient();

  return (
    <>
      <div className={"flex flex-col justify-center items-center"}>
        <h1>Welcome {firstname}!</h1>
        <p>This is a protected page.</p>
        {/*<p className="text-xs mt-4">*/}
        {/*  Time since component mounted:{" "}*/}
        {/*  <i className="font-medium text-green-800 font-bolder">{timeAgo}</i>*/}
        {/*</p>*/}
        <div className={"mt-4"}>
          <UploadImage />
        </div>
      </div>
    </>
  );
}

export default ProtectedPage;
