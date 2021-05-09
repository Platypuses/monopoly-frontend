import loaderSrc from 'assets/images/loader.gif';
import LobbyWindowContent from 'components/library/lobby-window-content/LobbyWindowContent';
import BasePageComponent from 'components/pages/BasePageComponent';
import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import lobbyPageTemplate from './lobby-page.hbs';

export default class LobbyPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  render(): void {
    this.renderPageContent();
  }

  private renderPageContent() {
    this._modalWindow = BasePageComponent.htmlStringToElement(
      lobbyPageTemplate({ loaderSrc })
    );

    this.rootElement.appendChild(this._modalWindow);
  }

  static displayLobbyInfo(lobbyInfo: LobbyInfoDto): void {
    LobbyWindowContent.render(lobbyInfo);
  }

  get modalWindow(): HTMLElement {
    return <HTMLElement>this._modalWindow;
  }
}
