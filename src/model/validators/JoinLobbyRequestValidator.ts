import AppError from 'model/error/AppError';

const INVALID_LOBBY_ID_ERROR = 'Некорректное значение ID лобби';

export default {
  validate(lobbyId: string): void {
    if (lobbyId === '') {
      throw new AppError(INVALID_LOBBY_ID_ERROR);
    }

    const conversionResult = Number(lobbyId);

    if (Number.isNaN(conversionResult)) {
      throw new AppError(INVALID_LOBBY_ID_ERROR);
    }
  },
};
