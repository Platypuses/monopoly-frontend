import TokensPairDto from 'model/dto/responses/TokensPairDto';

let accessToken: string | null = null;
const refreshTokenStorageKey = 'refresh-token';

export default {
  saveTokensToStorage(tokensPair: TokensPairDto): void {
    accessToken = tokensPair.accessToken;
    window.localStorage.setItem(
      refreshTokenStorageKey,
      tokensPair.refreshToken
    );
  },

  getAccessToken(): string | null {
    return accessToken;
  },

  getRefreshToken(): string | null {
    return window.localStorage.getItem(refreshTokenStorageKey);
  },

  removeTokensFromStorage(): void {
    accessToken = null;
    window.localStorage.removeItem(refreshTokenStorageKey);
  },

  isUserNotAuthorized(): boolean {
    return accessToken === null;
  },
};
