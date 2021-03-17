export default abstract class Component {
  private rootElementClass = 'root';

  getRootElement(): HTMLElement | null {
    return document.getElementById(this.rootElementClass);
  }

  abstract render(context?: unknown): void;
}
