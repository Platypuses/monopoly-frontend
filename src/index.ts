import 'components/common.scss';
import AuthApi from 'model/api/AuthApi';
import ErrorHandler from 'model/error/ErrorHandler';
import configureApplication from './configureApplication';

const REFRESH_TOKENS_TIMEOUT = 100 * 60 * 1000; // 100 minutes in milliseconds

function dispatchNewHashChangeEvent() {
  window.dispatchEvent(new Event('hashchange'));
}

configureApplication();

AuthApi.renewTokens()
  .then(() => {
    dispatchNewHashChangeEvent();
    setInterval(AuthApi.renewTokens, REFRESH_TOKENS_TIMEOUT);
  })
  .catch((e) => {
    ErrorHandler.handleError(e);
    dispatchNewHashChangeEvent();
  });
