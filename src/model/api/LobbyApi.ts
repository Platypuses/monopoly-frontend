import API from 'model/api/API';
import CreateLobbyDto from 'model/dto/responses/CreateLobbyDto';
import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';

export default {
  async createLobby(): Promise<CreateLobbyDto> {
    const response = await API.post<CreateLobbyDto>('/lobbies');
    return response.data;
  },

  async joinLobby(lobbyId: string): Promise<void> {
    await API.post(`/lobbies/${lobbyId}/participants`);
  },

  async getLobbyInfo(lobbyId: number): Promise<LobbyInfoDto> {
    const response = await API.get<LobbyInfoDto>(`/lobbies/${lobbyId}`);
    return response.data;
  },

  async exitLobby(): Promise<void> {
    await API.delete('/lobbies/lobby-participant');
  },
};
