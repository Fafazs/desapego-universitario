import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Endereço da nossa API em Node.js
});

// Interceptor: envia o Token JWT no cabeçalho Authorization se o usuário estiver logado
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@desapego:token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});