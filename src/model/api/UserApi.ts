import API from 'model/api/API';
import RegistrationDto from 'model/dto/requests/RegistrationDto';
import UserInfoDto from 'model/dto/responses/UserInfoDto';

export default {
  async registerUser(body: RegistrationDto): Promise<void> {
    await API.post('/users', body);
  },

  async getUserInfo(): Promise<UserInfoDto> {
    const response = await API.get<UserInfoDto>('/users/me');
    return response.data;
  },
};
