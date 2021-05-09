import AppError from 'model/error/AppError';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default {
  handleError(error: Error): void {
    if (error instanceof AppError) {
      alert(error.message);
    } else if (error instanceof UnauthorizedError) {
      SecurityContextStorage.clear();
      // TODO: Replace REGISTRATION with LOGIN
      Router.goToRoute(RoutesEnum.REGISTRATION);
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
};
