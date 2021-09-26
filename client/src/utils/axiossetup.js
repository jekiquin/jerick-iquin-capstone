import axios from 'axios';

export const LOCAL_HOST = 'http://localhost:8000';

export const gameFetcher = axios.create({
    baseURL: LOCAL_HOST,
    headers: {
        'Content-Type': 'application/json'
    }
})