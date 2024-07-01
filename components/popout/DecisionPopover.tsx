import React from "react";
import ReactDOM from "react-dom";
import DynamicButton from "../CustomButton";
import { BiError } from "react-icons/bi";

interface DecisionPopoverProps {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onDelete: () => void;
  isLoading: boolean;
}

const DecisionPopover: React.FC<DecisionPopoverProps> = ({
  isOpen,
  message,
  onCancel,
  onDelete,
  isLoading
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="popover-backdrop">
      <div className="flex flex-col bg-white rounded-lg z-50">
        <div className="flex justify-center items-center bg-[#3b82f6] border-b h-8 text-white gap-3">
          <BiError className="size-6" />
          <span className="font-extrabold text-sm">Ewooral Popover</span>
        </div>
        <p className="p-2">{message}</p>
        <div className="flex justify-center items-center p-2 gap-4">
          <DynamicButton
            label="Cancel"
            onClick={onCancel}
            style={{
              backgroundColor: "white",
              border: "1px solid #3b82f6",
            }}
            className="text-[#3b82f6]"
          />
          <DynamicButton
            label="Delete"
            onClick={onDelete}
            style={{ backgroundColor: "#f04a4a" }}
            className="text-white"
            isLoading={isLoading}
            
          />
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};

export default DecisionPopover;
