import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { User, Notification, PostgresUser, sessionType } from '@/types/users';


interface UserStore {
  user: User;
  errors: string;
  serverResponse: {
    finalToken: string;
    message: string;
    isAdmin: boolean;
    loggedIn: boolean;
  };
  isLoading: boolean;
  notificationCount: number;
  notifications: Notification[]
  postgresUser: PostgresUser
  postgresUsers: PostgresUser[];
  isModalOpen: boolean;
  title: string[];
  session: sessionType
    imageId: string | null;
  imageUrl: string | null;
    setImageUrl: (url: string | null) => void;
  setImageId:(id: string | null) => void;
  setSession: (newSession: sessionType) => void;
  setTitle: (title: string[]) => void;
  setIsModalOpen: (value:boolean) => void
  setPostgresUsers: (postgresUsers: PostgresUser[]) => void;
  setPostgresUser: (postgresUser: any) => void;
  addNotification: (notification: Notification[]) => void;
  setNotificationCount: (count: number) => void;
  logOut: () => void;
  setIsLoading: (loading: boolean) => void;
  setServerResponse: (response: Record<string, string>) => void;
  setEmail: (newUser: string) => void;
  setErrors: (error: string) => void;
  setUser: (user: User) => void;
  }
  

//@ts-ignore
const userStore = create<UserStore>(devtools(persist((set) => ({
  user: {
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    imageName: ''
    },
    serverResponse: {
    finalToken: '',
    message: '',
    isAdmin: false,
    loggedIn: false
    },
    errors: "",
    isLoading: false,

    notificationCount: 0,
    setNotificationCount: (count: number) => set(state => ({ notificationCount: count }), false, 'setNotificationCount'),

    notifications: [],
   
    addNotifications: (notifications: Notification[]) => set(state => ({ notifications }), false, 'addNotifications'),
    setUser: (user: User) => set(state => ({ user }), false, 'setUser'),

    postgresUser: 
    {
     created_at: '',
     email: '',
     firstname: '',
     id: '',
     initials: null,
     lastname: '',
     password: '',
     updated_at: ''
    }
     ,

     setPostgresUser: (postgresUser: any) => set(state => ({ postgresUser }), false, 'setPostgresUser'),
    
     postgresUsers:[],
     setPostgresUsers: (postgresUsers: PostgresUser[]) => set(state => ({ postgresUsers }), false, 'setPostgresUsers'),
    isModalOpen: false,
    setIsModalOpen: (value:boolean) => set(state => ({ isModalOpen: value }), false, 'setIsModalOpen'),
    title: [],
    setTitle: (title: string[]) => set(state => ({ title }), false, 'setTitle'),
    session:
      {
      userId: '',
      email: '',
      isAdmin: false,
      firstname: '',
      lastname: '',
      isLoggedIn: false,
      role: '',
      imageUrl: '',
      imageId: ''
    },
    setSession: (newSession: sessionType) => set((state) => {
      return {session: newSession}
    }),

    imageId: null,
    setImageId:(id: string | null) => set((state) => {
        return {imageId: id}
    }),

    imageUrl: null,
    setImageUrl:(url: string | null) => set((state) => {
        return {imageUrl: url}
    }),
              
      // ...................................................................
        logOut: () => {
        set(state => ({ user: {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          // imageName: ''
    
        },
        imageId: null,
        imageUrl: null,
        serverResponse: {
          finalToken: '',
          message: '',
          isAdmin: false,
          loggedIn: false
        },
        errors: "",
        isLoading: false,

        

        notificationCount: 0,
        notifications: [],
        session: 
          {
            userId: '',
            email: '',
            isAdmin: false,
            firstname: '',
            lastname: '',
            isLoggedIn: false,
            role: '',
            imageUrl: ''
          },
        
      }), false, 'logOut')
      },
      setUserName: (name: string) => set(state => ({ user: { ...state.user, name } }), false, 'setUserName'),
      setIsLoading: (loading: boolean) => set(state => ({ isLoading: loading }), false, 'setIsLoading'),
      setServerResponse: (response: any) => set(state => ({ serverResponse: response }), false, 'setServerResponse'),  
      setErrors: (error: string) => set(state => ({ errors: error }), false, 'setErrors'),
      
      // The below code is a function that updates the user object in the state. 
      // It takes a new email as a parameter and returns a function that 
      // takes the previous state as a parameter and returns a new state.
      setEmail: (newEmail: string) => set((state) => ({ user: { ...state.user, email: newEmail } })),

}), {
    name: 'users-store',
    })));

export default userStore;