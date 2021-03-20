import TestPageComponent from 'components/pages/test-page/TestPageComponent';
import UserDto from 'model/dto/UserDto';
import Presenter from 'presenters/Presenter';

export default class TestPagePresenter implements Presenter {
  private pageComponent = new TestPageComponent();

  private users: Array<UserDto> = [
    {
      nickname: 'Qwerty',
      age: 959345,
    },
    {
      nickname: 'JS',
      age: 41241,
    },
    {
      nickname: 'Test',
      age: 59459,
    },
  ];

  async initAndRenderView(): Promise<void> {
    this.pageComponent.render(this.users);
  }
}
