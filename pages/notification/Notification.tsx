import { useEffect, useState } from 'react';
import { io } from "socket.io-client";

const socket = io('http://localhost:5000');

interface Notification {
  message: string;
  // Add other properties of the notification here
}

function NotificationComponent() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on('notification', (notification: Notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    return () => {
      socket.off('notification');
    };
  }, []);

  return (
    <div>
      {notifications.map((notification, index) => (
        <p key={index}>{notification.message}</p>
      ))}
    </div>
  );
}

export default NotificationComponent;