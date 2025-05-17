import axios from 'axios';
import Cookies from 'js-cookie';

// Cria a instância base do axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepta as requisições para incluir o token
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Não autorizado. Redirecionar para login se necessário.');
      window.location.href = '/';
    }

    return Promise.reject(error);
  }
);

export default api;
