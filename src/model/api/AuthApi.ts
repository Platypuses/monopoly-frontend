import API from 'model/api/API';
import UserApi from 'model/api/UserApi';
import AuthorizationDto from 'model/dto/requests/AuthorizationDto';
import RefreshTokensPairDto from 'model/dto/requests/RefreshTokensPairDto';
import TokensPairDto from 'model/dto/responses/TokensPairDto';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

async function fillSecurityContext(tokensPairDto: TokensPairDto) {
  SecurityContextStorage.saveTokens(tokensPairDto);
  const userInfo = await UserApi.getUserInfo();
  SecurityContextStorage.saveUserInfo(userInfo);
}

export default {
  async authUser(body: AuthorizationDto): Promise<void> {
    const response = await API.post<TokensPairDto>('/auth', body);
    await fillSecurityContext(response.data);
  },

  async renewTokens(): Promise<void> {
    const { refreshToken } = SecurityContextStorage;

    if (refreshToken === null) {
      throw new UnauthorizedError();
    }

    const body: RefreshTokensPairDto = { refreshToken };
    const response = await API.post<TokensPairDto>(
      '/auth/tokens-renewal',
      body
    );

    await fillSecurityContext(response.data);
  },
};
