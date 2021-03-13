import _ from 'lodash';
import Img from 'images/img.png';
import 'styles/main.scss';

function component(): HTMLDivElement {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello,', 'webpack!'], ' ');
  element.classList.add('hello');

  element.appendChild(document.createElement('br'));

  const image = new Image();
  image.src = Img;

  element.appendChild(image);

  return element;
}

const root = document.getElementById('root');
root?.appendChild(component());
