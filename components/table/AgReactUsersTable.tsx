import React, { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";

const fetchUsersData = async () => {
  const response = await fetch("/api/auth/postgres/getAllUsers");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export const AgReactUsersTable = () => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "First Name", field: "firstname" },
    { headerName: "Last Name", field: "lastname" },
    { headerName: "Email", field: "email" },
    { headerName: "Is Student", field: "isstudent" },
    { headerName: "Title", field: "title" },
    { headerName: "Terms", field: "terms" },
  ];

  return (
    <div className="ag-theme-quartz h-[350px]">
      <AgGridReact
        columnDefs={columnDefs}
        rowData={data.users}
        defaultColDef={defaultColDef}
        rowSelection="multiple"
        suppressRowClickSelection={true}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={[5, 15, 30]}
      />
    </div>
  );
};
