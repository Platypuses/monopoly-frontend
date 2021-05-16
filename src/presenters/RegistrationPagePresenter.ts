import ModalWindowComponent from 'components/library/modal-window/ModalWindowComponent';
import RegistrationPageComponent from 'components/pages/registration-page/RegistrationPageComponent';
import AuthApi from 'model/api/AuthApi';
import UserApi from 'model/api/UserApi';
import WebSocketApi from 'model/api/WebSocketApi';
import ErrorHandler from 'model/error/ErrorHandler';
import RegistrationRequestValidator from 'model/validators/RegistrationRequestValidator';
import MainPagePresenter from 'presenters/MainPagePresenter';
import Presenter from 'presenters/Presenter';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class RegistrationPagePresenter implements Presenter {
  private pageComponent = new RegistrationPageComponent();

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

    this.pageComponent.goToLoginTextElement.onclick = () =>
      RegistrationPagePresenter.handleGoToLoginTextClick(modalWindow);

    this.pageComponent.createAccountButtonElement.onclick = async () => {
      this.pageComponent.createAccountButtonElement.disabled = true;

      await RegistrationPagePresenter.handleRegisterAccountButtonClick(
        this.pageComponent
      ).catch(ErrorHandler.handleError);

      this.pageComponent.createAccountButtonElement.disabled = false;
    };
  }

  private static handleGoToLoginTextClick(modalWindow: HTMLElement) {
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.LOGIN), 300);
  }

  private static async handleRegisterAccountButtonClick(
    pageComponent: RegistrationPageComponent
  ) {
    const nickname = pageComponent.nicknameFieldElement.value.trim();
    const password = pageComponent.passwordFieldElement.value.trim();
    const passwordConfirmation =
      pageComponent.passwordConfirmationFieldElement.value.trim();

    RegistrationRequestValidator.validate(
      nickname,
      password,
      passwordConfirmation
    );

    await UserApi.registerUser({ nickname, password });
    await AuthApi.authUser({ nickname, password });

    Router.goToRoute(RoutesEnum.MAIN_MENU);
    WebSocketApi.initWebSocket();
  }
}
