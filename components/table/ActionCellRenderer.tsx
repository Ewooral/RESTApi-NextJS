import React, { useState } from "react";
import { ShadcnModal } from "../ShadcnModal";
import { DeleteOutline, ModeEditOutline } from "@mui/icons-material";
import { useCustomToast } from "@/hooks/useToast";
import DecisionPopover from "../popout/DecisionPopover";
import EwooralCustomOverlay from "../overlays/EwooralOverlay";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const ActionCellRenderer = (props: any) => {
  const [open, setOpen] = React.useState(false);
  const { showErrorToast, showSuccessToast } = useCustomToast();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = () => {
    setOpen(true);
  };

  // Delete User
  const deleteUser = async (email: string) => {
    const url = "/api/v1/crud/delete/deleteUser"; // Replace with your actual endpoint URL
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        email: props.data.email,
      },
    };
    try {
      const res = await axios.delete(url, config);
      console.log("Deleted", res.data);
      showSuccessToast("Deleted", res.data.message);
    } catch (error) {
      console.error("Error deleting user", error);
      showErrorToast("Error", "Failed to delete");
      setIsPopoverOpen(false);
      setIsLoading(false);
    }
  };

  // Inside your component
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      // Invalidate the users query to refetch data
      // @ts-ignore
      queryClient.invalidateQueries("users");
    },
  });

  const handleDeleteUserByEmail = async () => {
    setIsLoading(true);
    console.log("Deleted user id...", props.data.email);

    try {
      // Call the delete function here
      await deleteUserMutation.mutateAsync(props.data.email);

      setIsPopoverOpen(false);
      setIsLoading(false);
    } catch (error) {
      console.error("Error deleting user", error);
    }
  };

  return (
    <>
      {isPopoverOpen && <EwooralCustomOverlay />}{" "}
      {/* Render the Overlay when the popover is open */}
      <div className="">
        <DecisionPopover
          isOpen={isPopoverOpen}
          message="Are you sure you want to delete?"
          onCancel={() => setIsPopoverOpen(false)}
          onDelete={handleDeleteUserByEmail}
          isLoading={isLoading}
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
    </>
  );
};
