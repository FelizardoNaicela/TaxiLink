import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { login } from '../services/authService';

export function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  async function handleLogin(
  event: React.FormEvent,
) {
  event.preventDefault();

  const token =
    localStorage.getItem('token');

  if (token) {
    alert(
      'Já existe um usuário logado',
    );

    return;
  }

  try {
    const data = await login(
      email,
      password,
    );

    localStorage.setItem(
      'token',
      data.accessToken,
    );

    window.location.href =
  '/groups';
  } catch (error) {
    console.log(error);

    alert('Login inválido');
  }
}

  return (
    <div  style={{ maxWidth: 400, margin: "80px auto" }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
        style={{ width: "100%", marginBottom: 10 }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />

        <input
        style={{ width: "100%", marginBottom: 10 }}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
        />

        <button type="submit" style={{ width: "100%" }}
  >
          Entrar
        </button>
      </form>
      <div>
      <section
        style={{cursor: "pointer"}}
        onClick={() =>
    navigate('/register')
  }>
Criar Conta
      </section>
      </div>
    </div>
  );
}