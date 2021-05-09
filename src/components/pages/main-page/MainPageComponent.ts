import backgroundImageSrc from 'assets/images/background.jpg';
import PlayButtonComponent from 'components/library/buttons/play-button/PlayButtonComponent';
import BasePageComponent from 'components/pages/BasePageComponent';
import mainPageTemplate from './main-page.hbs';
import './main-page.scss';

export default class MainPageComponent extends BasePageComponent {
  private _playButtonElement: HTMLElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setPlayButtonElement();
  }

  private renderPageContent() {
    this.rootElement.innerHTML = mainPageTemplate({ backgroundImageSrc });
  }

  private setPlayButtonElement() {
    const playButtonClass = PlayButtonComponent.buttonClass;
    this._playButtonElement = <HTMLElement>(
      document.getElementsByClassName(playButtonClass)[0]
    );
  }

  get playButtonElement(): HTMLElement {
    return <HTMLElement>this._playButtonElement;
  }
}
