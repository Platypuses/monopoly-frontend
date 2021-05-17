import GameLogComponent from 'components/pages/game-page/GameLogComponent';
import CurrentMovePlayerChangeEventPayload from 'model/dto/responses/ws/payload/game/CurrentMovePlayerChangeEventPayload';
import WebSocketPayloadDto from 'model/dto/responses/ws/WebSocketPayloadDto';
import EventHandler from 'model/event-handlers/EventHandler';
import GameStateStorage from 'model/storage/GameStateStorage';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';

const rollDicesActionContainerClass = 'roll-dices-action-container';

function showRollDicesButtons() {
  const rollDicesActionContainerElement = <HTMLElement>(
    document.getElementsByClassName(rollDicesActionContainerClass)[0]
  );

  rollDicesActionContainerElement.style.display = 'flex';
}

export default class CurrentMovePlayerChangeEventHandler
  implements EventHandler
{
  private readonly playerBalanceElementId = 'player-balance-';

  handleEvent(
    payloadDto: WebSocketPayloadDto<CurrentMovePlayerChangeEventPayload>
  ): void {
    const { userId } = payloadDto.payload;

    const interval = setInterval(() => {
      const playerBalanceElement = document.getElementById(
        this.playerBalanceElementId + userId
      );

      if (playerBalanceElement === null) {
        return;
      }

      clearInterval(interval);

      const { userInfo } = SecurityContextStorage;

      if (userInfo === null) {
        return;
      }

      if (userInfo.id === userId) {
        showRollDicesButtons();
      }

      const { gamePageData } = GameStateStorage;

      if (gamePageData === null) {
        return;
      }

      const foundPlayer = gamePageData.players.find(
        (player) => player.id === payloadDto.payload.userId
      );

      if (foundPlayer === undefined) {
        return;
      }

      const nicknameSpanElement = document.createElement('span');
      nicknameSpanElement.classList.add('nickname-in-log-text');
      nicknameSpanElement.style.color = foundPlayer.color;
      nicknameSpanElement.textContent = foundPlayer.nickname;

      const spanElement = document.createElement('span');
      spanElement.innerHTML = `Ход переходит к игроку ${nicknameSpanElement.outerHTML}`;
      GameLogComponent.addMessageToLog(spanElement);
    }, 500);
  }
}
