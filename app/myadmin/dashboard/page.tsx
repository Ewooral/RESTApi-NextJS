"use client";
import React, { useEffect, useState } from "react";
import { AgReactUsersTable } from "@/components/table/AgReactUsersTable";
import userStore from "@/store";
import { useRouter } from "next/navigation";
import LegendEffectChart from "@/components/charts/LegendEffectChart";
import { data } from "@/data/data";
import InfoCard from "@/components/cards/InfoCard";
import AdminTab from "@/components/tabs/AdminTabs";
import { Card } from "@/components/ui/card";

const Dashboard = () => {
  const { session } = userStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // Set isLoading to true initially

  useEffect(() => {
    if (!session.isLoggedIn) {
      setIsLoading(false); // Set isLoading to false if user is not logged in
      router.push("/sign-in"); // Redirect to sign-in page
    } else {
      setIsLoading(false); // Set isLoading to false if user is logged in
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session.isLoggedIn]); // Run this effect whenever session.isLoggedIn changes

  if (isLoading) {
    return "Checking to see if you're signed in...";
  }

  return (
    <div className="grid grid-cols-10 gap-2 justify-center">
      {data.map((item, index) => (
        <InfoCard
          key={index}
          Icon={item.Icon}
          iconColor={item.iconColor}
          title={item.title}
          value={item.value}
          bgColor={item.bgColor}
          Component={item.Component}
          colSpan={item.colSpan}
        />
      ))}

      {/* border */}
      <div className="col-span-10 border-b-2 border-[#eaeaea]"></div>
      <span className="col-span-10 bg-[#e9f6ed] text-[green] text-[13px] p-[.3rem]">
        Important notifications will be shown here!
      </span>
      <span className="col-span-10  md:col-span-10 lg:col-span-7">
        <AgReactUsersTable />
      </span>
      <span className="col-span-10  md:col-span-10 lg:col-span-3 bg-white border rounded-lg p-2">
        <LegendEffectChart />{" "}
      </span>
      
      <Card className="col-span-10 border-b-2 border-[#eaeaea]  h-[317px] overflow-auto admintab">
        <AdminTab />
      </Card>
    </div>
  );
};

export default Dashboard;
