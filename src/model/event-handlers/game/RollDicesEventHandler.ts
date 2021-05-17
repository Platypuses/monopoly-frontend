import RollDicesEventPayload from 'model/dto/responses/ws/payload/game/RollDicesEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';

export default class RollDicesEventHandler implements EventHandler {
  // eslint-disable-next-line class-methods-use-this
  handleEvent(payloadDto: WebSocketPayloadDto<RollDicesEventPayload>): void {
    // TODO: Show dices info in game log
    console.log(payloadDto);
  }
}
