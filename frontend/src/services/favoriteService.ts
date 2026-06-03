import axios from 'axios';

export async function toggleFavorite(
  groupId: number,
) {
  const token =
    localStorage.getItem('token');

  const response =
    await axios.post(
      `http://localhost:3001/favorites/${groupId}`,
      {},
      {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    );

  return response.data;
}