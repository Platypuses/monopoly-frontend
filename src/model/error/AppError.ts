export default class AppError extends Error {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
