import PlayerBalanceChangeEventPayload from 'model/dto/responses/ws/payload/game/PlayerBalanceChangeEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';

export default class PlayerBalanceChangeEventHandler implements EventHandler {
  private readonly balanceElementId = 'player-balance-';

  handleEvent(
    payloadDto: WebSocketPayloadDto<PlayerBalanceChangeEventPayload>
  ): void {
    const element = <HTMLElement>(
      document.getElementById(
        `${this.balanceElementId}${payloadDto.payload.playerId}`
      )
    );

    if (element === null) {
      return;
    }

    const currentBalanceText = element.textContent;

    if (currentBalanceText === null) {
      return;
    }

    const currentBalance = Number.parseInt(currentBalanceText, 10);
    const newBalance = currentBalance + payloadDto.payload.balanceDelta;

    element.textContent = newBalance.toString();
  }
}
