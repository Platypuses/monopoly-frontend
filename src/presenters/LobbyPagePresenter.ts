import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import LobbyPageComponent from 'components/pages/lobby-page/LobbyPageComponent';
import LobbyApi from 'model/api/LobbyApi';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import MainMenuPagePresenter from 'presenters/MainMenuPagePresenter';
import Presenter from 'presenters/Presenter';
import PageArgsUtils from 'presenters/utils/PageArgsUtils';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class LobbyPagePresenter implements Presenter {
  private pageComponent = new LobbyPageComponent();

  private mainPagePresenter: MainMenuPagePresenter;

  constructor(mainPagePresenter: MainMenuPagePresenter) {
    this.mainPagePresenter = mainPagePresenter;
  }

  async initAndRenderView(args: string[]): Promise<void> {
    if (SecurityContextStorage.isUserNotAuthorized()) {
      throw new UnauthorizedError();
    }

    const lobbyId = PageArgsUtils.extractId(args);

    if (lobbyId === null) {
      Router.goToRoute(RoutesEnum.MAIN_MENU);
      return;
    }

    await this.mainPagePresenter.initAndRenderView();
    this.pageComponent.render();

    setTimeout(
      () => ModalWindowComponent.openWindow(this.pageComponent.modalWindow),
      100
    );

    const lobbyInfo = await LobbyApi.getLobbyInfo(lobbyId);
    LobbyPageComponent.displayLobbyInfo(lobbyInfo);

    // this.initHandlers();
  }

  // private initHandlers() {}
}
