import GameLogComponent from 'components/pages/game-page/GameLogComponent';
import PlayerDeclinePurchaseEventPayload from 'model/dto/responses/ws/payload/game/PlayerDeclinePurchaseEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';

export default class PlayerDeclinePurchaseEventHandler implements EventHandler {
  // eslint-disable-next-line class-methods-use-this
  handleEvent(
    payloadDto: WebSocketPayloadDto<PlayerDeclinePurchaseEventPayload>
  ): void {
    const { gamePageData } = GameStateStorage;

    if (gamePageData === null) {
      return;
    }

    const foundPlayer = gamePageData.players.find(
      (player) => player.id === payloadDto.payload.playerId
    );

    if (foundPlayer === undefined) {
      return;
    }

    const nicknameSpanElement = document.createElement('span');
    nicknameSpanElement.classList.add('nickname-in-log-text');
    nicknameSpanElement.style.color = foundPlayer.color;
    nicknameSpanElement.textContent = foundPlayer.nickname;

    const spanElement = document.createElement('span');
    spanElement.innerHTML = `Игрок ${nicknameSpanElement.outerHTML} отказывается от покупки`;
    GameLogComponent.addMessageToLog(spanElement);
  }
}
