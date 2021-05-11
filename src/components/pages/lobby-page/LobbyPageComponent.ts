import loaderSrc from 'assets/images/loader.gif';
import LobbyWindowContent from 'components/library/lobby-window-content/LobbyWindowContent';
import BasePageComponent from 'components/pages/BasePageComponent';
import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import lobbyPageTemplate from './lobby-page.hbs';

export default class LobbyPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  private _copyLobbyIdButtonElement: HTMLButtonElement | null = null;

  private _startGameButtonElement: HTMLButtonElement | null = null;

  private _exitLobbyButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this._modalWindow = BasePageComponent.htmlStringToElement(
      lobbyPageTemplate({ loaderSrc })
    );

    this.rootElement.appendChild(this._modalWindow);
  }

  displayLobbyInfo(lobbyInfo: LobbyInfoDto): void {
    LobbyWindowContent.render(lobbyInfo);
    this.setElements();
  }

  private setElements() {
    const { copyLobbyIdButtonClass } = LobbyWindowContent;
    const { startGameButtonClass } = LobbyWindowContent;
    const { exitLobbyButtonClass } = LobbyWindowContent;

    this._copyLobbyIdButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(copyLobbyIdButtonClass)[0]
    );

    this._startGameButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(startGameButtonClass)[0]
    );

    this._exitLobbyButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(exitLobbyButtonClass)[0]
    );
  }

  get modalWindow(): HTMLElement {
    return <HTMLElement>this._modalWindow;
  }

  get copyLobbyIdButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._copyLobbyIdButtonElement;
  }

  get startGameButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._startGameButtonElement;
  }

  get exitLobbyButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._exitLobbyButtonElement;
  }
}
