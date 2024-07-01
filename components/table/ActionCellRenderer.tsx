import React, { useState } from "react";
import { ShadcnModal } from "../ShadcnModal";
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import { useCustomToast } from "@/hooks/useToast";

type DecisionPopoverProps = {
  isOpen: boolean;
  message: string;
  onCancel: () => void;
  onDelete: () => void;
};

export const ActionCellRenderer = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  const handleDelete = () => {
    showSuccessToast("Deleted", "Successfully Deleted");
    setIsPopoverOpen(false);
  };

  return (
    <div className="">
      <DecisionPopover
        isOpen={isPopoverOpen}
        message="Are you sure you want to delete?"
        onCancel={() => setIsPopoverOpen(false)}
        onDelete={handleDelete}
      />
      <ModeEditOutline
        className="text-[16px] inline-block mr-5 text-[#2196f3]
        cursor-pointer bg-[#2196f34f] w-6 h-6 p-[3px] rounded-[5px] "
        onClick={handleEdit}
      />
      <ShadcnModal open={open} setOpen={setOpen} />
      <DeleteOutline
        className="text-[16px] inline-block mr-5 text-[red]
        cursor-pointer bg-[#ff00004a] w-6 h-6 p-[3px] rounded-[5px] "
        onClick={() => setIsPopoverOpen(true)}
      />
    </div>
  );
};

const DecisionPopover: React.FC<DecisionPopoverProps> = ({
  isOpen,
  message,
  onCancel,
  onDelete,
}) => {
  if (!isOpen) return null;

  return (
    <div className="popover-backdrop">
      <div className="popover-content">
        <p>{message}</p>
        <button onClick={onCancel}>Cancel</button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
};
