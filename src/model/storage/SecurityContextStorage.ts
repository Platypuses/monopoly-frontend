import TokensPairDto from 'model/dto/responses/TokensPairDto';
import UserInfoDto from 'model/dto/responses/UserInfoDto';

let savedAccessToken: string | null = null;
let savedUserInfo: UserInfoDto | null = null;
const refreshTokenStorageKey = 'refresh-token';

export default {
  saveTokens(tokensPair: TokensPairDto): void {
    savedAccessToken = tokensPair.accessToken;
    window.localStorage.setItem(
      refreshTokenStorageKey,
      tokensPair.refreshToken
    );
  },

  saveUserInfo(userInfo: UserInfoDto): void {
    savedUserInfo = userInfo;
  },

  get accessToken(): string | null {
    return savedAccessToken;
  },

  get refreshToken(): string | null {
    return window.localStorage.getItem(refreshTokenStorageKey);
  },

  get userInfo(): UserInfoDto | null {
    return savedUserInfo;
  },

  clear(): void {
    savedAccessToken = null;
    window.localStorage.removeItem(refreshTokenStorageKey);
    savedUserInfo = null;
  },

  isUserNotAuthorized(): boolean {
    return savedAccessToken === null;
  },
};
