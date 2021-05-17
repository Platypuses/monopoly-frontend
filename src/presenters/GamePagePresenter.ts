import GamePageComponent from 'components/pages/game-page/GamePageComponent';
import GameApi from 'model/api/GameApi';
import ErrorHandler from 'model/error/ErrorHandler';
import UnauthorizedError from 'model/error/UnauthorizedError';
import GameStateStorage from 'model/storage/GameStateStorage';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import Presenter from 'presenters/Presenter';
import PageUtils from 'presenters/utils/PageUtils';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class GamePagePresenter implements Presenter {
  private pageComponent = new GamePageComponent();

  async initAndRenderView(args: string[]): Promise<void> {
    if (SecurityContextStorage.isUserNotAuthorized()) {
      throw new UnauthorizedError();
    }

    const gameId = PageUtils.extractIdFromArgs(args);

    if (gameId === null) {
      Router.goToRoute(RoutesEnum.MAIN_MENU);
      return;
    }

    const gameState = await GameApi.getGameState(gameId);
    GameStateStorage.saveGameState(gameState);
    this.pageComponent.render(gameState);

    this.pageComponent.rollDicesButtonElement.onclick = async () => {
      this.pageComponent.rollDicesButtonElement.disabled = true;

      await GamePagePresenter.handleRollDicesButtonClick(
        this.pageComponent
      ).catch(ErrorHandler.handleError);

      this.pageComponent.rollDicesButtonElement.disabled = false;
    };

    this.pageComponent.acceptPurchaseButtonElement.onclick = async () => {
      this.pageComponent.acceptPurchaseButtonElement.disabled = true;

      await GamePagePresenter.handleAcceptPurchaseButtonClick(
        this.pageComponent
      ).catch(ErrorHandler.handleError);

      this.pageComponent.acceptPurchaseButtonElement.disabled = false;
    };

    this.pageComponent.declinePurchaseButtonElement.onclick = async () => {
      this.pageComponent.declinePurchaseButtonElement.disabled = true;

      await GamePagePresenter.handleDeclinePurchaseButtonClick(
        this.pageComponent
      ).catch(ErrorHandler.handleError);

      this.pageComponent.declinePurchaseButtonElement.disabled = false;
    };
  }

  private static async handleRollDicesButtonClick(
    pageComponent: GamePageComponent
  ) {
    await GameApi.rollDices();
    pageComponent.hideRollDicesActionContainer();
  }

  private static async handleAcceptPurchaseButtonClick(
    pageComponent: GamePageComponent
  ) {
    await GameApi.acceptPurchase();
    pageComponent.hidePurchaseActionContainer();
  }

  private static async handleDeclinePurchaseButtonClick(
    pageComponent: GamePageComponent
  ) {
    await GameApi.declinePurchase();
    pageComponent.hidePurchaseActionContainer();
  }
}
