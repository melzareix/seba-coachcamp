import ax from 'axios';
import { emit } from 'react-gbus';

export const IS_AXIOS_LOADING = 'IS_AXIOS_LOADING';

const apiUrl = () => {
  const BASE_URL = 'http://localhost:3000';
  return {
    BASE_URL,
    ALL_WORKSHOPS: '/workshops',
    WORKSHOPS_COUNT: '/workshops/count',
    singleWorkshop: (id: string) => {
      return `/workshops/${id}`;
    },
    CATEGORIES: `/workshops/categories`,
    REGISTER_INSTRUCTOR: `/instructors/register`,
    LOGIN_INSTRUCTOR: `/instructors/login`,
    singleInstructor: (id: string) => `/instructors/${id}`,
    instructorWorkshops: (id: string) => {
      return `/instructors/${id}/workshops`;
    },
  };
};

export const api = apiUrl();
export const axios = ax.create({
  baseURL: api.BASE_URL,
  headers: {
    'content-type': 'application/json',
  },
  responseType: 'json',
});

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    emit(IS_AXIOS_LOADING, true);
    return config;
  },
  (error) => {
    emit(IS_AXIOS_LOADING, false);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    emit(IS_AXIOS_LOADING, false);
    return response;
  },
  (error) => {
    emit(IS_AXIOS_LOADING, false);
    return Promise.reject(error);
  }
);
