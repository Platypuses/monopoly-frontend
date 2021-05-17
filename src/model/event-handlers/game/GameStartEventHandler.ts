import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import GameStartEventPayload from 'model/dto/responses/ws/payload/game/GameStartEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class GameStartEventHandler implements EventHandler {
  private readonly modalWindowClass = 'modal-window';

  handleEvent(payloadDto: WebSocketPayloadDto<GameStartEventPayload>): void {
    const elementsList = document.getElementsByClassName(this.modalWindowClass);
    if (elementsList.length === 0) {
      return;
    }

    const modalWindow = <HTMLElement>elementsList[0];
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(
      () =>
        Router.goToRoute(RoutesEnum.GAME, [
          payloadDto.payload.gameId.toString(),
        ]),
      300
    );
  }
}
