import MainPageComponent from 'components/pages/main-page/MainPageComponent';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import Presenter from 'presenters/Presenter';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class MainPagePresenter implements Presenter {
  private pageComponent = new MainPageComponent();

  async initAndRenderView(): Promise<void> {
    this.pageComponent.render();

    const { playButtonElement } = this.pageComponent;
    playButtonElement.onclick = MainPagePresenter.handlePlayButtonClick;
  }

  private static async handlePlayButtonClick(): Promise<void> {
    if (SecurityContextStorage.isUserNotAuthorized()) {
      Router.goToRoute(RoutesEnum.LOGIN);
      return;
    }

    Router.goToRoute(RoutesEnum.MAIN_MENU);
  }
}
