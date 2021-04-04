import API from 'model/api/API';
import AuthorizationDto from 'model/dto/requests/AuthorizationDto';
import TokensPairDto from 'model/dto/responses/TokensPairDto';
import TokensLocalStorage from 'model/storage/TokensLocalStorage';

export default {
  async authUser(body: AuthorizationDto): Promise<void> {
    const response = await API.post<TokensPairDto>('/auth', body);
    TokensLocalStorage.saveTokensToStorage(response.data);
  },
};
