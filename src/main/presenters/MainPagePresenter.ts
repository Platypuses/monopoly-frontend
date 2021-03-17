import Presenter from 'presenters/Presenter';
import MainPageComponent from 'view-components/MainPageComponent';

export default class MainPagePresenter implements Presenter {
  private component = new MainPageComponent();

  async initAndRenderView(): Promise<void> {
    this.component.render();
  }
}
