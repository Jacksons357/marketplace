import axios from 'axios';
import { getServerSession } from 'next-auth';

export const axiosPublicAPI = axios.create({
  baseURL: process.env.API_URL,
});

const axiosServerAPI = axios.create({
  baseURL: process.env.API_URL,
});

axiosServerAPI.interceptors.request.use(async (config) => {
  const session = await getServerSession();
  const token = session?.user?.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosServerAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      return Promise.reject(new Error('Unauthorized'));
    }

    return Promise.reject(error);
  },
);

export { axiosServerAPI };
