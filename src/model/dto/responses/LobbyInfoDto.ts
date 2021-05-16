import LobbyParticipantDto from 'model/dto/responses/LobbyParticipantDto';

export default interface LobbyInfoDto {
  id: number;
  lobbyParticipants: LobbyParticipantDto[];
}
