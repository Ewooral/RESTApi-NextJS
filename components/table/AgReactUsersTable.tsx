import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AgGridReact} from "ag-grid-react"; 
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import {
  AgGridSkeletonC,
} from "../skeletons/AGReactUserTableSkeleton";
import ImageCellRenderer from "./ImageCellRenderer";
import { ActionCellRenderer } from "./ActionCellRenderer";
import { userService_POSTGRES } from "@/services/userService";
import userStore from '@/store'


export const AgReactUsersTable = () => {
  const { setData } = userStore();
  const defaultColDef = useMemo(() => {
    return {
      headerComponent: 'customHeader',
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
    { headerName: "", checkboxSelection: true, width:40  },
    {headerName: "Image", field: "image_url", cellRenderer: ImageCellRenderer, width:80, editable: false},
    // { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title", width: 40, flex:1 },
  { headerName: "First Name", field: "firstname", flex:1 },
  { headerName: "Last Name", field: "lastname",  flex: 1 },
  { headerName: "Email", field: "email", flex: 1 },
    { headerName: "Is Student", field: "isstudent", width:80,  },
    { headerName: "Terms", field: "terms", width:80 },
    {headerName: "Actions", field: "actions", cellRenderer: ActionCellRenderer, flex: 1, editable: false,},
  ];



  return (
    <>
      {isLoading ? (
        <div className="mt-[-30px]">
          <AgGridSkeletonC />
        </div>
      ) : (
          <>
            <div className="ag-theme-quartz h-[350px] custom-header-color">
              <AgGridReact
                  columnDefs={columnDefs}
                  rowData={data.users}
                  defaultColDef={defaultColDef}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  pagination={true}
                  paginationPageSize={5}
                  paginationPageSizeSelector={[5, 15, 30]}// rowHeight={70} // Set the row height to 70px
              />
            </div>
          </>
          //   <div className="mt-[-30px]">
          //   <AgGridSkeletonB />
          // </div>
      )}
    </>
  );
};

