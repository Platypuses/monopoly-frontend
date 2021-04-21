import axios, { AxiosRequestConfig } from 'axios';
import AppError from 'model/error/AppError';
import UnauthorizedError from 'model/error/UnauthorizedError';
import TokensStorage from 'model/storage/TokensStorage';

const backendBaseUrl =
  process.env.BACKEND_BASE_URL ?? 'http://localhost:8080/api/v1';

const API = axios.create({
  baseURL: backendBaseUrl,
  responseType: 'json',
});

function addAccessTokenToRequest(
  requestConfig: AxiosRequestConfig
): AxiosRequestConfig {
  const accessToken = TokensStorage.getAccessToken();

  if (accessToken !== null) {
    requestConfig.headers = {
      Authorization: accessToken,
    };
  }

  return requestConfig;
}

API.interceptors.request.use(addAccessTokenToRequest);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response === undefined) {
      throw new AppError('Не удалось установить связь с сервером');
    }

    if (error.response.status === 401) {
      throw new UnauthorizedError();
    } else {
      throw new AppError(error.response.data.message);
    }
  }
);

export default API;
