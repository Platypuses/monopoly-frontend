import GamePageComponent from 'components/pages/game-page/GamePageComponent';
import GameApi from 'model/api/GameApi';
import UnauthorizedError from 'model/error/UnauthorizedError';
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
    this.pageComponent.render(gameState);
  }
}
