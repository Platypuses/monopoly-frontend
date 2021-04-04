import axios from 'axios';

const backendBaseUrl =
  process.env.BACKEND_BASE_URL ?? 'http://localhost:8080/api/v1';

const API = axios.create({
  baseURL: backendBaseUrl,
  responseType: 'json',
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response === undefined) {
      alert(error);
    } else {
      alert(error.response.data.message);
    }
  }
);

export default API;
