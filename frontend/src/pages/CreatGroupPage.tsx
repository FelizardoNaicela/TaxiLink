import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { createGroup } from '../services/groupService';

import { useAuth }
from '../contexts/AuthContext';

export function CreateGroupPage() {

        const { user } = useAuth();

        if (user?.role !== 'DRIVER') {
  return (
    <h2>
      Apenas taxistas podem criar grupos.
    </h2>
  );
}
  const navigate =
    useNavigate();

  const [name, setName] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [province] =
  useState(
    user?.province || '',
  );

  const [district, setDistrict] =
    useState('');

  const [region, setRegion] =
    useState('');

  const [price, setPrice] =
    useState(0);

  const [onlineDrivers, setOnlineDrivers] =
    useState(0);

  const [type, setType] =
    useState('TAXI');

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    try {

      await createGroup({
        name,
        description,
        province,
        district,
        region,
        price,
        onlineDrivers,
        type,
      });

      alert(
        'Grupo criado com sucesso!',
      );

      navigate('/groups');

    } catch (error) {

      console.log(error);

      alert(
        'Erro ao criar grupo',
      );
    }
  }

  return (
    <div className="create-group-page">

      <h1>
        Criar Grupo
      </h1>

      <form
        onSubmit={handleSubmit}
        className="create-group-form"
      >

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Nome do grupo"
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value,
            )
          }
          placeholder="Descrição"
        />

        <label>
  Província
</label>

<input
  value={province}
  disabled
/>

        <input
          value={district}
          onChange={(e) =>
            setDistrict(
              e.target.value,
            )
          }
          placeholder="Distrito"
        />

        <input
          value={region}
          onChange={(e) =>
            setRegion(
              e.target.value,
            )
          }
          placeholder="Região / Referência"
        />

        <select
          value={type}
          onChange={(e) =>
            setType(
              e.target.value,
            )
          }
        >
          <option value="TAXI">
            Táxi
          </option>

          <option value="MOTO">
            Moto
          </option>

          <option value="TXOPELA">
            Txopela
          </option>
        </select>

        <input
          type="number"
          value={price}
          onChange={(e) =>
            setPrice(
              Number(
                e.target.value,
              ),
            )
          }
          placeholder="Preço"
        />

        <input
          type="number"
          value={onlineDrivers}
          onChange={(e) =>
            setOnlineDrivers(
              Number(
                e.target.value,
              ),
            )
          }
          placeholder="Motoristas online"
        />

        <button type="submit">
          Criar Grupo
        </button>

      </form>

    </div>
  );
}