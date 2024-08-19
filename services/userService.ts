import { UserResponseProps } from '@/types/users';
import axios, { AxiosResponse, Method } from 'axios';
const BASE_URL_NEO4J = '/api/v1/query/neo4j';
const BASE_URL_POSTGRES = '/api/v1/auth/postgres'

// Error handling function
const handleError = (error: any, throwError: boolean = false) => {
    console.error('Error:', error);
    if (throwError) throw new Error(String(error));
  };
  
  // Generic Axios call function
  const makeAxiosCall = async <T = any>(
    url: string,
    method: Method,
    data: any = null
  ): Promise<T | null> => {
    try {
      const response: AxiosResponse<T> = await axios.request<T>({
        url,
        method,
        data,
      });
      // Check if response.data exists before accessing it
      if (response && response.data) {
        return response.data;
      } else {
        // Handle the case where response.data is undefined
        console.error('Received undefined response data');
        return null; // Or handle as appropriate for your application
      }
    } catch (error: any) {
      handleError(error, method === 'post');
      return null;
    }
  };

 export const userService_NEO4J = {
    createUser: async() => {
       try{
        const response = await axios.post(`${BASE_URL_NEO4J}/createUserNode`);
        return response.data
       }
       catch(error){
              console.error('Error:', error);
       }
    },

    uploadImage: async() => {
        try{
            const response = await axios.post(`${BASE_URL_NEO4J}/uploadImageNode`);
            return response.data;
        }
        catch(error){
            console.error('Error:', error);
        }
    }
}

// refactored
export const userService_POSTGRES_REFACTORED = {
    logIn: async (data: any) => makeAxiosCall(`${BASE_URL_POSTGRES}/sign-in`, 'POST', data),
    signIn: async (data: any) => makeAxiosCall(`${BASE_URL_POSTGRES}/sign-in`, 'POST',  data),
    signUp: async (data: any) => makeAxiosCall( `${BASE_URL_POSTGRES}/sign-up`, 'POST', data),
    getUsers: async () => makeAxiosCall( `${BASE_URL_POSTGRES}/getAllUsers`, 'GET'),
    fetchUsersData: async () => makeAxiosCall(`${BASE_URL_POSTGRES}/getAllUsersWithImages`, 'GET'),
    fetchUserImage: async (userId: string) => makeAxiosCall( `${BASE_URL_POSTGRES}/getUserImage?userId=${userId}`, 'GET'),
  };



export const userService_POSTGRES = {
    logIn: async(data: any) => {
         try{
            return await axios.post(`${BASE_URL_POSTGRES}/sign-in`, data);
         }
         catch(error){
            console.error('Error:', error);
         }
     },
     signIn: async(data: any) => {
         try{
          const response = await axios.post(`${BASE_URL_POSTGRES}/sign-in`, data);
          return response;
         }
         catch(error){
            throw new Error(String(error));
         }
     },

    signUp: async(data: any) => {
        try{
            const response = await axios.post(`${BASE_URL_POSTGRES}/sign-up`, data);
            return response
        }
        catch(error){
            console.error('Error:', error);
        }
    },

    getUsers: async() => {
        try{
            const response = await axios.get(`${BASE_URL_POSTGRES}/getAllUsers`);
            return response.data;
        }
        catch(error){
            console.error('Error:', error);
        }
    },

     fetchUsersData:  async () => {
        try{
            const response = await fetch(`${BASE_URL_POSTGRES}/getAllUsersWithImages`);
            return response.json(); 
        }
        catch(error){
            console.error('Error:', error);
        }
       
      },

      fetchUserImage : async (userId: string) => {
        const { data } = await axios.get(
          `${BASE_URL_POSTGRES}/getUserImage?userId=${userId}`
        );
        return data;
      },
}

