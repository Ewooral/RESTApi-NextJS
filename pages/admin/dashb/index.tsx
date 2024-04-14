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
import userStore from "@/store";
import {NextApiRequest, NextApiResponse} from "next";
import {getIronSession} from "iron-session";
import {sessionData, sessionOptions} from "@/lib/sessionManager";
import clsx from "clsx";

export async function getServerSideProps({ req }: { req: NextApiRequest & { session?: any } }) {
    const session = await getIronSession<sessionData>(req, {} as NextApiResponse, sessionOptions);
    console.log("session data:: ", session)



    // If there's no user in the session, redirect to login
    if (!session.isLoggedIn) {
        return {
            redirect: {
                destination: '/access-denied',
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
    isCollapsed: boolean
    setIsCollapsed: (isCollapsed: boolean) => void
}

const AdminDashboard = ({isCollapsed, setIsCollapsed}: CollapsedProps) => {
  const router = useRouter();
    const mainContentWidth = clsx({
        'w-[96%] sm:w-[95%] md:w-[94%] lg:w-[93%] xl:w-[92%] 2xl:w-[90%]': isCollapsed,
        'w-[90%] sm:w-[85%] md:w-[80%] lg:w-[75%] xl:w-[70%] 2xl:w-[65%]': !isCollapsed
    });

    const leftContentWidth = clsx({
        'w-[4%] sm:w-[5%] md:w-[6%] lg:w-[7%] xl:w-[8%] 2xl:w-[10%]': isCollapsed,
        'w-[10%] sm:w-[15%] md:w-[20%] lg:w-[25%] xl:w-[30%] 2xl:w-[10%]': !isCollapsed
    });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen justify-center items-start">
        {/* Left Sidebar */}
       <section className={clsx`${leftContentWidth}`}>
        {/*<AdminLeftSidebar  isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />*/}
       </section>
        {/* Main Content */}
        <section className={clsx`${mainContentWidth}`}>
          <div>
              <AgReactUsersTable />
          </div>
            <div>
                Hello, everybody from the Admin Dashboard Page. This is the Admin Dashboard Page.
                <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolor libero neque nulla
                    officia quae quibusdam repellat repudiandae voluptas voluptates. Commodi nam nisi obcaecati pariatur
                    porro quas reiciendis sunt vel!
                </div>
                <div>Aspernatur, earum error ex ipsum laborum quis ut! Ab facere ipsa modi nihil nulla repellat sed
                    sequi. Debitis delectus laudantium pariatur repudiandae tempora ullam? Magnam nesciunt nisi
                    temporibus voluptas voluptatum!
                </div>
            </div>

        </section>
      </div>
    </QueryClientProvider>
  );
};

export default AdminDashboard;
