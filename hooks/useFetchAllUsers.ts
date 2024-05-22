/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import userStore from '@/store';
import { PostgresUser } from '@/types/users';
import { userService_POSTGRES } from '@/services/userService';


export const useFetchAllUsers = () => {
  const [users, setUsers] = useState<PostgresUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { setPostgresUsers } = userStore();

  const getUsers = async () => {
    userService_POSTGRES.getUsers()
    .then((res) => {
      setUsers(res.users);
      setPostgresUsers(res.users);
    })
    .catch((error) => {
      setError('Error fetching users');
      console.log(error);
    });
  }

  useEffect(() => {
    getUsers();
  }, []);

  return { users, setUsers, error };
}
