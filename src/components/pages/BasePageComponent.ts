export default abstract class BasePageComponent {
  private rootElementClass = 'root';

  protected getRootElement(): HTMLElement {
    return <HTMLElement>(
      document.getElementsByClassName(this.rootElementClass)[0]
    );
  }

  abstract render(context?: unknown): void;
}
