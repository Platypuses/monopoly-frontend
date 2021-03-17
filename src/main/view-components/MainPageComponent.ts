import Component from 'view-components/Component';

export default class MainPageComponent extends Component {
  render(): void {
    const rootElement = this.getRootElement();

    if (rootElement === null) {
      return;
    }

    rootElement.textContent = '';
  }
}
