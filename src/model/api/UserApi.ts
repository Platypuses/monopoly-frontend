import API from 'model/api/API';
import RegistrationDto from 'model/dto/requests/RegistrationDto';

export default {
  async registerUser(body: RegistrationDto): Promise<void> {
    await API.post('/users', body);
  },
};
