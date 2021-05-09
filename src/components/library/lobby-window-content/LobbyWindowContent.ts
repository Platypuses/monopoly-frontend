import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import lobbyWindowContentTemplate from './lobby-window-content.hbs';
import './lobby-window-content.scss';

const windowContentClass = 'lobby-modal-window-content';

export default {
  render(lobbyInfo: LobbyInfoDto): void {
    console.log(lobbyInfo);

    const windowContentElement = <HTMLElement>(
      document.getElementsByClassName(windowContentClass)[0]
    );

    windowContentElement.innerHTML = lobbyWindowContentTemplate({ lobbyInfo });
  },
};
