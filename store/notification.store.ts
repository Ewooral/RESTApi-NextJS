import {create} from "zustand";

interface NotificationsState {
  notifications: Notification[];
  notificationCount: number;
  addNotifications: (notifications: Notification[]) => void;
  setNotificationCount: (count: number) => void;
}

const useNotificationsStore = create<NotificationsState>((set) => ({
  notifications: [],
  notificationCount: 0,
  addNotifications: (notifications) => set({ notifications }),
  setNotificationCount: (count) => set({ notificationCount: count }),
}));

export default useNotificationsStore;