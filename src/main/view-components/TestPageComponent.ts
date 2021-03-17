import 'styles/main.scss';
import Img from 'images/img.png';
import testTemplate from 'templates/test.hbs';
import UserDto from 'model/dto/UserDto';
import Component from 'view-components/Component';

export default class TestPageComponent extends Component {
  render(users: Array<UserDto>): void {
    const element = document.createElement('div');
    element.innerHTML = testTemplate({
      users,
    });

    const image = new Image();
    image.src = Img;

    const rootElement = this.getRootElement();

    if (rootElement == null) {
      return;
    }

    rootElement.textContent = '';
    rootElement.appendChild(element);
    rootElement.appendChild(image);
  }
}
