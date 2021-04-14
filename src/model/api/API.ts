import axios, { AxiosRequestConfig } from 'axios';
import AppError from 'model/error/AppError';
import TokensLocalStorage from 'model/storage/TokensLocalStorage';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

const backendBaseUrl =
  process.env.BACKEND_BASE_URL ?? 'http://localhost:8080/api/v1';

// TODO: add access token validation

const API = axios.create({
  baseURL: backendBaseUrl,
  responseType: 'json',
});

function addAccessTokenToRequest(
  requestConfig: AxiosRequestConfig
): AxiosRequestConfig {
  const accessToken = TokensLocalStorage.getAccessToken();

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
      throw new AppError('Ошибка сети');
    }

    if (error.response.status === 401) {
      TokensLocalStorage.removeTokensFromStorage();
      // TODO: Replace REGISTRATION with LOGIN
      Router.goToRoute(RoutesEnum.REGISTRATION);
    } else {
      throw new AppError(error.response.data.message);
    }
  }
);

export default API;
