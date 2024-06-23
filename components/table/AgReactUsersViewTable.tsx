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

export const AgReactUsersViewTable = () => {
  const { setData, session } = userStore();
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
    }
  }, [isLoading, error, data, setData]);

  console.log("Data:::", data);

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

  return (
    <>
      {isLoading ? (
        <div className="mt-[-30px]">
          <AgGridSkeletonC />
        </div>
      ) : (
        <>
          <div className="ag-theme-quartz h-[94vh] custom-header-color">
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
          </div>
        </>
      )}
    </>
  );
};
