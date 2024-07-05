import { UserResponseProps } from '@/types/users';
import axios, { AxiosResponse } from 'axios';
const BASE_URL_NEO4J = '/api/v1/query/neo4j';
const BASE_URL_POSTGRES = '/api/v1/auth/postgres'

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

