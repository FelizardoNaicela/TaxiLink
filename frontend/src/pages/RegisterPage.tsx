import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { register } from '../services/authService';

export function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

    const [province, setProvince] =
  useState('');

  const [role, setRole] =
  useState('CLIENT');

  async function handleRegister(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    try {
      await register(
  name,
  email,
  password,
  province,
  role,
);

      alert('Conta criada');

      navigate('/login');
    } catch (error) {
      console.log(error);

      alert('Erro ao criar conta');
    }
  }

  return (
    <div  style={styles.container}>
      <h1>Registro</h1>

      <form
      style={styles.form}
        onSubmit={handleRegister}
      >
        <input
        style={styles.input}
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
        />

        <input
        style={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <input
        style={styles.input}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
            
          }
        />
<div style={styles.row}>
        <select
        style={styles.select}
  value={province}
  onChange={(event) =>
    setProvince(event.target.value)
  }
>
  <option value="">
    Selecione a província
  </option>

  <option value="Maputo">
    Maputo
  </option>

  <option value="Gaza">
    Gaza
  </option>

  <option value="Inhambane">
    Inhambane
  </option>

  <option value="Sofala">
    Sofala
  </option>

  <option value="Manica">
    Manica
  </option>

  <option value="Tete">
    Tete
  </option>

  <option value="Zambézia">
    Zambézia
  </option>

  <option value="Nampula">
    Nampula
  </option>

  <option value="Cabo Delgado">
    Cabo Delgado
  </option>

  <option value="Niassa">
    Niassa
  </option>
</select>
<select  style={styles.select}
  value={role}
  onChange={(event) =>
    setRole(event.target.value)
  }
>
  <option value="CLIENT">
    Cliente
  </option>

  <option value="DRIVER">
    Taxista
  </option>
</select>
</div>

        <button type="submit" style={styles.button}>
          Criar conta
        </button>
      </form>
    </div>
  );
}
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: "60px auto",
    padding: 20,
    borderRadius: 12,
    background: "#1e1e1e",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "column", // ✅ agora aceito
    gap: 12,
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2a2a2a",
    color: "white",
  },
  row: {
    display: "flex",
    gap: 10,
  },
  select: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "none",
    background: "#2a2a2a",
    color: "white",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#4CAF50",
    color: "white",
    cursor: "pointer",
    marginTop: 10,
  },
};