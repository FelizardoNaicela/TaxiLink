import { api } from './api';

export async function findUserByPhone(
  phone: string,
) {
  const response =
    await api.get(
      `/users/phone/${phone}`,
    );

  return response.data;
}