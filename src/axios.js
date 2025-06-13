import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Ganti jika Laravel pakai port lain
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

export default api;
