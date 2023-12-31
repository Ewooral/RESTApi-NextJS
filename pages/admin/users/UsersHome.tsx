import React, { useEffect, useState } from "react";
import { users } from "@/types/users";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton"
import { UserTableSkeleton } from "@/components/skeletons/TableSkeleton";
import UserTable from "@/components/table/UserTable";
import { UserTableProps } from '@/components/table/UserTable'; // Import the UserTableProps type definition



interface myUsers extends users {
  _id: string;
}

function UsersHome() {
  const [users, setUsers] = useState<myUsers[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ field: "firstName", direction: "asc" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch users from the API
    setLoading(true);
    fetch(
      `/api/query/getUsers?page=${page}&limit=10&search=${search}&sort=${sort.field}&direction=${sort.direction}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data.users);
        setTotalPages(data.totalPages);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
        console.error("Error fetching data: ", error);
      });
  }, [page, search, sort]);

  const handleSort = (field: string) => {
    setSort((prevSort) => ({
      field,
      direction:
        prevSort.direction === "asc" && prevSort.field === field
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto">
        {error ? (
          <div className="flex flex-col justify-center items-center">
            <p>
              the server encountered an unexpected condition({error}) that
              prevented it from fulfilling the request
            </p>
            <Image src="/404.svg" alt="Error" width={400} height={400} />
          </div>
           ) : loading ? (
            <UserTableSkeleton />
        ) :  (
          <UserTable users={users} handleSort={handleSort} />
        )}

        <div className="mt-4">
          <button
            onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Previous
          </button>
          <button
            onClick={() =>
              setPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            className="bg-blue-500 text-white p-2 rounded ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default UsersHome;
