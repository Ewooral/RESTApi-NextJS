import { useEffect } from 'react';
import axios from 'axios';
import userStore from '@/store';
import io from 'socket.io-client';


export const useFetchNotifications = () => {
 const {addNotification, setNotificationCount} = userStore();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get("/api/notifications/getAllNotifications");
        setNotificationCount(response.data.length);
        addNotification(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNotifications();

    const socket = io('http://localhost:5000');

    socket.on('new-notification', (newNotification) => {
    
      // @ts-ignore
      setNotificationCount((count: number) => count + 1);
      addNotification(newNotification);
    });

    return () => {
      socket.off('new-notification');
    };
  }, [addNotification, setNotificationCount]);
};