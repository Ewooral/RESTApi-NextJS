import { FC } from "react";
import { HeartIcon, ShareIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

interface DataItem {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

const data: DataItem[] = [
  {
    id: 1,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },
  {
    id: 2,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },
  {
    id: 3,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },
  {
    id: 4,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },
  {
    id: 5,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },
  {
    id: 6,
    name: "John Doe",
    message:
      "The socket.on(new-notification) event listener is still there to increment the notificationCount state when a new notification is received.",
    time: "2 hours ago",
    avatar: "/uploads/1704140785919-sandra.avif",
  },

  // Add more data here...
];

const LayoutCard: FC = () => (
  <div className="container mx-auto py-4">
    {[1].map((row) => (
      <div key={row} className="grid grid-cols-3 gap-4 mb-4">
        {data.map((item: DataItem) => (
          <div
            key={item.id}
            className="border shadow-lg p-4 rounded-md relative"
          >
            <div
              className="w-full h-32 bg-cover mb-4 bg-blue-500"
              style={{ backgroundImage: `url(/uploads/bg.avif)` }}
            />
            <Image
              className="w-14 h-14 rounded-full absolute -top-7 left-1/2 transform -translate-x-1/2"
              src={item.avatar}
              alt={item.name}
              width={100}
              height={100}
            />
            <h2 className="text-lg font-bold mb-2">{item.name}</h2>
            <p className="text-sm mb-2">{item.message}</p>
            <p className="text-xs text-gray-500 mb-2">{item.time}</p>
            <div className="flex items-center space-x-2">
              <HeartIcon className="h-5 w-5 text-red-500" />
              <ShareIcon className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default LayoutCard;
