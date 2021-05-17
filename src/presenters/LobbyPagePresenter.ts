import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import LobbyPageComponent from 'components/pages/lobby-page/LobbyPageComponent';
import GameApi from 'model/api/GameApi';
import LobbyApi from 'model/api/LobbyApi';
import ErrorHandler from 'model/error/ErrorHandler';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import MainMenuPagePresenter from 'presenters/MainMenuPagePresenter';
import Presenter from 'presenters/Presenter';
import PageUtils from 'presenters/utils/PageUtils';
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

    const lobbyId = PageUtils.extractIdFromArgs(args);

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

    try {
      const lobbyInfo = await LobbyApi.getLobbyInfo(lobbyId);
      this.pageComponent.displayLobbyInfo(lobbyInfo);
    } catch (e) {
      ErrorHandler.handleError(e);
      Router.goToRoute(RoutesEnum.MAIN_MENU);
      return;
    }

    this.initHandlers(lobbyId);
  }

  private initHandlers(lobbyId: number) {
    this.pageComponent.copyLobbyIdButtonElement.onclick = async () =>
      LobbyPagePresenter.handleCopyLobbyIdButtonClick(lobbyId).catch(
        ErrorHandler.handleError
      );

    this.pageComponent.startGameButtonElement.onclick = async () =>
      LobbyPagePresenter.handleStartGameButtonClick(this.pageComponent).catch(
        ErrorHandler.handleError
      );

    this.pageComponent.exitLobbyButtonElement.onclick = async () =>
      LobbyPagePresenter.handleExitLobbyButtonClick(this.pageComponent).catch(
        ErrorHandler.handleError
      );
  }

  private static async handleCopyLobbyIdButtonClick(lobbyId: number) {
    await navigator.clipboard.writeText(lobbyId.toString());
    alert('ID лобби успешно скопировано');
  }

  private static async handleStartGameButtonClick(
    pageComponent: LobbyPageComponent
  ) {
    const gameState = await GameApi.startGame();

    ModalWindowComponent.closeWindow(pageComponent.modalWindow);
    setTimeout(
      () => Router.goToRoute(RoutesEnum.GAME, [gameState.gameId.toString()]),
      300
    );
  }

  private static async handleExitLobbyButtonClick(
    pageComponent: LobbyPageComponent
  ) {
    await LobbyApi.exitLobby();
    ModalWindowComponent.closeWindow(pageComponent.modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.MAIN_MENU), 300);
  }
}
