import GameCellDto from 'model/dto/responses/GameCellDto';
import PlayerDto from 'model/dto/responses/PlayerDto';

export default interface GameStateDto {
  gameId: number;
  players: PlayerDto[];
  cells: GameCellDto[];
  currentMovePlayerId: number;
}
