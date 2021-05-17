/* eslint-disable @typescript-eslint/ban-ts-comment */

import WebSocketEventEnum from 'model/dto/responses/ws/WebSocketEventEnum';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import CurrentMovePlayerChangeEventHandler from 'model/event-handlers/game/CurrentMovePlayerChangeEventHandler';
import GameStartEventHandler from 'model/event-handlers/game/GameStartEventHandler';
import MoveToCellEventHandler from 'model/event-handlers/game/MoveToCellEventHandler';
import PlayerAcceptPurchaseOfferEventHandler from 'model/event-handlers/game/PlayerAcceptPurchaseOfferEventHandler';
import PlayerBalanceChangeEventHandler from 'model/event-handlers/game/PlayerBalanceChangeEventHandler';
import PlayerDeclinePurchaseEventHandler from 'model/event-handlers/game/PlayerDeclinePurchaseEventHandler';
import PlayerOnChanceCellEventHandler from 'model/event-handlers/game/PlayerOnChanceCellEventHandler';
import PlayerOnTaxCellEventHandler from 'model/event-handlers/game/PlayerOnTaxCellEventHandler';
import PlayerOnVacantPropertyEventHandler from 'model/event-handlers/game/PlayerOnVacantPropertyEventHandler';
import PlayerPurchaseOfferEventHandler from 'model/event-handlers/game/PlayerPurchaseOfferEventHandler';
import RollDicesEventHandler from 'model/event-handlers/game/RollDicesEventHandler';
import LobbyDissolveEventHandler from 'model/event-handlers/lobby/LobbyDissolveEventHandler';
import LobbyJoinEventHandler from 'model/event-handlers/lobby/LobbyJoinEventHandler';
import LobbyLeaveEventHandler from 'model/event-handlers/lobby/LobbyLeaveEventHandler';
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
eventHandlers.set(
  WebSocketEventEnum.START_OF_THE_GAME,
  new GameStartEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.CURRENT_MOVE_PLAYER_CHANGE,
  new CurrentMovePlayerChangeEventHandler()
);
eventHandlers.set(WebSocketEventEnum.ROLL_DICES, new RollDicesEventHandler());
eventHandlers.set(
  WebSocketEventEnum.MOVE_TO_CELL,
  new MoveToCellEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PROPERTY_PURCHASE_OFFER,
  new PlayerPurchaseOfferEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_ACCEPT_PURCHASE_OFFER,
  new PlayerAcceptPurchaseOfferEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_BALANCE_CHANGE,
  new PlayerBalanceChangeEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_DECLINE_PURCHASE_OFFER,
  new PlayerDeclinePurchaseEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_ON_CHANCE_CELL,
  new PlayerOnChanceCellEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_ON_TAX_CELL,
  new PlayerOnTaxCellEventHandler()
);
eventHandlers.set(
  WebSocketEventEnum.PLAYER_ON_VACANT_PROPERTY,
  new PlayerOnVacantPropertyEventHandler()
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
