/* eslint-disable @typescript-eslint/ban-ts-comment */

import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayload';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

const backendWebSocketBaseUrl =
  // @ts-ignore
  window.env?.BACKEND_WEBSOCKET_BASE_URL ?? 'wss://monopoly-api.casper.by/ws';

let webSocket: WebSocket | null = null;

function onCloseCallback() {
  alert('Ошибка соединения с сервером. Обновите страницу');
}

function onMessageCallback(event: MessageEvent) {
  const result = <WebSocketPayloadDto<unknown>>JSON.parse(event.data);
  console.log(result);
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
