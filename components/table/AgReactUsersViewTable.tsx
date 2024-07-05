import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { AgGridSkeletonC } from "../skeletons/AGReactUserTableSkeleton";
import ImageCellRenderer from "./ImageCellRenderer";
import { ActionCellRenderer } from "./ActionCellRenderer";
import { userService_POSTGRES } from "@/services/userService";
import userStore from "@/store";
import { IoMdPersonAdd } from "react-icons/io";
import DynamicDialogModal from "../modals/DynamicDialogModal";
import { IoPersonCircleOutline } from "react-icons/io5";
import { InputComponent } from "@/app/(user-details-sections)/InputComponent";
import { usePersonalForm, useSignUpForm } from "@/hooks/usePersonalInfoForm";
import AddUserForm from "@/app/myadmin/user-management/view-users/AddUserForm";
import { FieldValues, SubmitHandler } from "react-hook-form";

export const AgReactUsersViewTable = () => {
  const { setData, session } = userStore();
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const { register, control, watch, handleSubmit, reset, formState } =
    useSignUpForm();

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const defaultColDef = useMemo(() => {
    return {
      headerComponent: "customHeader",
      filter: "agTextColumnFilter",
      floatingFilter: true,
      editable: true,
    };
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: userService_POSTGRES.fetchUsersData,
  });

  useEffect(() => {
    if (!isLoading && !error && data) {
      setData(data);
      console.log("Data:::", data);
    }
  }, [isLoading, error, data, setData]);

  if (error) return <div>Error: {error.message}</div>;

  const columnDefs = [
    { headerName: "", checkboxSelection: true, width: 40 },
    {
      headerName: "Image",
      field: "image_url",
      cellRenderer: ImageCellRenderer,
      width: 80,
      editable: false,
    },
    // { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title", width: 40, flex: 1 },
    { headerName: "First Name", field: "firstname", flex: 1 },
    { headerName: "Last Name", field: "lastname", flex: 1 },
    { headerName: "Email", field: "email", flex: 1 },
    {
      headerName: session.isAdmin ? "Is Student" : undefined,
      field: session.isAdmin ? "isstudent" : undefined,
      width: 80,
    },
    {
      headerName: session.isAdmin ? "Terms" : undefined,
      field: session.isAdmin ? "terms" : undefined,
      width: session.isAdmin ? 80 : undefined,
    },
    {
      headerName: session.isAdmin ? "Actions" : undefined,
      field: session.isAdmin ? "actions" : undefined,
      cellRenderer: session.isAdmin ? ActionCellRenderer : undefined,
      flex: session.isAdmin ? 1 : undefined,
      editable: session.isAdmin ? false : undefined,
    },
  ];

  function handleAddUser() {
    console.log("Add User");
    setIsCustomModalOpen(false);
  }

 
  return (
    <>
      {isLoading ? (
        <div className="mt-[6rem]">
          <AgGridSkeletonC />
        </div>
      ) : (
        <>
          <div className=" mt-[4rem]">
            {/* BUTTON ELEMENT THAT TRIGGERS THE  DYNAMIC MODAL TO OPEN */}
            <div className="mr-5 border-b">
              <button
                onClick={() => setIsCustomModalOpen(true)}
                className="flex justify-center items-center text-2xl my-4 gap-4"
              >
                <IoMdPersonAdd className="text-[#2196f3] size-10 " />
                <span>Add a user</span>
              </button>
            </div>

            {/* ADD USER FORM */}

            {/* CUSTOM DYNAMIC MODAL CONTROLLED BY THE ISCUSTOMMODALOPEN STATE */}
            {isCustomModalOpen && (
              <DynamicDialogModal
                isOpen={isCustomModalOpen}
                primaryButtonText="Submit"
                secondaryButtonText="Close"
                title="Kindly Add a new User"
                dialogRef={dialogRef}
              >
                <AddUserForm
                  register={register}
                  formState={formState}
                  watch={watch}
                  dialogRef={dialogRef}
                  onPrimaryAction={handleAddUser}
                  onSecondaryAction={() => setIsCustomModalOpen(false)}
                  handleSubmit={handleSubmit}
                />
              </DynamicDialogModal>
            )}

            <section className="ag-theme-quartz  custom-header-color h-[83vh] my-4">
              <AgGridReact
                columnDefs={columnDefs}
                rowData={data.users}
                defaultColDef={defaultColDef}
                rowSelection="multiple"
                suppressRowClickSelection={true}
                pagination={true}
                paginationPageSize={15}
                paginationPageSizeSelector={[15, 30, 50]} // rowHeight={70} // Set the row height to 70px
              />
            </section>
          </div>
        </>
      )}
    </>
  );
};
