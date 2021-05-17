import CellData from 'components/pages/game-page/data/CellData';
import GameDataConverter from 'components/pages/game-page/GameDataConverter';
import GameFieldComponent from 'components/pages/game-page/GameFieldComponent';
import GameLogComponent from 'components/pages/game-page/GameLogComponent';
import GameApi from 'model/api/GameApi';
import PlayerPurchaseOfferEventPayload from 'model/dto/responses/ws/payload/game/PlayerPurchaseOfferEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import ErrorHandler from 'model/error/ErrorHandler';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';

export default class PlayerAcceptPurchaseOfferEventHandler
  implements EventHandler
{
  // eslint-disable-next-line class-methods-use-this
  handleEvent(
    payloadDto: WebSocketPayloadDto<PlayerPurchaseOfferEventPayload>
  ): void {
    const { gameState } = GameStateStorage;

    if (gameState === null) {
      return;
    }

    GameApi.getGameState(gameState.gameId)
      .then((state) =>
        GameFieldComponent.renderToPage(
          GameDataConverter.buildGamePageData(state)
        )
      )
      .catch(ErrorHandler.handleError);

    const { gamePageData } = GameStateStorage;

    if (gamePageData === null) {
      return;
    }

    const cellData = <CellData>(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      gamePageData.cells[`n${payloadDto.payload.cellId}`]
    );

    const spanElement = document.createElement('span');
    spanElement.innerHTML = `Игрок купил ${cellData.name}`;
    GameLogComponent.addMessageToLog(spanElement);
  }
}
