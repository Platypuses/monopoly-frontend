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
      alert(INVALID_NICKNAME_LENGTH_ERROR);
      return;
    }

    const passwordLength = password.length;

    if (passwordLength < 5 || passwordLength > 30) {
      alert(INVALID_PASSWORD_LENGTH_ERROR);
      return;
    }

    if (password !== passwordConfirmation) {
      alert(PASSWORDS_MISMATCH);
    }
  },
};
