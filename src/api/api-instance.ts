import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL;

export const apiInstance = axios.create({
  baseURL,
  timeout: 30000,
});
