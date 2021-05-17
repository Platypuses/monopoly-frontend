import BasePageComponent from 'components/pages/BasePageComponent';
import GameDataConverter from 'components/pages/game-page/GameDataConverter';
import GameFieldComponent from 'components/pages/game-page/GameFieldComponent';
import GameStateDto from 'model/dto/responses/GameStateDto';
import gamePageTemplate from './game-page.hbs';
import './game-page.scss';

const rollDicesActionContainerClass = 'roll-dices-action-container';
const purchaseActionContainerClass = 'property-purchase-action-container';
const rollDicesButtonClass = 'roll-dices-button';
const acceptPurchaseButtonClass = 'accept-purchase-button';
const declinePurchaseButtonClass = 'decline-purchase-button';

export default class GamePageComponent extends BasePageComponent {
  private _rollDicesActionContainerElement: HTMLElement | null = null;

  private _rollDicesButtonElement: HTMLButtonElement | null = null;

  private _purchaseActionContainerElement: HTMLElement | null = null;

  private _acceptPurchaseButtonElement: HTMLButtonElement | null = null;

  private _declinePurchaseButtonElement: HTMLButtonElement | null = null;

  render(gameState: GameStateDto): void {
    const gamePageData = GameDataConverter.buildGamePageData(gameState);
    const gameFieldHtml = GameFieldComponent.render(gamePageData);

    this.rootElement.innerHTML = gamePageTemplate({
      gamePageData,
      gameFieldHtml,
    });

    this._rollDicesActionContainerElement = <HTMLElement>(
      document.getElementsByClassName(rollDicesActionContainerClass)[0]
    );
    this._rollDicesButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(rollDicesButtonClass)[0]
    );

    this._purchaseActionContainerElement = <HTMLElement>(
      document.getElementsByClassName(purchaseActionContainerClass)[0]
    );
    this._acceptPurchaseButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(acceptPurchaseButtonClass)[0]
    );
    this._declinePurchaseButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(declinePurchaseButtonClass)[0]
    );
  }

  hideRollDicesActionContainer(): void {
    if (this._rollDicesActionContainerElement === null) {
      return;
    }

    this._rollDicesActionContainerElement.style.display = 'none';
  }

  hidePurchaseActionContainer(): void {
    if (this._purchaseActionContainerElement === null) {
      return;
    }

    this._purchaseActionContainerElement.style.display = 'none';
  }

  get rollDicesButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._rollDicesButtonElement;
  }

  get acceptPurchaseButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._acceptPurchaseButtonElement;
  }

  get declinePurchaseButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._declinePurchaseButtonElement;
  }
}
