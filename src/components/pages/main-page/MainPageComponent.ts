import backgroundImageUrl from 'assets/images/background.jpg';
import PlayButtonComponent from 'components/buttons/play-button/PlayButtonComponent';
import BasePageComponent from 'components/pages/BasePageComponent';
import mainPageTemplate from './main-page.hbs';
import './main-page.scss';

const pageRootClass = 'main-page-content';

export default class MainPageComponent extends BasePageComponent {
  private playButtonElement: HTMLElement | null = null;

  render(): void {
    this.renderPageContent();
    MainPageComponent.setBackgroundImage();
    this.setPlayButtonElement();
  }

  private renderPageContent() {
    this.getRootElement().innerHTML = mainPageTemplate();
  }

  private static setBackgroundImage() {
    const pageRootElement = <HTMLElement>(
      document.getElementsByClassName(pageRootClass)[0]
    );
    pageRootElement.style.backgroundImage = `url(${backgroundImageUrl})`;
  }

  private setPlayButtonElement() {
    const playButtonClass = PlayButtonComponent.getButtonClass();
    this.playButtonElement = <HTMLElement>(
      document.getElementsByClassName(playButtonClass)[0]
    );
  }

  getPlayButtonElement(): HTMLElement {
    return <HTMLElement>this.playButtonElement;
  }
}
