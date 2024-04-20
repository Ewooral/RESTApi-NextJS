import React, { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import {
  AgGridSkeleton,
  SkeletonDemo,
  AgGridSkeletonB,
} from "../skeletons/AGReactUserTableSkeleton";
import userStore from "@/store";
import ImageCellRenderer from "./ImageCellRenderer";

const fetchUsersData = async () => {
  const response = await fetch("/api/auth/postgres/getAllUsersWithImages");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const AgReactUsersTable = () => {
  const { setImageUrl } = userStore();
  const defaultColDef = useMemo(() => {
    return {
      filter: "agTextColumnFilter",
      floatingFilter: true,
      editable: true,
    };
  }, []);

  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsersData,
  });
  console.log("Data", data);

  if (error) return <div>Error: {error.message}</div>;

  const columnDefs = [
    { headerName: "", checkboxSelection: true, width: 50 },
    // { headerName: "ID", field: "id" },
    { headerName: "Title", field: "title" },
    { headerName: "First Name", field: "firstname" },
    { headerName: "Last Name", field: "lastname" },
    { headerName: "Email", field: "email" },
    // { headerName: "Is Student", field: "isstudent" },

    // { headerName: "Terms", field: "terms" },
    {
      headerName: "Image",
      field: "image_url",
      cellRenderer: ImageCellRenderer,
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="mt-[-30px]">
          <AgGridSkeletonB />
        </div>
      ) : (
        <div className="ag-theme-quartz h-[350px] ">
          <AgGridReact
            columnDefs={columnDefs}
            rowData={data.users}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 15, 30]}
            // rowHeight={70} // Set the row height to 70px
          />
        </div>
        //   <div className="mt-[-30px]">
        //   <AgGridSkeletonB />
        // </div>
      )}
    </>
  );
};

// @ts-ignore
// const ImageCellRenderer = (params, setImageUrl) => {
//   console.log("Params:: ", params)

//   return params.value ? (
//     <Image
//       src={params.value}
//       alt="User"
//       width={100}
//       height={100}
//       style={{
//         width: "40px",
//         height: "40px",
//         borderRadius: "50%",
//         border: "4px solid #9b9797",
//       }}
//     />
//   ) : null;
// };
