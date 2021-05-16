import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';

export default interface EventHandler {
  handleEvent(payloadDto: WebSocketPayloadDto<unknown>): void;
}
