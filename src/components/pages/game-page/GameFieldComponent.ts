import GamePageData from 'components/pages/game-page/data/GamePageData';
import gameFieldTemplate from 'components/pages/game-page/game-field.hbs';
import GameStateStorage from 'model/storage/GameStateStorage';

export default {
  render(gamePageData: GamePageData): string {
    GameStateStorage.saveGamePageData(gamePageData);
    return gameFieldTemplate({ gamePageData });
  },

  renderToPage(gamePageData: GamePageData): void {
    const element = <HTMLElement>(
      document.getElementsByClassName('game-field-container')[0]
    );

    element.innerHTML = this.render(gamePageData);
  },
};
