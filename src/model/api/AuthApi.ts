import API from 'model/api/API';
import AuthorizationDto from 'model/dto/requests/AuthorizationDto';
import RefreshTokensPairDto from 'model/dto/requests/RefreshTokensPairDto';
import TokensPairDto from 'model/dto/responses/TokensPairDto';
import UnauthorizedError from 'model/error/UnauthorizedError';
import TokensStorage from 'model/storage/TokensStorage';

export default {
  async authUser(body: AuthorizationDto): Promise<void> {
    const response = await API.post<TokensPairDto>('/auth', body);
    TokensStorage.saveTokensToStorage(response.data);
  },

  async renewTokens(): Promise<void> {
    const refreshToken = TokensStorage.getRefreshToken();

    if (refreshToken === null) {
      throw new UnauthorizedError();
    }

    const body: RefreshTokensPairDto = { refreshToken };
    const response = await API.post<TokensPairDto>(
      '/auth/tokens-renewal',
      body
    );

    TokensStorage.saveTokensToStorage(response.data);
  },
};
