import MainPageComponent from 'components/pages/main-page/MainPageComponent';
import Presenter from 'presenters/Presenter';
import RoutesEnum from 'router/RoutesEnum';

export default class MainPagePresenter implements Presenter {
  private pageComponent = new MainPageComponent();

  async initAndRenderView(): Promise<void> {
    this.pageComponent.render();

    const playButtonElement = this.pageComponent.getPlayButtonElement();
    playButtonElement.onclick = MainPagePresenter.handlePlayButtonClick;
  }

  private static async handlePlayButtonClick(): Promise<void> {
    window.location.hash = RoutesEnum.TEST;
  }
}
