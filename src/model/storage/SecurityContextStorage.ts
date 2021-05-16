import TokensPairDto from 'model/dto/responses/TokensPairDto';

let savedAccessToken: string | null = null;
const refreshTokenStorageKey = 'refresh-token';

export default {
  saveTokens(tokensPair: TokensPairDto): void {
    savedAccessToken = tokensPair.accessToken;
    window.localStorage.setItem(
      refreshTokenStorageKey,
      tokensPair.refreshToken
    );
  },

  get accessToken(): string | null {
    return savedAccessToken;
  },

  get refreshToken(): string | null {
    return window.localStorage.getItem(refreshTokenStorageKey);
  },

  clear(): void {
    savedAccessToken = null;
    window.localStorage.removeItem(refreshTokenStorageKey);
  },

  isUserNotAuthorized(): boolean {
    return savedAccessToken === null;
  },
};
