import BasePageComponent from 'components/pages/BasePageComponent';
import joinLobbyPageTemplate from './join-lobby-page.hbs';
import './join-lobby-page.scss';

const lobbyIdFieldId = 'lobby-id';
const joinLobbyButtonClass = 'join-lobby-button';

export default class JoinLobbyPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  private _lobbyIdFieldElement: HTMLInputElement | null = null;

  private _joinLobbyButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setElements();
  }

  private renderPageContent() {
    this._modalWindow = BasePageComponent.htmlStringToElement(
      joinLobbyPageTemplate()
    );

    this.rootElement.appendChild(this._modalWindow);
  }

  private setElements() {
    this._lobbyIdFieldElement = <HTMLInputElement>(
      document.getElementById(lobbyIdFieldId)
    );

    this._joinLobbyButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(joinLobbyButtonClass)[0]
    );
  }

  get modalWindow(): HTMLElement {
    return <HTMLElement>this._modalWindow;
  }

  get lobbyIdFieldElement(): HTMLInputElement {
    return <HTMLInputElement>this._lobbyIdFieldElement;
  }

  get joinLobbyButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._joinLobbyButtonElement;
  }
}
