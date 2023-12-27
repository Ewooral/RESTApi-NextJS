'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import Cookies from 'js-cookie';
import React from 'react';
import userStore from '@/store';

type errorType = {
  code: string;
  config: any;
  message: string;
  name: string;
  request: {}
  response: {
    data: {
      message: string;
    };
    status: number;
    statusText: string;
  }
  
}

const roles = ["ADMINISTRATOR", "TUTOR OR LECTURER", "STUDENT"];

const LoginPage = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [secretPin, setSecretPin] = useState('');
  const [showError, setShowError] = useState("");
  const [isError,  setIsError] = useState(false)

  const [data, setData] = useState({
    email: "",
    password: "",
    role: "",
    secretPin: "",
  });

  const {serverResponse, setServerResponse, errors, setErrors, setUser} = userStore();
  const { setToken } = useAuth();
  const router = useRouter();

  const login = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/auth/login', data);
      setToken(response.data.token);
      console.log("RESPONSE::", response.data);
      setServerResponse(response.data);

    // get the user data
    const userResponse = await axios.get('/api/query/getUser', { params: { email: data.email } });
    const user = userResponse.data;
    setUser(user)
    console.log("USER:: ", user);

      Cookies.set('token', response.data.token); 
      if(response.data.isAdmin){
        router.push('/admin');
      } else{
        router.push('/dashboard');
      }
    } catch (err: any) {
      const serverError = err as errorType;
      if(serverError && serverError.response){
        setIsError(true)
        console.error("ERR::", serverError.response.data.message)
        setErrors(serverError.response.data.message);
      }
    }
  };

  
  const handleChange = (e: any) => {
    setSelectedRole(e.target.value);
    data.role = e.target.value;
  };

  const handleSecretPin = (e: any) => {
    setSecretPin(e.target.value);
    setData({ ...data, secretPin: e.target.value });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200 text-black">
      <form onSubmit={login} className="p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl mb-4 text-center">Login</h2>
        {
          isError && <p className="text-red-500 text-center">{errors}</p>
        }
        <input type="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} required 
          className="block w-full p-2 mb-4 border rounded" placeholder="Email" />
        <input type="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} required 
          className="block w-full p-2 mb-4 border rounded" placeholder="Password" />
         <select
          className="block w-full p-2 mb-4 border rounded"
          required
          onChange={handleChange}
          value={selectedRole}  
        >
          <option value="">Select a role</option>
          {roles.map((role, id) => (
            <React.Fragment key={id}>
              <option value={role}>{role}</option>
            </React.Fragment>
          ))}
        </select>
        {selectedRole === "ADMINISTRATOR" && (
          <input
            type="password"
            value={secretPin}
            onChange={handleSecretPin}
            maxLength={6}
            className="block w-full p-2 mb-4 border rounded"
            placeholder="Enter your secret pin"
          />
        )}
        <button type="submit" className="block w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;