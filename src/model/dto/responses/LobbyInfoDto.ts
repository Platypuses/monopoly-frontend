import LobbyParticipantDto from 'model/dto/responses/LobbyParticipantDto';
import LobbyStatus from 'model/dto/responses/LobbyStatus';

export default interface LobbyInfoDto {
  id: number;
  status: LobbyStatus;
  lobbyParticipants: LobbyParticipantDto[];
}
