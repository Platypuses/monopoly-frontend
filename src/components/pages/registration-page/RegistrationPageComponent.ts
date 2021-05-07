import BasePageComponent from 'components/pages/BasePageComponent';
import registrationPageTemplate from './registration-page.hbs';
import './registration-page.scss';

const nicknameFieldId = 'nickname';
const passwordFieldId = 'password';
const passwordConfirmationFieldId = 'password-confirmation';
const goToLoginTextClass = 'go-to-login-text';
const createAccountButtonClass = 'create-account-button';

export default class RegistrationPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  private _nicknameFieldElement: HTMLInputElement | null = null;

  private _passwordFieldElement: HTMLInputElement | null = null;

  private _passwordConfirmationFieldElement: HTMLInputElement | null = null;

  private _goToLoginTextElement: HTMLElement | null = null;

  private _createAccountButtonElement: HTMLButtonElement | null = null;

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
    this._nicknameFieldElement = <HTMLInputElement>(
      document.getElementById(nicknameFieldId)
    );

    this._passwordFieldElement = <HTMLInputElement>(
      document.getElementById(passwordFieldId)
    );

    this._passwordConfirmationFieldElement = <HTMLInputElement>(
      document.getElementById(passwordConfirmationFieldId)
    );

    this._goToLoginTextElement = <HTMLElement>(
      document.getElementsByClassName(goToLoginTextClass)[0]
    );

    this._createAccountButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(createAccountButtonClass)[0]
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

  get createAccountButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._createAccountButtonElement;
  }
}
