import CellData from 'components/pages/game-page/data/CellData';
import GameLogComponent from 'components/pages/game-page/GameLogComponent';
import PlayerOnVacantPropertyEventPayload from 'model/dto/responses/ws/payload/game/PlayerOnVacantPropertyEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';

export default class PlayerOnVacantPropertyEventHandler
  implements EventHandler
{
  // eslint-disable-next-line class-methods-use-this
  handleEvent(
    payloadDto: WebSocketPayloadDto<PlayerOnVacantPropertyEventPayload>
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

    const cellData = <CellData>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gamePageData.cells[`n${payloadDto.payload.cellId}`]
    );

    const spanElement = document.createElement('span');
    spanElement.innerHTML = `Игрок ${nicknameSpanElement.outerHTML} попадает на поле ${cellData.name} и задумывается о покупке`;
    GameLogComponent.addMessageToLog(spanElement);
  }
}
