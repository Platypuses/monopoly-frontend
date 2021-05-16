import BasePageComponent from 'components/pages/BasePageComponent';
import loginPageTemplate from './login-page.hbs';
import './login-page.scss';

const nicknameFieldId = 'nickname';
const passwordFieldId = 'password';
const goToRegistrationTextClass = 'go-to-registration-text';
const loginButtonClass = 'login-button';

export default class LoginPageComponent extends BasePageComponent {
  private _modalWindow: HTMLElement | null = null;

  private _nicknameFieldElement: HTMLInputElement | null = null;

  private _passwordFieldElement: HTMLInputElement | null = null;

  private _goToRegistrationTextElement: HTMLElement | null = null;

  private _loginButtonElement: HTMLButtonElement | null = null;

  render(): void {
    this.renderPageContent();
    this.setElements();
  }

  private renderPageContent() {
    this._modalWindow = BasePageComponent.htmlStringToElement(
      loginPageTemplate()
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

    this._goToRegistrationTextElement = <HTMLElement>(
      document.getElementsByClassName(goToRegistrationTextClass)[0]
    );

    this._loginButtonElement = <HTMLButtonElement>(
      document.getElementsByClassName(loginButtonClass)[0]
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

  get goToRegistrationTextElement(): HTMLElement {
    return <HTMLElement>this._goToRegistrationTextElement;
  }

  get loginButtonElement(): HTMLButtonElement {
    return <HTMLButtonElement>this._loginButtonElement;
  }
}
