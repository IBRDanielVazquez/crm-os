import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
    'x-subaccount-id': 'demo-subaccount-id' // Mockeado hasta tener el selector de subcuentas
  }
});

export default api;
