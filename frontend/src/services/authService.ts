import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taxilink.onrender.com',
});

export async function login(
  email: string,
  password: string,
) {
  const response = await api.post(
    '/auth/login',
    {
      email,
      password,
    },
  );

  return response.data;
}

export async function register(
  name: string,
  email: string,
  password: string,
  province: string,
  role: string,
  phone: string,
) {
  const response = await api.post(
    '/users',
    {
  name,
  email,
  password,
  province,
  role,
  phone,
},
  );

  return response.data;
}