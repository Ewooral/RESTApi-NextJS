/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import userStore from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Notification {
  userId: string;
  message: string;
  read: boolean;
  timestamp: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    _id: string;
    imageName: string;
  };
}

function FetchAllNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  // const [notificationCount, setNotificationCount] = useState(0)
  const socket = io("http://localhost:5000");
  const { notificationCount, setNotificationCount } = userStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "/api/notifications/getAllNotifications"
        );
        setNotificationCount(response.data.length);
        console.log("NOTIFICATION COUNT???", notificationCount);
        console.log("RESPONSE.DATA", response.data);
        setNotifications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();

    socket.on("new-notification", (newNotification) => {
      setNotificationCount(notificationCount + 1);
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        newNotification,
      ]);
    });

    return () => {
      socket.off("new-notification");
    };
  }, [notificationCount, setNotificationCount]);

  return (
    <div className="flex flex-col items-center justify-center h-screen mt-8 bg-gray-200 relative">
      <h2 className="text-2xl mb-4 text-center">All Notifications</h2>
      <div className="">
        {notifications.map((notification, id) => (
          <div key={id} className="p-2 mb-2 bg-white rounded shadow-md">
            <span className="">
              <Avatar>
                <AvatarImage
                  src={
                    notification.user && notification.user.imageName
                      ? `/uploads/${notification.user.imageName}`
                      : "https://github.com/shadcn.png"
                  }
                  alt="@ewooral"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </span>
            <p>
              <strong>User ID:</strong> {notification.userId}
            </p>
            <p>
              <strong>Message:</strong> {notification.message}
            </p>
            <p>
              <strong>Read:</strong> {notification.read ? "Yes" : "No"}
            </p>
            <p>
              <strong>Timestamp:</strong>{" "}
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FetchAllNotifications;
