import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types/User'; // Certifique-se de que a tipagem existe

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
      
      // Função de Login
      setAuth: (user, token) => {
        set({ user, token });
        
        // Rola para o topo suavemente após o login
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      
      // Função de Logout
      logout: () => {
        set({ user: null, token: null });
        
        // Rola para o topo suavemente após o logout
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      
    }),
    {
      name: 'desapego-auth-storage', // Nome da chave que ficará salva no LocalStorage
    }
  )
);