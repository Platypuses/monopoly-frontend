import AppError from 'model/error/AppError';

export default {
  handleError(error: Error): void {
    if (error instanceof AppError) {
      alert(error.message);
    } else {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  },
};
