import axios from 'axios';

const backendBaseUrl =
  process.env.BACKEND_BASE_URL ?? 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: backendBaseUrl,
  responseType: 'json',
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    throw Error(error.response.data.message);
  }
);

export default api;
