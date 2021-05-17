import LobbyWindowContent from 'components/library/lobby-window-content/LobbyWindowContent';
import LobbyJoinLeaveEventPayload from 'model/dto/responses/ws/payload/lobby/LobbyJoinLeaveEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';

export default class LobbyLeaveEventHandler implements EventHandler {
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

    const lobbyParticipants = currentLobbyInfo.lobbyParticipants.filter(
      (participant) => participant.id !== payloadDto.payload.userId
    );

    this.lobbyWindowContent.renderParticipantsList(lobbyParticipants);
  }
}
