import axios from 'axios';
const token = localStorage.getItem('token');

export default {
  init: () => {
    axios.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error.response.data),
    );

    axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
  },
};
