"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTableDemo from "@/components/table/CustomData";
import { useFetchAllUsers } from "@/hooks/useFetchAllUsers";
import AdminLeftSidebar from "@/pages/admin/AdminLeftSidebar";
import { AgReactUsersTable } from "@/components/table/AgReactUsersTable";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { NextApiRequest, NextApiResponse } from "next";
import { getIronSession } from "iron-session";
import { sessionData, sessionOptions } from "@/lib/sessionManager";
import clsx from "clsx";
import PusmasCard from "@/components/cards/PusmasCard";
import userStore from "@/store";
import { useIsClient } from "@/hooks/useIsClient";
import { content, serviceObjectList } from "@/data/data";
import {SidebarTabs, TabsDemo} from "@/components/tabs/TryTab";

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

// Create a client
const queryClient = new QueryClient();

type CollapsedProps = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
};

const AdminDashboard = ({ isCollapsed, setIsCollapsed }: CollapsedProps) => {
    const {session} = userStore();
    const isClient = useIsClient();
  const router = useRouter();
  const mainContentWidth = clsx({
    "w-[87%] sm:w-[95%] md:w-[94%] lg:w-[93%] xl:w-[92%] 2xl:w-[97%]":
      isCollapsed,
    "w-[77%] sm:w-[54%] md:w-[221%] lg:w-[85%] xl:w-[85%] 2xl:w-[107%]":
      !isCollapsed,
  });

  const leftContentWidth = clsx({
    "w-[15%] sm:w-[11%] md:w-[5%] lg:w-[4%] xl:w-[2.2%] 2xl:w-[4%]":
      isCollapsed,
    "w-[64%] sm:w-[39%] md:w-[35%] lg:w-[27%] xl:w-[17rem] 2xl:w-[23rem]":
      !isCollapsed,
  })
  
  return (
    <>
        {
            isClient && session.isLoggedIn && (
                <QueryClientProvider client={queryClient}>
      <div className="flex h-[100%] justify-center items-start">
        {/* LEFT SIDEBAR */}
        <section className={clsx`${leftContentWidth}`}>
          {/* <AdminLeftSidebar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          /> */}
        </section>


        {/* MAIN CONTENT */}
        <section className={clsx`${mainContentWidth}`}>
          <div className="grid grid-cols-10 gap-3 justify-between items-center">
            {/*AG GRID  USER TABLE*/}
            <div className="col-span-10  md:col-span-10 lg:col-span-7">
            <AgReactUsersTable />
            </div>
            {/*RIGHT SIDE CONTENT*/}
            <div className="col-span-10  md:col-span-10 lg:col-span-3 bg-[#ffffff] h-[350px] p-4">
                {content}
            </div>
            <div className="col-span-10  md:col-span-10 lg:col-span-10">
              <TabsDemo />
            </div>
            <div className="col-span-10">
              <SidebarTabs />
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
            )
        }
    </>
  );
};

export default AdminDashboard;


