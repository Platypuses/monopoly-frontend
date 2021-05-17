import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import LobbyDissolveEventPayload from 'model/dto/responses/ws/payload/lobby/LobbyDissolveEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

function isNotLobbyPageRoute(lobbyId: number): boolean {
  const { currentRoute } = Router;

  return currentRoute !== `${RoutesEnum.LOBBY}/${lobbyId}`;
}

export default class LobbyDissolveEventHandler implements EventHandler {
  private readonly modalWindowClass = 'modal-window';

  handleEvent(
    payloadDto: WebSocketPayloadDto<LobbyDissolveEventPayload>
  ): void {
    if (isNotLobbyPageRoute(payloadDto.payload.lobbyId)) {
      return;
    }

    const elementsList = document.getElementsByClassName(this.modalWindowClass);
    if (elementsList.length === 0) {
      return;
    }

    const modalWindow = <HTMLElement>elementsList[0];

    alert('Лобби распущено');
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.MAIN_MENU), 300);
  }
}
