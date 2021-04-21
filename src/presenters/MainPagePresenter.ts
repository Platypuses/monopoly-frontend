import MainPageComponent from 'components/pages/main-page/MainPageComponent';
import TokensStorage from 'model/storage/TokensStorage';
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
    if (TokensStorage.isUserAuthorized()) {
      Router.goToRoute(RoutesEnum.TEST);
    } else {
      // TODO: Replace REGISTRATION with LOGIN
      Router.goToRoute(RoutesEnum.REGISTRATION);
    }
  }
}
