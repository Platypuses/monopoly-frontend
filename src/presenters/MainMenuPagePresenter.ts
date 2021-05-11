import MainMenuPageComponent from 'components/pages/main-menu-page/MainMenuPageComponent';
import ErrorHandler from 'model/error/ErrorHandler';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import Presenter from 'presenters/Presenter';
import PageUtils from 'presenters/utils/PageUtils';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class MainMenuPagePresenter implements Presenter {
  private pageComponent = new MainMenuPageComponent();

  async initAndRenderView(): Promise<void> {
    if (SecurityContextStorage.isUserNotAuthorized()) {
      throw new UnauthorizedError();
    }

    this.pageComponent.render();

    this.pageComponent.logoutButtonElement.onclick = () =>
      MainMenuPagePresenter.handleLogoutButtonClick();

    this.pageComponent.createLobbyButtonElement.onclick = async () =>
      MainMenuPagePresenter.handleCreateLobbyButtonClick().catch(
        ErrorHandler.handleError
      );

    this.pageComponent.openJoinLobbyWindowButtonElement.onclick = () =>
      MainMenuPagePresenter.handleOpenJoinLobbyWindowButtonClick();
  }

  private static handleLogoutButtonClick() {
    PageUtils.logout();
  }

  private static async handleCreateLobbyButtonClick() {
    const lobbyId = 1; // TODO: get lobby id from API
    Router.goToRoute(RoutesEnum.LOBBY, [lobbyId.toString()]);
  }

  private static handleOpenJoinLobbyWindowButtonClick() {
    Router.goToRoute(RoutesEnum.JOIN_LOBBY);
  }
}
