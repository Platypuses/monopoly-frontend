import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';
import './modal-window.scss';

const openedWindowClass = 'opened-modal-window';
const windowContentClass = 'modal-window-content';

function isClickInsideModalWindow(event: MouseEvent): boolean {
  const targetElement = event.target as HTMLElement;
  return targetElement.closest(`.${windowContentClass}`) !== null;
}

export default {
  openWindow(modalWindow: HTMLElement): void {
    modalWindow.classList.add(openedWindowClass);
  },

  closeWindow(modalWindow: HTMLElement): void {
    modalWindow.classList.remove(openedWindowClass);
  },

  handleClick(
    event: MouseEvent,
    modalWindow: HTMLElement,
    backgroundRoute: RoutesEnum
  ): void {
    if (isClickInsideModalWindow(event)) {
      return;
    }

    this.closeWindow(modalWindow);
    setTimeout(() => Router.goToRoute(backgroundRoute), 300);
  },
};
