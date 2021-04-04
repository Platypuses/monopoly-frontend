import API from 'model/api/API';
import AuthorizationDto from 'model/dto/requests/AuthorizationDto';
import TokensPairDto from 'model/dto/responses/TokensPairDto';

export default {
  async authUser(body: AuthorizationDto): Promise<TokensPairDto> {
    const response = await API.post<TokensPairDto>('/auth', body);
    return response.data;
  },
};
