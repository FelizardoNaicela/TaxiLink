import { useNavigate } from 'react-router-dom';

import type { Group } from '../types/Group';

type Props = {
  groups: Group[];
};

export function GroupList({
  groups,
}: Props) {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Grupos disponíveis</h2>

      {groups.map((group) => (
        <div
          key={group.id}
          className="group-card"
          onClick={() =>
            navigate(`/chat/${group.id}`)
          }
        >
          <div className="group-header">
            <h3>{group.name}</h3>

            <span className="price">
              {group.price} MT
            </span>
          </div>

          <p>{group.region}</p>
        </div>
      ))}
    </div>
  );
}