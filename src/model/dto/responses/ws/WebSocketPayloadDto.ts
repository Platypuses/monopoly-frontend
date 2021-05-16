import WebSocketEventEnum from 'model/dto/responses/ws/WebSocketEventEnum';

export default interface WebSocketPayloadDto<PayloadType> {
  event: WebSocketEventEnum;
  payload: PayloadType;
}
