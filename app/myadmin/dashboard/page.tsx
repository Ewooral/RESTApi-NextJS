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



const Dashboard = () => {
  const { session } = userStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially
  const [ress, setRess] = useState(0)

  const results = useQueries({
    queries: [
      {
        queryKey: ['total-users'],
        queryFn: async () => {
          const res = await axios.get("/api/users-total");
          console.log("RESA:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-admins'],
        queryFn: async () => {
          const res = await axios.get("/api/admin-total");
          console.log("RESB:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-guest'],
        queryFn: async () => {
          const res = await axios.get("/api/guest-total");
          console.log("RESC:: ", res.data)
          return res.data;
        },
      },
      {
        queryKey: ['total-applicant'],
        queryFn: async () => {
          const res = await axios.get("/api/applicant-total");
          console.log("RESD:: ", res.data)
          return res.data;
        },
        // refetchInterval: 5000
      },
      {
        queryKey: ['total-users'],
        queryFn: async () => {
          const res = await axios.get("/api/users-total");
          console.log("RESE:: ", res.data.res)
          return res.data;
        },
      },
    ],
  });

  useEffect(() => {
    results.map((item, index) => {
      item.refetch()
      setRess(item.data?.res) 
    })

  }, [results, ress])



  useEffect(() => {
    if (!session.isLoggedIn) {
      setIsLoading(false); // Set isLoading to false if user is not logged in
      router.push("/sign-in"); // Redirect to sign-in page
    } else {
      setIsLoading(false); // Set isLoading to false if user is logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isLoggedIn, results[0].data]); // Run this effect whenever session.isLoggedIn changes

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


