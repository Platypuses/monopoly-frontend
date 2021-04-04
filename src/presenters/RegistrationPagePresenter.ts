import ModalWindowComponent from 'components/modal-window/ModalWindowComponent';
import RegistrationPageComponent from 'components/pages/registration-page/RegistrationPageComponent';
import AuthApi from 'model/api/AuthApi';
import UserApi from 'model/api/UserApi';
import TokensLocalStorage from 'model/storage/TokensLocalStorage';
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

    this.pageComponent.registerAccountButtonElement.onclick = async () =>
      RegistrationPagePresenter.handleRegisterAccountButtonClick(
        this.pageComponent
      );
  }

  private static handleGoToLoginTextClick(modalWindow: HTMLElement) {
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.MAIN), 300);
  }

  private static async handleRegisterAccountButtonClick(
    pageComponent: RegistrationPageComponent
  ) {
    const nickname = pageComponent.nicknameFieldElement.value.trim();
    const password = pageComponent.passwordFieldElement.value.trim();
    const passwordConfirmation = pageComponent.passwordConfirmationFieldElement.value.trim();

    try {
      RegistrationRequestValidator.validate(
        nickname,
        password,
        passwordConfirmation
      );

      await UserApi.registerUser({ nickname, password });
      const tokensPair = await AuthApi.authUser({ nickname, password });
      TokensLocalStorage.saveTokensToStorage(tokensPair);
    } catch (e) {
      alert(e.message);
      return;
    }

    console.log(`Access token: ${TokensLocalStorage.getAccessToken()}`);
    console.log(`Refresh token: ${TokensLocalStorage.getRefreshToken()}`);

    Router.goToRoute(RoutesEnum.TEST);
  }
}
