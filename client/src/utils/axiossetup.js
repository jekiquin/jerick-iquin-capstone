import axios from 'axios';

export const LOCAL_HOST = `${
  process.env.REACT_APP_BACKEND ?? 'http://localhost:3000'
}/api`;

export const gameFetcher = axios.create({
  baseURL: LOCAL_HOST,
  headers: {
    'Content-Type': 'application/json',
  },
});
