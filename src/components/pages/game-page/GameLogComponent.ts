export default {
  addMessageToLog(spanElement: HTMLSpanElement): void {
    const element = document.createElement('div');
    element.classList.add('log-message');

    element.appendChild(spanElement);

    const messagesList = document.getElementsByClassName('game-log-content')[0];
    messagesList.prepend(element);
  },
};
