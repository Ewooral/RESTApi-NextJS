import {create} from 'zustand';
import { devtools, persist } from 'zustand/middleware'

interface User {
    firstName: string;
    lastName: string;
    email: string;
    // password: string;
    role: string;
    imageName: string;
    // secretPin: string;
  }
  
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


      setUser: (user: User) => set(state => ({ user }), false, 'setUser'),
      logOut: () => {
        set(state => ({ user: {
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
        isLoading: false,}), false, 'logOut')
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