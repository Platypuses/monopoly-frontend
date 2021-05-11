import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import JoinLobbyPageComponent from 'components/pages/join-lobby-page/JoinLobbyPageComponent';
import ErrorHandler from 'model/error/ErrorHandler';
import UnauthorizedError from 'model/error/UnauthorizedError';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import JoinLobbyRequestValidator from 'model/validators/JoinLobbyRequestValidator';
import MainMenuPagePresenter from 'presenters/MainMenuPagePresenter';
import Presenter from 'presenters/Presenter';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class JoinLobbyPagePresenter implements Presenter {
  private pageComponent = new JoinLobbyPageComponent();

  private mainPagePresenter: MainMenuPagePresenter;

  constructor(mainPagePresenter: MainMenuPagePresenter) {
    this.mainPagePresenter = mainPagePresenter;
  }

  async initAndRenderView(): Promise<void> {
    if (SecurityContextStorage.isUserNotAuthorized()) {
      throw new UnauthorizedError();
    }

    await this.mainPagePresenter.initAndRenderView();
    this.pageComponent.render();

    setTimeout(
      () => ModalWindowComponent.openWindow(this.pageComponent.modalWindow),
      100
    );

    this.initHandlers();
  }

  private initHandlers() {
    const { modalWindow } = this.pageComponent;

    modalWindow.onmousedown = (event) =>
      ModalWindowComponent.handleClick(
        event,
        modalWindow,
        RoutesEnum.MAIN_MENU
      );

    this.pageComponent.joinLobbyButtonElement.onclick = async () => {
      this.pageComponent.joinLobbyButtonElement.disabled = true;

      await JoinLobbyPagePresenter.handleJoinButtonClick(
        this.pageComponent
      ).catch(ErrorHandler.handleError);

      this.pageComponent.joinLobbyButtonElement.disabled = false;
    };
  }

  private static async handleJoinButtonClick(
    pageComponent: JoinLobbyPageComponent
  ) {
    const lobbyId = pageComponent.lobbyIdFieldElement.value.trim();
    JoinLobbyRequestValidator.validate(lobbyId);
    // TODO: call API method

    Router.goToRoute(RoutesEnum.LOBBY, [lobbyId]);
  }
}
