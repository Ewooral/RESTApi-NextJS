"use client";
import React, { useEffect, useState } from "react";
import { AgReactUsersTable } from "@/components/table/AgReactUsersTable";
import userStore from "@/store";
import { useRouter } from "next/navigation";
import LegendEffectChart from "@/components/charts/LegendEffectChart";
// import { data } from "@/data/data";
import InfoCard from "@/components/cards/InfoCard";
import AdminTab from "@/components/tabs/AdminTabs";
import { Card } from "@/components/ui/card";import { useQueries } from "@tanstack/react-query";
import axios from "axios";
import { data } from "@/data/data";
import { sessionOptions } from "@/lib/lib";
import { getIronSession } from "iron-session";
import {  getSessionA } from "@/lib/sessionManager";







/**
 * Dashboard component.
 * This component is responsible for rendering the dashboard page.
 * It fetches data from various APIs and displays it in a grid layout.
 * It also handles user authentication and redirects to the sign-in page if the user is not logged in.
 */

const Dashboard = () => {

  // Get the current user session
  const { session } = userStore();
  // Get the router instance
  const router = useRouter();
  // State for loading status
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  // State for storing the response data
  const [ress, setRess] = useState(0)

  // const apiEndpoints = [
  //   { key: 'users', url: '/api/users-total' },
  //   { key: 'admins', url: '/api/admin-total' },
  //   { key: 'guests', url: '/api/guest-total' },
  //   { key: 'applicants', url: '/api/applicant-total' },
  // ];

  // const queryResults = useQueries({
  //   queries: apiEndpoints.map(endpoint => ({
  //     queryKey: [endpoint.key],
  //     queryFn: () => axios.get(endpoint.url).then(res => res.data),
  //   })),
  // });




  /**
   * Use the useQueries hook from react-query to fetch data from multiple APIs.
   * The data fetched includes total number of users, admins, guests, and applicants.
   */
  const results = useQueries({
    queries: [
      {
        queryKey: ['total-users'],
        queryFn: async () => {
          const res = await axios.get("/api/users-total");
          // console.log("RESA:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-admins'],
        queryFn: async () => {
          const res = await axios.get("/api/admin-total");
          // console.log("RESB:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-guest'],
        queryFn: async () => {
          const res = await axios.get("/api/guest-total");
          // console.log("RESC:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-applicant'],
        queryFn: async () => {
          const res = await axios.get("/api/applicant-total");
          // console.log("RESD:: ", res.data)
          return res.data;
        },
        // refetchInterval: 5000
      },
      {
        queryKey: ['total-users'],
        queryFn: async () => {
          const res = await axios.get("/api/users-total");
          // console.log("RESE:: ", res.data.res)
          return res.data;
        },
      },
    ],
  });

  /**
   * useEffect hook to refetch the data whenever the results change.
   * It also sets the response data to the ress state.
   */
  useEffect(() => {
    results.map((item, index) => {
      item.refetch()
      setRess(item.data?.res) 
    })

  }, [results, ress])




  /**
   * useEffect hook to check if the user is logged in.
   * If the user is not logged in, it sets the loading status to false and redirects to the sign-in page.
   * If the user is logged in, it sets the loading status to false.
   */
  useEffect(() => {
    if (!session.isLoggedIn) {
      setIsLoading(false); // Set isLoading to false if user is not logged in
      router.push("/sign-in"); // Redirect to sign-in page
    } else {
      setIsLoading(false); // Set isLoading to false if user is logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isLoggedIn, results[0].data]); // Run this effect whenever session.isLoggedIn changes
  // If the data is still loading, return a loading message
  if (isLoading) {
    return "Checking to see if you're signed in...";
  }

  return (
    <div className="grid justify-center grid-cols-10 gap-2">
      {data.map((item, index) => (
        <InfoCard
          key={index}
          Icon={item.Icon}
          iconColor={item.iconColor}
          title={item.title}
          // value={"kut"}
          value={results[index].isLoading ? 'Loading...' : results[index].data?.res}
          bgColor={item.bgColor}
          Component={item.Component}
          colSpan={item.colSpan}
        />
      ))}

      {/* border */}
      <div className="col-span-10 border-b-2 border-[#eaeaea]"></div>
      <span className="col-span-10 bg-[#e9f6ed] text-[green] text-[13px] p-[.3rem]">
        Important notifications will be shown here! {ress}
      </span>
      <span className="col-span-10 md:col-span-10 lg:col-span-7">
        <AgReactUsersTable />
      </span>
      <span className="col-span-10 p-2 bg-white border rounded-lg md:col-span-10 lg:col-span-3">
        <LegendEffectChart />{" "}
      </span>
      
      <Card className="col-span-10 border-b-2 border-[#eaeaea]  h-[317px] overflow-auto admintab">
        <AdminTab />
      </Card>
    </div>
  );
};

export default Dashboard;


