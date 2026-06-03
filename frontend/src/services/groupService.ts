import { api } from './api';
import axios from 'axios';

export async function getGroups() {
  const token =
    localStorage.getItem('token');

  const response =
    await api.get('/groups', {
      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    });

  return response.data;
}

export async function createGroup(
  data: any,
) {

  const token =
    localStorage.getItem('token');

  const response =
    await axios.post(
      'http://localhost:3001/groups',
      data,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}