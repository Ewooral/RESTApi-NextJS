import React, { useState } from "react";
import clsx from "clsx";
import ButtonSpinner from "./spinners/ButtonSpinner";
import userStore from "@/store";

type DynamicButtonProps = {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: any;
  style?: React.CSSProperties;
  fillColor?: string;

};

const DynamicButton: React.FC<DynamicButtonProps> = ({
  label,
  icon,
  className,
  isLoading,
  type,
  onClick,
  style,
  fillColor,
}) => {
  return (
    <div className={className}>
      <button
        onClick={onClick}
        disabled={isLoading}
        type={type}
        className={clsx(
          "flex items-center justify-center",
          "border border-gray-300 px-2 py-2 rounded-lg gap-2 text-xs",
          isLoading && "cursor-not-allowed",
          isLoading && "opacity-70 bg-[#7e7e7e] font-bold",
          className
        )}
        style={style}
      >
        {icon}
        <span className={clsx("text-xs",
          className
        )}>{label}</span>
        {isLoading && (
          <span>
            <ButtonSpinner fillColor={fillColor ? fillColor : "#7e7e7e" } />
          </span>
        )}
        
      </button>
    </div>
  );
};

export default DynamicButton;

