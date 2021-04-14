import TokensPairDto from 'model/dto/responses/TokensPairDto';

const accessTokenStorageKey = 'access-token';
const refreshTokenStorageKey = 'refresh-token';

export default {
  saveTokensToStorage(tokensPair: TokensPairDto): void {
    window.localStorage.setItem(accessTokenStorageKey, tokensPair.accessToken);
    window.localStorage.setItem(
      refreshTokenStorageKey,
      tokensPair.refreshToken
    );
  },

  getAccessToken(): string | null {
    return window.localStorage.getItem(accessTokenStorageKey);
  },

  getRefreshToken(): string | null {
    return window.localStorage.getItem(refreshTokenStorageKey);
  },

  removeTokensFromStorage(): void {
    window.localStorage.removeItem(accessTokenStorageKey);
    window.localStorage.removeItem(refreshTokenStorageKey);
  },
};
