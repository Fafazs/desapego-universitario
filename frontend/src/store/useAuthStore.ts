import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/User' // Certifique-se de que a tipagem existe

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setAuth: (user, token) => set({ user, token }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'desapego-auth-storage', // Nome da chave que ficará salva no LocalStorage
    }
  )
);