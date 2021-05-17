import { positionsMap } from 'components/pages/game-page/data/GameConstants';
import MoveToCellEventPayload from 'model/dto/responses/ws/payload/game/MoveToCellEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';

export default class MoveToCellEventHandler implements EventHandler {
  private readonly playerIconElementId = 'player-icon-';

  handleEvent(payloadDto: WebSocketPayloadDto<MoveToCellEventPayload>): void {
    const { payload } = payloadDto;

    const playerIconElement = document.getElementById(
      `${this.playerIconElementId}${payload.userId}`
    );

    if (playerIconElement === null) {
      return;
    }

    const { gameState } = GameStateStorage;

    if (gameState === null) {
      return;
    }

    const movingPlayer = gameState.players.find(
      (player) => player.playerId === payload.userId
    );

    if (movingPlayer === undefined) {
      return;
    }

    const newPlayerPosition = positionsMap
      .get(payload.cellId)
      ?.get(movingPlayer.moveOrder);

    if (newPlayerPosition === undefined) {
      return;
    }

    playerIconElement.style.top = `${newPlayerPosition.top}px`;
    playerIconElement.style.left = `${newPlayerPosition.left}px`;
  }
}
