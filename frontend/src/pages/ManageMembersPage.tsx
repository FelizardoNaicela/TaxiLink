import {
  useEffect,
  useState,
} from 'react';

import {
  useParams,
} from 'react-router-dom';

import {
  getMembers,
  removeMember,
  searchUsers,
  addMember,
} from '../services/groupService';

export function ManageMembersPage() {

  const { groupId } =
    useParams();

  const [members, setMembers] =
    useState<any[]>([]);

    const [search, setSearch] =
  useState('');

const [users, setUsers] =
  useState<any[]>([]);

  async function loadMembers() {

    const data =
      await getMembers(
        Number(groupId),
      );

    setMembers(data);
  }

  useEffect(() => {
    loadMembers();
  }, []);

  async function handleRemove(
    userId: number,
  ) {

    if (
      !confirm(
        'Remover membro?',
      )
    ) {
      return;
    }

    await removeMember(
      Number(groupId),
      userId,
    );

    loadMembers();
  }

  async function handleSearch() {

  if (!search.trim()) {
    return;
  }

  const data =
    await searchUsers(search);

    const filteredUsers =
  data.filter(
    (user: any) =>
      user.role === 'DRIVER' &&
      !members.some(
        (member: any) =>
          member.user.id === user.id,
      ),
  );

setUsers(filteredUsers);
}

async function handleAddMember(
  userId: number,
) {

  try {

    await addMember(
      Number(groupId),
      userId,
    );

    alert(
      'Membro adicionado!',
    );

    loadMembers();

  } catch {

    alert(
      'Utilizador já pertence ao grupo.',
    );
  }
}


  return (
    <div className="app">

      <h2>
  Membros do Grupo
</h2>

<div className="members-search">

  <input
    className="search-input"
    value={search}
    onChange={(e) =>
      setSearch(e.target.value)
    }
    onKeyDown={(e) => {
      if (e.key === 'Enter') {
        handleSearch();
      }
    }}
    placeholder="🔍 Procurar taxistas..."
  />

  <button
    className="filter-btn active-filter"
    onClick={handleSearch}
  >
    Pesquisar
  </button>

</div>

{users.length > 0 && (
  <>
    <h3>
      Resultados da Pesquisa
    </h3>

    <div className="groups">
      {users.map((user) => (

        <div
          key={user.id}
          className="group-card"
        >

          <h3>{user.name}</h3>

          <p>{user.email}</p>

          <p>{user.phone}</p>

          <button
            className="member-add-btn"
            onClick={() =>
              handleAddMember(user.id)
            }
          >
            + Adicionar
          </button>

        </div>

      ))}
    </div>
  </>
)}

<h3>
  Membros do Grupo
</h3>

<div className="groups"></div>

      {members.map(
        (member) => (

          <div
            key={member.id}
            className="group-card"
          >

            <h3>
              {member.user.name}
            </h3>

            <p>
              {member.user.email}
            </p>

            <p>
              {member.role}
            </p>

            {member.role !==
              'OWNER' && (

              <button
  className="member-remove-btn"
  onClick={() =>
    handleRemove(
      member.user.id,
    )
  }
>
  Remover
</button>

            )}

          </div>

        ),
      )}

    </div>
  );
}