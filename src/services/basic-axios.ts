
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { BACKEND_URL } from './const';

export const basicAxios = async (endpoint: string, options?: AxiosRequestConfig) => {
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: 'GET',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`
    },
    ...options,
  });
  return res;
};
