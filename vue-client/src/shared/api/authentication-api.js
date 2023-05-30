import axios from 'axios';

export const doLogin = async (userLogin) => axios.post('/api/users/login', userLogin);

export const listProviders = async () => axios.get('/auth/providers');

export const getUser = async (userId) => axios.get(`/api/users/${userId}`);

export const getAuthorities = async () => axios.get('/auth/authorities');

export const doLogout = async () => axios.post('/auth/logout');
