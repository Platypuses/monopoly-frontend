import Presenter from 'presenters/Presenter';

export default class MainPagePresenter implements Presenter {
  private message = 'Main Page';

  async initAndRenderView(): Promise<void> {
    console.log(this.message);
  }
}
