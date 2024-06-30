"use client";
import React, { Fragment } from "react";
import userStore from "@/store";
const Main = () => {
  const { postgresUser } = userStore();
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <Fragment>
      <div className="grid grid-cols-1 ml-[12%] mr-[3%] px-4 py-16 pt-[108px]">
        <div className="flex flex-col items-center space-y-8">
          {/* <Image src="/coverA.png" alt="Cover Photo" className="w-full h-48 object-cover" height={200} width={200} /> */}
          {isClient && (
            <div className="w-full">
              <h1 className="text-3xl font-bold">{postgresUser.firstname}</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas eget lacus eget nunc luctus vulputate. Donec ac turpis
                eget ipsum rhoncus scelerisque. Sed aliquam erat volutpat.
                Maecenas dignissim lacus eu posuere ultricies. Maecenas
                condimentum laoreet imperdiet.
              </p>

              {/* <CustomData /> */}
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Main;
