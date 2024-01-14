/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import userStore from "@/store";

const UserProfile = () => {
  const { postgresUser } = userStore();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="mb-4 text-xl font-bold text-gray-700">
         { `${postgresUser.firstname}'s Profile`}
        </h2>
        <p className="text-gray-600">
          <span className="font-bold">Email:</span> {postgresUser.email}
        </p>
        {/* Add more user details here */}
      </div>
    </div>
  );
};

export default UserProfile;
