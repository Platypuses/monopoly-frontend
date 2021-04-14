import AppError from 'model/error/AppError';

const INVALID_NICKNAME_LENGTH_ERROR =
  'Никнейм должен быть длиной от 5 до 15 символов';

const INVALID_PASSWORD_LENGTH_ERROR =
  'Пароль должен быть длиной от 5 до 30 символов';

const PASSWORDS_MISMATCH = 'Пароли не совпадают';

export default {
  validate(
    nickname: string,
    password: string,
    passwordConfirmation: string
  ): void {
    const nicknameLength = nickname.length;

    if (nicknameLength < 5 || nicknameLength > 15) {
      throw new AppError(INVALID_NICKNAME_LENGTH_ERROR);
    }

    const passwordLength = password.length;

    if (passwordLength < 5 || passwordLength > 30) {
      throw new AppError(INVALID_PASSWORD_LENGTH_ERROR);
    }

    if (password !== passwordConfirmation) {
      throw new AppError(PASSWORDS_MISMATCH);
    }
  },
};
