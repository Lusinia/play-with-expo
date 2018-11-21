import axios from 'axios';
import { store } from '../../App';


axios.interceptors.request.use(async (config) => {
  const { token } = store.getState().main;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Content-Type'] = 'application/json';
  config.headers.Accept = 'application/json';

  return config;
}, (err) => Promise.reject(err));


export default axios;