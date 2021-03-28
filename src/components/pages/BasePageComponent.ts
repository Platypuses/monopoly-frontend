export default abstract class BasePageComponent {
  private rootElementClass = 'root';

  protected get rootElement(): HTMLElement {
    return <HTMLElement>(
      document.getElementsByClassName(this.rootElementClass)[0]
    );
  }

  protected static htmlStringToElement(html: string): HTMLElement {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return <HTMLElement>template.content.firstChild;
  }

  abstract render(context?: unknown): void;
}
