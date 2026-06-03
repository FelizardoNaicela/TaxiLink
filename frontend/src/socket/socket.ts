import { io } from 'socket.io-client';

export const socket = io(
  'https://taxilink.onrender.com',
);