import { useNavigate }
from 'react-router-dom';

import type { Group }
from '../types/Group';

import { useAuth }
from '../contexts/AuthContext';

import { toggleFavorite }
from '../services/favoriteService';

type GroupCardProps = {
  group: Group;
};

function GroupCard({
  group,
}: GroupCardProps) {

    const { user } = useAuth();

    const isFavorite =
  group.favorites?.some(
    (favorite) =>
      favorite.userId === user?.id,
  );

  const navigate =
    useNavigate();

    const averageRating =
  group.ratings.length > 0
    ? (
        group.ratings.reduce(
          (sum, rating) =>
            sum + rating.value,
          0,
        ) /
        group.ratings.length
      ).toFixed(1)
    : 'Novo';

    const totalRatings =
  group.ratings.length;


  async function handleFavorite(
  event: React.MouseEvent,
) {
  event.stopPropagation();

  try {
    await toggleFavorite(
      group.id,
    );

    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

  return (
  <div
    className="group-card"
    onClick={() =>
      navigate(`/chat/${group.id}`)
    }
  >
    <div className="group-top">
      <h3>{group.name}</h3>

      <div className="group-price">
        🚕 {group.onlineDrivers}
        <strong>{group.price} MT</strong>
      </div>
    </div>

    <div className="group-bottom">
      <small>
        {group.district
          ? `${group.district} • `
          : ''}
        {group.region}
      </small>

      <div className="group-right">
        <button
          className="favorite-btn"
          onClick={handleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>

        <span className="group-rating">
          ⭐ {averageRating} ({totalRatings})
        </span>
      </div>
    </div>
  </div>
);
}

export default GroupCard;