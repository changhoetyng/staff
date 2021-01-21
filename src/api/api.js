import axios from 'axios';

export const apiUrl = 'http://localhost:5000/api'

export const api = axios.create({
    baseURL: apiUrl,
    timeout: 100000,
});