/* eslint-disable @typescript-eslint/ban-ts-comment */

import WebSocketEventEnum from 'model/dto/responses/ws/WebSocketEventEnum';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import LobbyDissolveEventHandler from 'model/event-handlers/LobbyDissolveEventHandler';
import LobbyJoinEventHandler from 'model/event-handlers/LobbyJoinEventHandler';
import LobbyLeaveEventHandler from 'model/event-handlers/LobbyLeaveEventHandler';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

const backendWebSocketBaseUrl =
  // @ts-ignore
  window.env?.BACKEND_WEBSOCKET_BASE_URL ?? 'wss://monopoly-api.casper.by/ws';

let webSocket: WebSocket | null = null;

const eventHandlers = new Map<WebSocketEventEnum, EventHandler>();
eventHandlers.set(WebSocketEventEnum.LOBBY_JOIN, new LobbyJoinEventHandler());
eventHandlers.set(WebSocketEventEnum.LOBBY_LEAVE, new LobbyLeaveEventHandler());
eventHandlers.set(
  WebSocketEventEnum.LOBBY_DISSOLVE,
  new LobbyDissolveEventHandler()
);

function onCloseCallback() {
  alert('Ошибка соединения с сервером. Обновите страницу');
}

function onMessageCallback(event: MessageEvent) {
  const payloadDto = <WebSocketPayloadDto<unknown>>JSON.parse(event.data);
  const handler = eventHandlers.get(payloadDto.event);

  if (handler === undefined) {
    return;
  }

  handler.handleEvent(payloadDto);
}

export default {
  initWebSocket(): void {
    const { accessToken } = SecurityContextStorage;

    if (accessToken === null) {
      return;
    }

    webSocket = new WebSocket(
      `${backendWebSocketBaseUrl}?accessToken=${accessToken}`
    );

    webSocket.onclose = onCloseCallback;
    webSocket.onmessage = onMessageCallback;
  },

  closeWebSocket(): void {
    if (webSocket === null) {
      return;
    }

    webSocket.onclose = null;
    webSocket.close();
  },
};
