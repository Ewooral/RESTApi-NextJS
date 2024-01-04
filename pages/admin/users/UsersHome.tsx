import React, { useEffect, useState } from "react";
import { users } from "@/types/users";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { UserTableSkeleton } from "@/components/skeletons/TableSkeleton";
import UserTable from "@/components/table/UserTable";
import { UserTableProps } from "@/components/table/UserTable"; // Import the UserTableProps type definition
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, sort.field, sort.direction, refreshKey]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleSort = (field: string) => {
    setSort((prevSort) => ({
      field,
      direction:
        prevSort.direction === "asc" && prevSort.field === field
          ? "desc"
          : "asc",
    }));
  };

  const refresh = () => {
    setRefreshKey((oldKey) => oldKey + 1);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="overflow-x-auto relative flex items-center flex-col justify-center bg-[wheat]">
        <div className="flex justify-center items-center relative top-[27px]">
          <span className="flex justify-between p-1 bg-white rounded-md">
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              placeholder="search..."
              className="p-1 outline-none"
              onChange={handleSearchChange}
            />
            <button
              type="submit"
              className="bg-red-500 text-white p-1 rounded"
            >
              Search
            </button>
          </span>
        </div>
        <div
          className="flex absolute top-[11px] right-0 m-4 z-50 cursor-pointer refresh py-[.2rem]"
          onClick={refresh}
        >
          <ArrowPathRoundedSquareIcon
            className={`h-5 w-5 text-red-500 mx-2 ${loading ? "spin" : ""}`}
          />
          <span className="mr-4"> Refresh</span>
        </div>
        {error ? (
          <div className="flex flex-col justify-center items-center mt-[2rem]">
            <p className="text-red-500 bg-[#ff000029] p-[1rem] mt-[19px]">
              the server encountered an unexpected error ({error}) that
              prevented this page from rendering!
            </p>
            <Image src="/404.svg" alt="Error" width={400} height={400} />
          </div>
        ) : loading ? (
          <UserTableSkeleton />
        ) : (
          <>
            <UserTable
              users={users}
              handleSort={handleSort}
              openModal={openModal}
              closeModal={closeModal}
              modalIsOpen={modalIsOpen}
              refresh={refresh}
              itemsPerPage={3}
            />
            <Pagination>
              <PaginationContent>
                {page !== 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage(page - 1)}
                    />
                  </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      onClick={() => setPage(i + 1)}
                      isActive={page === i + 1}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {page !== totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() => setPage(page + 1)}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
    </div>
  );
}

export default UsersHome;
