import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import LoginPageComponent from 'components/pages/login-page/LoginPageComponent';
import AuthApi from 'model/api/AuthApi';
import WebSocketApi from 'model/api/WebSocketApi';
import ErrorHandler from 'model/error/ErrorHandler';
import MainPagePresenter from 'presenters/MainPagePresenter';
import Presenter from 'presenters/Presenter';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class LoginPagePresenter implements Presenter {
  private pageComponent = new LoginPageComponent();

  private mainPagePresenter: MainPagePresenter;

  constructor(mainPagePresenter: MainPagePresenter) {
    this.mainPagePresenter = mainPagePresenter;
  }

  async initAndRenderView(): Promise<void> {
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
      ModalWindowComponent.handleClick(event, modalWindow, RoutesEnum.MAIN);

    this.pageComponent.goToRegistrationTextElement.onclick = () =>
      LoginPagePresenter.handleGoToRegistrationTextClick(modalWindow);

    this.pageComponent.loginButtonElement.onclick = async () => {
      this.pageComponent.loginButtonElement.disabled = true;

      await LoginPagePresenter.handleLoginButtonClick(this.pageComponent).catch(
        ErrorHandler.handleError
      );

      this.pageComponent.loginButtonElement.disabled = false;
    };
  }

  private static handleGoToRegistrationTextClick(modalWindow: HTMLElement) {
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.REGISTRATION), 300);
  }

  private static async handleLoginButtonClick(
    pageComponent: LoginPageComponent
  ) {
    const nickname = pageComponent.nicknameFieldElement.value.trim();
    const password = pageComponent.passwordFieldElement.value.trim();
    await AuthApi.authUser({ nickname, password });

    Router.goToRoute(RoutesEnum.MAIN_MENU);
    WebSocketApi.initWebSocket();
  }
}
