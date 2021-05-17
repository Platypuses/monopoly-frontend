import LobbyWindowContent from 'components/library/lobby-window-content/LobbyWindowContent';
import LobbyParticipantDto from 'model/dto/responses/LobbyParticipantDto';
import LobbyJoinLeaveEventPayload from 'model/dto/responses/ws/payload/lobby/LobbyJoinLeaveEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';

function buildNewLobbyParticipant(
  eventPayload: LobbyJoinLeaveEventPayload
): LobbyParticipantDto {
  return {
    id: eventPayload.userId,
    nickname: eventPayload.nickname,
    isCreator: false,
  };
}

export default class LobbyJoinEventHandler implements EventHandler {
  private readonly lobbyWindowContent: typeof LobbyWindowContent;

  constructor() {
    this.lobbyWindowContent = LobbyWindowContent;
  }

  handleEvent(
    payloadDto: WebSocketPayloadDto<LobbyJoinLeaveEventPayload>
  ): void {
    const { currentLobbyInfo } = this.lobbyWindowContent;

    if (currentLobbyInfo === null) {
      return;
    }

    const { lobbyParticipants } = currentLobbyInfo;

    const newLobbyParticipant = buildNewLobbyParticipant(payloadDto.payload);
    lobbyParticipants.push(newLobbyParticipant);

    this.lobbyWindowContent.renderParticipantsList(lobbyParticipants);
  }
}
