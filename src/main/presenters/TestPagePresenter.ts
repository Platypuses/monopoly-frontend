import Presenter from 'presenters/Presenter';
import TestPageComponent from 'view-components/TestPageComponent';
import UserDto from 'model/dto/UserDto';

export default class TestPagePresenter implements Presenter {
  private component = new TestPageComponent();

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
    this.component.render(this.users);
  }
}
