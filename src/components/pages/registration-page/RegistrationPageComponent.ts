import PrimaryButtonComponent from 'components/buttons/primary-button/PrimaryButtonComponent';
import BasePageComponent from 'components/pages/BasePageComponent';
import registrationPageTemplate from './registration-page.hbs';
import './registration-page.scss';

const nicknameFieldId = 'nickname';
const passwordFieldId = 'password';
const passwordConfirmationFieldId = 'password-confirmation';
const goToLoginTextClass = 'go-to-login-text';

export default class RegistrationPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  private _nicknameFieldElement: HTMLElement | null = null;

  private _passwordFieldElement: HTMLElement | null = null;

  private _passwordConfirmationFieldElement: HTMLElement | null = null;

  private _goToLoginTextElement: HTMLElement | null = null;

  private _registerAccountButtonElement: HTMLElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setElements();
  }

  private renderPageContent() {
    this._modalWindow = BasePageComponent.htmlStringToElement(
      registrationPageTemplate()
    );

    this.rootElement.appendChild(this._modalWindow);
  }

  private setElements() {
    this._nicknameFieldElement = document.getElementById(nicknameFieldId);
    this._passwordFieldElement = document.getElementById(passwordFieldId);
    this._passwordConfirmationFieldElement = document.getElementById(
      passwordConfirmationFieldId
    );

    this._goToLoginTextElement = <HTMLElement>(
      document.getElementsByClassName(goToLoginTextClass)[0]
    );

    const registerAccountButtonClass = PrimaryButtonComponent.buttonClass;
    this._registerAccountButtonElement = <HTMLElement>(
      document.getElementsByClassName(registerAccountButtonClass)[0]
    );
  }

  get modalWindow(): HTMLElement {
    return <HTMLElement>this._modalWindow;
  }

  get nicknameFieldElement(): HTMLInputElement {
    return <HTMLInputElement>this._nicknameFieldElement;
  }

  get passwordFieldElement(): HTMLInputElement {
    return <HTMLInputElement>this._passwordFieldElement;
  }

  get passwordConfirmationFieldElement(): HTMLInputElement {
    return <HTMLInputElement>this._passwordConfirmationFieldElement;
  }

  get goToLoginTextElement(): HTMLElement {
    return <HTMLElement>this._goToLoginTextElement;
  }

  get registerAccountButtonElement(): HTMLElement {
    return <HTMLElement>this._registerAccountButtonElement;
  }
}
