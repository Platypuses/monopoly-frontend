import PrimaryButtonComponent from 'components/buttons/primary-button/PrimaryButtonComponent';
import ModalWindowComponent from 'components/modal-window/ModalWindowComponent';
import BasePageComponent from 'components/pages/BasePageComponent';
import registrationPageTemplate from './registration-page.hbs';
import './registration-page.scss';

const goToLoginTextClass = 'go-to-login-text';

export default class RegistrationPageComponent extends BasePageComponent {
  private modalWindow: HTMLElement | null = null;

  private goToLoginTextElement: HTMLElement | null = null;

  private registerAccountButtonElement: HTMLElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setGoToLoginTextElement();
    this.setRegisterAccountButtonElement();
  }

  private renderPageContent() {
    const windowContent = registrationPageTemplate();

    this.modalWindow = BasePageComponent.htmlStringToElement(
      ModalWindowComponent.render(windowContent)
    );

    this.getRootElement().appendChild(this.modalWindow);
  }

  private setGoToLoginTextElement() {
    this.goToLoginTextElement = <HTMLElement>(
      document.getElementsByClassName(goToLoginTextClass)[0]
    );
  }

  private setRegisterAccountButtonElement() {
    const registerAccountButtonClass = PrimaryButtonComponent.getButtonClass();
    this.registerAccountButtonElement = <HTMLElement>(
      document.getElementsByClassName(registerAccountButtonClass)[0]
    );
  }

  getModalWindow(): HTMLElement {
    return <HTMLElement>this.modalWindow;
  }

  getGoToLoginTextElement(): HTMLElement {
    return <HTMLElement>this.goToLoginTextElement;
  }

  getRegisterAccountButtonElement(): HTMLElement {
    return <HTMLElement>this.registerAccountButtonElement;
  }
}
