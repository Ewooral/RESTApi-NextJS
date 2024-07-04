
import React from "react";
import {InfoCardProps} from "@/data/data";


const InfoCard: React.FC<InfoCardProps> = ({ Icon, iconColor, title, value, bgColor, Component, colSpan="col-span-10 md:col-span-5 lg:col-span-2" }) => {
    return (
        <div className={`flex ${colSpan} bg-[${bgColor}] p-2 items-center border border-[#ddd] flex-wrap min-w-[fit-content]`}>
            <div>
                <span
                    style={{color: iconColor}}
                   className={`w-[70px] mr-2  inline-block`} >
                    {iconColor && Icon}
                </span>
            </div>
            <span className="flex flex-col justify-between items-start p-2">
        <span className={` text-xl font-bold`}>{title}</span>
        <span className={` text-xl font-bold text-[#2196f3]`}>{value}</span>
      </span>
            {Component && <Component/>} {/* Render the component if it's passed */}
        </div>
    );
};
export default InfoCard
