import axios, { AxiosRequestConfig } from 'axios';
import AppError from 'model/error/AppError';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

/* eslint-disable @typescript-eslint/ban-ts-comment */

const backendBaseUrl =
  // @ts-ignore
  window.env?.BACKEND_BASE_URL ?? 'https://monopoly-api.casper.by/api/v1';

const API = axios.create({
  baseURL: backendBaseUrl,
  responseType: 'json',
});

function addAccessTokenToRequest(
  requestConfig: AxiosRequestConfig
): AxiosRequestConfig {
  const { accessToken } = SecurityContextStorage;

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
