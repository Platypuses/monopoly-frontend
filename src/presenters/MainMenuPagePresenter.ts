import MainMenuPageComponent from 'components/pages/main-menu-page/MainMenuPageComponent';
import TokensStorage from 'model/storage/TokensStorage';
import Presenter from 'presenters/Presenter';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default class MainMenuPagePresenter implements Presenter {
  private pageComponent = new MainMenuPageComponent();

  async initAndRenderView(): Promise<void> {
    if (TokensStorage.isUserNotAuthorized()) {
      // TODO: Replace REGISTRATION with LOGIN
      Router.goToRoute(RoutesEnum.REGISTRATION);
      return;
    }

    this.pageComponent.render();
  }
}
