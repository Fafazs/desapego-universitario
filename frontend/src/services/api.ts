import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

// URL base do nosso futuro Backend Node.js
export const api = axios.create({
  baseURL: 'http://localhost:3000/api', 
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