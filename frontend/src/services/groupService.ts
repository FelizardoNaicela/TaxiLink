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
      'https://taxilink.onrender.com/groups',
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

export async function getMembers(
  groupId: number,
) {
  const token =
    localStorage.getItem('token');

  const response =
    await api.get(
      `/groups/${groupId}/members`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}

export async function addMember(
  groupId: number,
  userId: number,
) {
  const token =
    localStorage.getItem('token');

  const response =
    await api.post(
      `/groups/${groupId}/members`,
      { userId },
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}

export async function removeMember(
  groupId: number,
  userId: number,
) {
  const token =
    localStorage.getItem('token');

  const response =
    await api.delete(
      `/groups/${groupId}/members/${userId}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}

export async function searchUsers(
  search: string,
) {
  const token =
    localStorage.getItem('token');

  const response =
    await api.get(
      `/users/search?search=${search}`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}
