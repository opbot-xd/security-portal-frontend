
import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import { BACKEND_URL,CHANNELi } from './const';

export const basicAxiosGet = async (endpoint: string, options?: AxiosRequestConfig) => {
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: 'GET',
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res;
};

export const basicAxiosPost = async (
  endpoint: string, 
  data: any, 
  options?: AxiosRequestConfig
) => {
  const res = await axios({
    baseURL: BACKEND_URL,
    url: endpoint,
    method: 'POST',
    data: data,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res;
};

export const channelI_POST = async (
  endpoint: string, 
  data: any, 
  options?: AxiosRequestConfig
) => {
  const res = await axios({
    baseURL: CHANNELi,
    url: endpoint,
    method: 'POST',
    data: data,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });
  return res;
};
