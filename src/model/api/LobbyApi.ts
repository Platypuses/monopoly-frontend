import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import LobbyParticipantDto from 'model/dto/responses/LobbyParticipantDto';
import LobbyStatus from 'model/dto/responses/LobbyStatus';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

function buildLobbyParticipantsMock(): LobbyParticipantDto[] {
  const { userInfo } = SecurityContextStorage;

  if (userInfo === null) {
    throw new UnauthorizedError();
  }

  return [
    {
      id: userInfo.id,
      nickname: userInfo.nickname,
      isCreator: true,
    },
    {
      id: 1,
      nickname: 'очень_длинный_ник',
      isCreator: false,
    },
    {
      id: 2,
      nickname: 'QwertyTest',
      isCreator: false,
    },
    {
      id: 3,
      nickname: 'Billy_Herrington',
      isCreator: false,
    },
    {
      id: 4,
      nickname: 'MonopolyUser',
      isCreator: false,
    },
  ];
}

export default {
  async getLobbyInfo(lobbyId: number): Promise<LobbyInfoDto> {
    return {
      id: lobbyId,
      status: LobbyStatus.WAITING_FOR_PLAYERS,
      lobbyParticipants: buildLobbyParticipantsMock(),
    };
  },
};
