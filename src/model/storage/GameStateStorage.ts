import GamePageData from 'components/pages/game-page/data/GamePageData';
import GameStateDto from 'model/dto/responses/GameStateDto';

let savedGameState: GameStateDto | null = null;
let savedGamePageData: GamePageData | null = null;

export default {
  saveGameState(gameState: GameStateDto): void {
    savedGameState = gameState;
  },

  saveGamePageData(gamePageData: GamePageData): void {
    savedGamePageData = gamePageData;
  },

  get gameState(): GameStateDto | null {
    return savedGameState;
  },

  get gamePageData(): GamePageData | null {
    return savedGamePageData;
  },
};
