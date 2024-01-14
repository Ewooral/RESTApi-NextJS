/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userStore from '@/store';
import { PostgresUser } from '@/types/users';


export const useFetchAllUsers = () => {
  const [users, setUsers] = useState<PostgresUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setPostgresUsers } = userStore();

  const getUsers = async () => {
    try {
      const res = await axios.get('/api/auth/postgres/getAllUsers');
      setUsers(res.data.users);
      setPostgresUsers(res.data.users);
    } catch (error) {
      setError('Error fetching users');
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { users, setUsers, error };
}
