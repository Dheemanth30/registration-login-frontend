import axios from 'axios';

const api = axios.create({
 baseURL: 'https://registration-login-backend-2fnb.onrender.com/api/auth'
  withCredentials: true,
});

export default api;
