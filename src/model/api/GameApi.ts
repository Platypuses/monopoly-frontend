import API from 'model/api/API';
import GameStateDto from 'model/dto/responses/GameStateDto';

export default {
  async startGame(): Promise<GameStateDto> {
    const response = await API.post<GameStateDto>('/game');
    return response.data;
  },

  async getGameState(gameId: number): Promise<GameStateDto> {
    const response = await API.get<GameStateDto>(`/game/${gameId}`);
    return response.data;
  },

  async rollDices(): Promise<void> {
    await API.post('/game-actions/dices');
  },

  async acceptPurchase(): Promise<void> {
    await API.post('/game-actions/purchase-accepting');
  },

  async declinePurchase(): Promise<void> {
    await API.post('/game-actions/purchase-declining');
  },
};
