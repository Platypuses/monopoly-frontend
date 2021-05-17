import PlayerPosition from 'components/pages/game-page/data/PlayerPosition';

export default interface PlayerData {
  id: number;
  nickname: string;
  balance: number;
  color: string;
  playerPosition: PlayerPosition;
}
