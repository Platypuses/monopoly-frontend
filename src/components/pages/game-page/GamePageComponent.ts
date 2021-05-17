import BasePageComponent from 'components/pages/BasePageComponent';
import GameCells from 'components/pages/game-page/GameCells';
import GameStateDto from 'model/dto/responses/GameStateDto';
import gamePageTemplate from './game-page.hbs';
import './game-page.scss';

export default class GamePageComponent extends BasePageComponent {
  render(gameState: GameStateDto): void {
    this.rootElement.innerHTML = gamePageTemplate({ gameState, GameCells });
  }
}
