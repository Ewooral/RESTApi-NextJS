import Image from "next/image";
import { useState } from "react";
import TableSkeleton from "../skeletons/ShowUserStatusTableSkeleton";

export const UserCard = ({ users }: { users: any[] }) => {
  const activeUsers = users?.filter((user) => user.status === "Active");
  const [searchTerm, setSearchTerm] = useState("");
  const [checkedUsers, setCheckedUsers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCheck = (user: any) => {
    if (checkedUsers.includes(user)) {
      setCheckedUsers(
        checkedUsers.filter((checkedUser) => checkedUser !== user)
      );
    } else {
      setCheckedUsers([...checkedUsers, user]);
      console.log(user);
    }
  };
  return (
    <>
      {activeUsers && (
        <div className="flex flex-wrap justify-around text-[12px]">
          <input
            type="text"
            placeholder="Search for an admin using last name"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
         {
        <> 
         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th></th>
                <th className="px-2 py-1 text-left  text-gray-500 font-extrabold uppercase tracking-wider">
                  Image
                </th>
                <th className="px-2 py-1 text-left  text-gray-500 font-extrabold uppercase tracking-wider">
                  Last name
                </th>
                <th className="px-2 py-1 text-left  text-gray-500 font-extrabold uppercase tracking-wider">
                  Status
                </th>
                <th className="px-2 py-1 text-left  text-gray-500 font-extrabold uppercase tracking-wider">
                  Role
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeUsers
                .filter((user) => {
                  const fullName = `${user.lastname}`.toLowerCase();
                  return fullName.includes(searchTerm.toLowerCase());
                })
                .map(
                  (user: {
                    id: React.Key | null | undefined;
                    image_url: any;
                    firstname: any;
                    lastname: any;
                    status: string;
                    role: string;
                  }) => (
                    <tr
                      key={user.id}
                      className={
                        checkedUsers.includes(user) ? "bg-green-200" : ""
                      }
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          onChange={() => handleCheck(user)}
                        />
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <Image
                          src={
                            user.image_url ? user.image_url : "/placeholder.png"
                          }
                          alt={"cell"}
                          width={30}
                          height={30}
                          style={{
                            borderRadius: "50%",
                            objectFit: "cover",
                            display: "inline-block",
                            width: "30px",
                            height: "30px",
                          }}
                        />
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">{`${user.lastname}`}</td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span className="bg-green-800 p-[.4rem] text-white rounded-[.6rem]">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-2 py-1 whitespace-nowrap">
                        <span className="underline text-blue-600">
                          {`${user.role} `}
                        </span>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </table>
           </>
           }
           {/* <div>
            <TableSkeleton />
           </div> */}
        </div>
         
      )}
    </>
  );
};
