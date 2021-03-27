import ModalWindowComponent from 'components/modal-window/ModalWindowComponent';
import RegistrationPageComponent from 'components/pages/registration-page/RegistrationPageComponent';
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
      () =>
        ModalWindowComponent.openWindow(this.pageComponent.getModalWindow()),
      100
    );

    this.initHandlers();
  }

  private initHandlers() {
    const modalWindow = this.pageComponent.getModalWindow();

    modalWindow.onmousedown = (event) =>
      RegistrationPagePresenter.handleModalWindowClick(event, modalWindow);

    this.pageComponent.getGoToLoginTextElement().onclick = () =>
      RegistrationPagePresenter.handleGoToLoginTextClick(modalWindow);

    this.pageComponent.getRegisterAccountButtonElement().onclick =
      RegistrationPagePresenter.handleRegisterAccountButtonClick;
  }

  private static handleModalWindowClick(
    event: MouseEvent,
    modalWindow: HTMLElement
  ) {
    if (ModalWindowComponent.isClickInsideModalWindow(event)) {
      return;
    }

    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.MAIN), 300);
  }

  private static handleGoToLoginTextClick(modalWindow: HTMLElement) {
    ModalWindowComponent.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(RoutesEnum.MAIN), 300);
  }

  private static handleRegisterAccountButtonClick() {
    console.log('Register account');
  }
}
