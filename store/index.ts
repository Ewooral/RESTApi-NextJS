import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'
import { ToastState } from '@/types/users';
import { User, Notification, PostgresUser } from '@/types/users';
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
    toastState: ToastState;
    setToastState: (toastState: ToastState) => void;
  }
  

//@ts-ignore
const userStore = create<UserStore&ToastState>(devtools(persist((set) => ({
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

      toastState: {
        message: '',
        variant: 'default',
        show: false,
        setShow: (show: any) => set(() => ({ show })),
        setMessage: (message: any) => set(() => ({ message })),
        setVariant: (variant: any) => set(() => ({ variant })),
      },

      setToastState: (toastState: ToastState) => set(() => ({ toastState }), false, 'setToastState'),

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
      
      
      
      // ...................................................................
        logOut: () => {
        set(state => ({ user: {
          firstName: '',
          lastName: '',
          email: '',
          role: '',
          // imageName: ''
    
        },
        serverResponse: {
          finalToken: '',
          message: '',
          isAdmin: false,
          loggedIn: false
        },
        errors: "",
        isLoading: false,

        toastState: {
          message: '',
          variant: 'default',
          show: false,
          setShow: (show: any) => set(() => ({ show })),
          setMessage: (message: any) => set(() => ({ message })),
          setVariant: (variant: any) => set(() => ({ variant })),
        },

        notificationCount: 0,
        notifications: []
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