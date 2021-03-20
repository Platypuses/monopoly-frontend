import playButtonTemplate from './play-button.hbs';
import './play-button.scss';

const buttonText = 'Играть';
const buttonClass = 'play-button';

export default {
  render(): string {
    return playButtonTemplate({ buttonText });
  },

  getButtonClass(): string {
    return buttonClass;
  },
};
