import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// URL base do nosso futuro Backend Node.js
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://desapego-universitario-api.onrender.com',
});

// Intercepta todas as requisições antes de saírem do frontend
api.interceptors.request.use((config) => {
  // Pega o token atual salvo no Zustand / LocalStorage
  const token = useAuthStore.getState().token;
  
  if (token) {
    // Injeta o token no cabeçalho de Autorização
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  return config;
});