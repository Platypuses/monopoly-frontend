import modalWindowTemplate from './modal-window.hbs';
import './modal-window.scss';

const openedWindowClass = 'opened-modal-window';
const windowContentClass = 'modal-window-content';

export default {
  render(windowContent: string): string {
    return modalWindowTemplate({ windowContent });
  },

  openWindow(modalWindow: HTMLElement): void {
    modalWindow.classList.add(openedWindowClass);
  },

  closeWindow(modalWindow: HTMLElement): void {
    modalWindow.classList.remove(openedWindowClass);
  },

  isClickInsideModalWindow(event: MouseEvent): boolean {
    const targetElement = event.target as HTMLElement;
    return targetElement.closest(`.${windowContentClass}`) !== null;
  },
};
