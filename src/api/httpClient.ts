import { BASE_URL } from '@/helpers/const';
import { transformObjectToCamelCase } from '@/helpers/object';
import axios from 'axios';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

httpClient.interceptors.response.use((response) => {
  // Handle successful responses
  return transformObjectToCamelCase(response);
});

export default httpClient;
