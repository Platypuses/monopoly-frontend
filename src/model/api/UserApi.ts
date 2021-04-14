import API from 'model/api/API';
import RegistrationDto from 'model/dto/requests/RegistrationDto';

export default {
  async registerUser(body: RegistrationDto): Promise<void> {
    await API.post('/users', body);
  },

  async getAuthenticatedUser(): Promise<void> {
    const response = await API.get('/users/me');

    if (response.data !== undefined) {
      console.log(response.data);
    }
  },
};
