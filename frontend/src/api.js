// src/api.js
import axios from 'axios';

// Crée une instance axios avec la baseURL de ton API
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Remplace par l'URL de ton API
});

// Ajouter le token JWT dans les headers de chaque requête
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;
