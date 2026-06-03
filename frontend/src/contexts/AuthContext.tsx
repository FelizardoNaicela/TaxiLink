import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { jwtDecode } from 'jwt-decode';

type User = {
  sub: number;
  id: number;
  email: string;
  role: string;
  province: string;
  name: string;
};

type AuthContextType = {
  user: User | null;

  isAuthenticated: boolean;

  logout: () => void;
};

const AuthContext =
  createContext({} as AuthContextType);

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({
  children,
}: Props) {
  const [user, setUser] =
  useState<User | null>(null);

const [loading, setLoading] =
  useState(true);

  useEffect(() => {
  const token =
    localStorage.getItem('token');

  if (token) {
    try {
      const decoded: User =
        jwtDecode(token);

      setUser(decoded);
    } catch {
      localStorage.removeItem(
        'token',
      );
    }
  }

  setLoading(false);
}, []);

 function logout() {
  localStorage.removeItem('token');

  setUser(null);
}

if (loading) {
  return <p>Carregando...</p>;
}

  return (
  <AuthContext.Provider
    value={{
      user,

      isAuthenticated: !!user,

      logout,
    }}
  >
    {children}
  </AuthContext.Provider>
);
}

export function useAuth() {
  return useContext(AuthContext);
}