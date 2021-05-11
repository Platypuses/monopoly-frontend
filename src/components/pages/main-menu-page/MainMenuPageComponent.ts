import backgroundImageSrc from 'assets/images/background.jpg';
import createLobbyIconSrc from 'assets/images/main-menu/create-lobby-icon.png';
import joinLobbyIconSrc from 'assets/images/main-menu/join-lobby-icon.png';
import logoutIconSrc from 'assets/images/main-menu/logout-icon.png';
import BasePageComponent from 'components/pages/BasePageComponent';
import mainMenuPageTemplate from './main-menu-page.hbs';
import './main-menu-page.scss';

const logoutButtonClass = 'logout-button';
const createLobbyButtonClass = 'create-lobby-button';
const openJoinLobbyWindowButtonClass = 'open-join-lobby-window-button';

export default class MainMenuPageComponent extends BasePageComponent {
  private _logoutButtonElement: HTMLElement | null = null;

  private _createLobbyButtonElement: HTMLButtonElement | null = null;

  private _openJoinLobbyWindowButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setElements();
  }

  private renderPageContent() {
    this.rootElement.innerHTML = mainMenuPageTemplate({
      backgroundImageSrc,
      logoutIconSrc,
      createLobbyIconSrc,
      joinLobbyIconSrc,
    });
  }

  private setElements() {
    this._logoutButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(logoutButtonClass)[0]
    );

    this._createLobbyButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(createLobbyButtonClass)[0]
    );

    this._openJoinLobbyWindowButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(openJoinLobbyWindowButtonClass)[0]
    );
  }

  get logoutButtonElement(): HTMLElement {
    return <HTMLElement>this._logoutButtonElement;
  }

  get createLobbyButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._createLobbyButtonElement;
  }

  get openJoinLobbyWindowButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._openJoinLobbyWindowButtonElement;
  }
}
