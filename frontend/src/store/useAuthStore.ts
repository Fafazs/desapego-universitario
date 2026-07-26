import { create } from 'zustand';
import type { User } from '../types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: JSON.parse(localStorage.getItem('@desapego:user') || 'null'),
  token: localStorage.getItem('@desapego:token') || null,

  setAuth: (user, token) => {
    localStorage.setItem('@desapego:user', JSON.stringify(user));
    localStorage.setItem('@desapego:token', token);
    set({ user, token });
  },

  logout: () => {
    localStorage.removeItem('@desapego:user');
    localStorage.removeItem('@desapego:token');
    set({ user: null, token: null });
  },
}));