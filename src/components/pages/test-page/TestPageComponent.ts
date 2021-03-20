import Img from 'assets/images/img.png';
import BasePageComponent from 'components/pages/BasePageComponent';
import UserDto from 'model/dto/UserDto';
import testTemplate from './test.hbs';

export default class TestPageComponent extends BasePageComponent {
  render(users: Array<UserDto>): void {
    const rootElement = this.getRootElement();

    rootElement.innerHTML = testTemplate({ users });

    const image = new Image();
    image.src = Img;
    rootElement.appendChild(image);
  }
}
