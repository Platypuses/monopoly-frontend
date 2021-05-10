import AppError from 'model/error/AppError';
import UnauthorizedError from 'model/error/UnauthorizedError';
import PageUtils from 'presenters/utils/PageUtils';

export default {
  handleError(error: Error): void {
    if (error instanceof AppError) {
      alert(error.message);
    } else if (error instanceof UnauthorizedError) {
      PageUtils.logout();
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
};
