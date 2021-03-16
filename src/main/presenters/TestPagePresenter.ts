import Presenter from 'presenters/Presenter';

export default class TestPagePresenter implements Presenter {
  private message = 'Test Page';

  async initAndRenderView(): Promise<void> {
    console.log(this.message);
  }
}
