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

<div
  style={{
    marginBottom: 20,
  }}
>

  <input
    value={search}
    onChange={(e) =>
      setSearch(
        e.target.value,
      )
    }
    placeholder="
Pesquisar por nome, email ou telefone"
  />

  <button
    onClick={handleSearch}
  >
    Pesquisar
  </button>

</div>

{users.map((user) => (

  <div
    key={user.id}
    className="group-card"
  >

    <h3>
      {user.name}
    </h3>

    <p>
      {user.email}
    </p>

    <p>
      {user.phone}
    </p>

    <button
      onClick={() =>
        handleAddMember(
          user.id,
        )
      }
    >
      Adicionar
    </button>

  </div>

))}

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