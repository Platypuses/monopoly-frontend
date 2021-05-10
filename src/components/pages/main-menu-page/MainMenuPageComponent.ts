import backgroundImageSrc from 'assets/images/background.jpg';
import createLobbyIconSrc from 'assets/images/main-menu/create-lobby-icon.png';
import joinLobbyIconSrc from 'assets/images/main-menu/join-lobby-icon.png';
import BasePageComponent from 'components/pages/BasePageComponent';
import mainMenuPageTemplate from './main-menu-page.hbs';
import './main-menu-page.scss';

const createLobbyButtonClass = 'create-lobby-button';
const joinLobbyButtonClass = 'join-lobby-button';

export default class MainMenuPageComponent extends BasePageComponent {
  private _createLobbyButtonElement: HTMLButtonElement | null = null;

  private _joinLobbyButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setElements();
  }

  private renderPageContent() {
    this.rootElement.innerHTML = mainMenuPageTemplate({
      backgroundImageSrc,
      createLobbyIconSrc,
      joinLobbyIconSrc,
    });
  }

  private setElements() {
    this._createLobbyButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(createLobbyButtonClass)[0]
    );

    this._joinLobbyButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(joinLobbyButtonClass)[0]
    );
  }

  get createLobbyButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._createLobbyButtonElement;
  }

  get joinLobbyButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._joinLobbyButtonElement;
  }
}
