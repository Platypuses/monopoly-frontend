import GameDataConverter from 'components/pages/game-page/GameDataConverter';
import GameFieldComponent from 'components/pages/game-page/GameFieldComponent';
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
    console.log(payloadDto);
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
  }
}
