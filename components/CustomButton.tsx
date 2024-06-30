import React, { useState } from "react";
import clsx from "clsx";
import ButtonSpinner from "./spinners/ButtonSpinner";
import userStore from "@/store";

type DynamicButtonProps = {
  label: string;
  icon: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  type: "button" | "submit" | "reset";
  onClick?: any;

};

const DynamicButton: React.FC<DynamicButtonProps> = ({
  label,
  icon,
  className,
  isLoading,
  type,
}) => {
  return (
    <div className={className}>
      <button
        disabled={isLoading}
        type={type}
        className={clsx(
          "flex items-center justify-center bg-[#3b82f6]",
          "border border-gray-300 px-2 py-2 rounded-lg gap-2 text-xs",
          isLoading && "cursor-not-allowed",
          isLoading && "opacity-70 bg-[#7e7e7e] font-bold"
        )}
      >
        {icon}
        <span className="text-white text-xs">{label}</span>
        {isLoading && (
          <span>
            <ButtonSpinner fillColor="#7e7e7e" />
          </span>
        )}
      </button>
    </div>
  );
};

export default DynamicButton;
