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
    }
    setServerResponse: (response: Record<string, string>) => void;
    setUser: (newUser: User) => void;
    setErrors: (error: string) => void;
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
      },
      setServerResponse: (response: any) => set(state => ({ serverResponse: response }), false, 'setServerResponse'),  
      errors: "",
      setErrors: (error: string) => set(state => ({ errors: error }), false, 'setErrors'),
      setUser: (newUser: any) => set(state => ({user: newUser}), false, 'setUser')
    
   
}), {
    name: 'users-store',
    })));

export default userStore;