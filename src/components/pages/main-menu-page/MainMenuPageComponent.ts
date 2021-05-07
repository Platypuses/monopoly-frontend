import backgroundImageUrl from 'assets/images/background.jpg';
import createLobbyIcon from 'assets/images/create-lobby-icon.png';
import joinLobbyIcon from 'assets/images/join-lobby-icon.png';
import BasePageComponent from 'components/pages/BasePageComponent';
import mainMenuPageTemplate from './main-menu-page.hbs';
import './main-menu-page.scss';

const pageHeaderClass = 'main-menu-page-header';
const createLobbyIconContainerClass = 'create-lobby-icon-container';
const joinLobbyIconContainerClass = 'join-lobby-icon-container';

const iconSize = 82;

const createLobbyButtonClass = 'create-lobby-button4';
const joinLobbyButtonClass = 'join-lobby-button';

function addActionIcon(iconContainerClass: string, iconSrc: string) {
  const iconContainer = <HTMLElement>(
    document.getElementsByClassName(iconContainerClass)[0]
  );

  const icon = new Image();
  icon.src = iconSrc;
  icon.width = iconSize;
  icon.height = iconSize;
  iconContainer.appendChild(icon);
}

export default class MainMenuPageComponent extends BasePageComponent {
  private _createLobbyButtonElement: HTMLButtonElement | null = null;

  private _joinLobbyButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this.renderPageContent();
    MainMenuPageComponent.setHeaderBackgroundImage();
    this.setElements();
  }

  private renderPageContent() {
    this.rootElement.innerHTML = mainMenuPageTemplate();
    addActionIcon(createLobbyIconContainerClass, createLobbyIcon);
    addActionIcon(joinLobbyIconContainerClass, joinLobbyIcon);
  }

  private static setHeaderBackgroundImage() {
    const pageRootElement = <HTMLElement>(
      document.getElementsByClassName(pageHeaderClass)[0]
    );

    pageRootElement.style.backgroundImage = `url(${backgroundImageUrl})`;
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
