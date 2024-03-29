import axios from 'axios';

export const getUsers = async () => axios.get('/api/users');

export const getUser = async (id) => axios.get(`/api/users/${id}`);

export const updateUser = async (user) => axios.put(`/api/users/${user._id}`, user);

export const changeUserPassword = async (username, password) => axios.put(
  `/api/users/${username}/password`,
  `password=${password}`,
);

export const createUser = async (user) => axios.post('/api/users', user);

export const deleteUser = async (userId) => axios.delete(`/api/users/${userId}`);
