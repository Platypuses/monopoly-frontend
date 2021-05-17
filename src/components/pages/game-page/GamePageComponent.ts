import BasePageComponent from 'components/pages/BasePageComponent';
import GameDataConverter from 'components/pages/game-page/GameDataConverter';
import GameStateDto from 'model/dto/responses/GameStateDto';
import gamePageTemplate from './game-page.hbs';
import './game-page.scss';

export default class GamePageComponent extends BasePageComponent {
  render(gameState: GameStateDto): void {
    const gamePageData = GameDataConverter.buildGamePageData(gameState);
    this.rootElement.innerHTML = gamePageTemplate({ gamePageData });
  }
}
