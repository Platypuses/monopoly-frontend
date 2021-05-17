import startCellSrc from 'assets/images/game/cells/1-start.png';
import lacostePropertyCellSrc from 'assets/images/game/cells/10-lacoste.svg';
import vkPropertyCellSrc from 'assets/images/game/cells/12-vk.svg';
import rockstarGamesPropertyCellSrc from 'assets/images/game/cells/13-rockstar-games.svg';
import facebookPropertyCellSrc from 'assets/images/game/cells/14-facebook.svg';
import twitterPropertyCellSrc from 'assets/images/game/cells/15-twitter.svg';
import audiPropertyCellSrc from 'assets/images/game/cells/16-audi.svg';
import cocaColaPropertyCellSrc from 'assets/images/game/cells/17-coca-cola.svg';
import pepsiPropertyCellSrc from 'assets/images/game/cells/19-pepsi.svg';
import chanelPropertyCellSrc from 'assets/images/game/cells/2-chanel.svg';
import fantaPropertyCellSrc from 'assets/images/game/cells/20-fanta.svg';
import americanAirlinesPropertyCellSrc from 'assets/images/game/cells/22-american-airlines.svg';
import lufthansaPropertyCellSrc from 'assets/images/game/cells/24-lufthansa.svg';
import britishAirwaysPropertyCellSrc from 'assets/images/game/cells/25-british-airways.svg';
import fordPropertyCellSrc from 'assets/images/game/cells/26-ford.svg';
import mcdonaldsPropertyCellSrc from 'assets/images/game/cells/27-mcdonalds.svg';
import burgerKingPropertyCellSrc from 'assets/images/game/cells/28-burger-king.svg';
import rovioPropertyCellSrc from 'assets/images/game/cells/29-rovio.svg';
import kfcPropertyCellSrc from 'assets/images/game/cells/30-kfc.svg';
import holidayInnPropertyCellSrc from 'assets/images/game/cells/32-holiday-inn.svg';
import radissonBluPropertyCellSrc from 'assets/images/game/cells/33-radisson-blu.svg';
import novotelPropertyCellSrc from 'assets/images/game/cells/35-novotel.svg';
import landRoverPropertyCellSrc from 'assets/images/game/cells/36-land-rover.svg';
import applePropertyCellSrc from 'assets/images/game/cells/38-apple.svg';
import hugoBossPropertyCellSrc from 'assets/images/game/cells/4-hugo-boss.svg';
import nokiaPropertyCellSrc from 'assets/images/game/cells/40-nokia.svg';
import mercedesPropertyCellSrc from 'assets/images/game/cells/6-mercedes.svg';
import adidasPropertyCellSrc from 'assets/images/game/cells/7-adidas.svg';
import pumaPropertyCellSrc from 'assets/images/game/cells/9-puma.svg';
import leftEdgeChanceCellSrc from 'assets/images/game/cells/left-edge-chance.png';
import rightEdgeChanceCellSrc from 'assets/images/game/cells/right-edge-chance.png';
import taxCellSrc from 'assets/images/game/cells/tax.png';
import topBottomEdgeChanceCellSrc from 'assets/images/game/cells/top-bottom-edge-chance.png';
import {
  playerColors,
  positionsMap,
} from 'components/pages/game-page/data/GameConstants';
import GamePageData from 'components/pages/game-page/data/GamePageData';
import PlayerData from 'components/pages/game-page/data/PlayerData';
import GameCellDto from 'model/dto/responses/GameCellDto';
import GameStateDto from 'model/dto/responses/GameStateDto';
import PlayerDto from 'model/dto/responses/PlayerDto';
import AppError from 'model/error/AppError';

function buildPlayersData(playersDtoObjects: PlayerDto[]): PlayerData[] {
  playersDtoObjects.sort((a, b) => a.moveOrder - b.moveOrder);
  const playersData: PlayerData[] = [];

  for (let i = 0; i < playersDtoObjects.length; i++) {
    const playerDto = playersDtoObjects[i];
    const playerPosition = positionsMap
      .get(playerDto.cellId)
      ?.get(playerDto.moveOrder);

    if (playerPosition === undefined) {
      throw new AppError('Ошибка инициализации игры');
    }

    playersData.push({
      id: playerDto.playerId,
      nickname: playerDto.nickname,
      balance: playerDto.balance,
      color: playerColors[i],
      playerPosition,
    });
  }

  return playersData;
}

function buildCellsOwnerColorsMap(
  playersData: PlayerData[],
  cellsDto: GameCellDto[]
): Map<number, string | null> {
  const playerColorsMap = new Map<number, string>();

  playersData.forEach((playerData) =>
    playerColorsMap.set(playerData.id, playerData.color)
  );

  const cellsOwnerColorsMap = new Map<number, string | null>();

  cellsDto.forEach((cellDto) => {
    cellsOwnerColorsMap.set(cellDto.cellId, null);

    if (cellDto.ownerId !== null) {
      const ownerColor = playerColorsMap.get(cellDto.ownerId);

      if (ownerColor === undefined) {
        return;
      }

      cellsOwnerColorsMap.set(cellDto.cellId, ownerColor);
    }
  });

  return cellsOwnerColorsMap;
}

export default {
  buildGamePageData(gameState: GameStateDto): GamePageData {
    const playersData = buildPlayersData(gameState.players);
    const cellsOwnerColorsMap = buildCellsOwnerColorsMap(
      playersData,
      gameState.cells
    );

    return {
      players: playersData,
      cells: {
        n1: {
          imageSrc: startCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n2: {
          imageSrc: chanelPropertyCellSrc,
          price: 60,
          rent: 2,
          ownerColor: <string | null>cellsOwnerColorsMap.get(2),
          name: 'CHANEL',
        },
        n3: {
          imageSrc: topBottomEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n4: {
          imageSrc: hugoBossPropertyCellSrc,
          price: 60,
          rent: 4,
          ownerColor: <string | null>cellsOwnerColorsMap.get(4),
          name: 'HUGO BOSS',
        },
        n5: {
          imageSrc: taxCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n6: {
          imageSrc: mercedesPropertyCellSrc,
          price: 200,
          rent: 50,
          ownerColor: <string | null>cellsOwnerColorsMap.get(6),
          name: 'MERCEDES',
        },
        n7: {
          imageSrc: adidasPropertyCellSrc,
          price: 100,
          rent: 6,
          ownerColor: <string | null>cellsOwnerColorsMap.get(7),
          name: 'ADIDAS',
        },
        n8: {
          imageSrc: topBottomEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n9: {
          imageSrc: pumaPropertyCellSrc,
          price: 100,
          rent: 6,
          ownerColor: <string | null>cellsOwnerColorsMap.get(9),
          name: 'PUMA',
        },
        n10: {
          imageSrc: lacostePropertyCellSrc,
          price: 120,
          rent: 8,
          ownerColor: <string | null>cellsOwnerColorsMap.get(10),
          name: 'LACOSTE',
        },
        n12: {
          imageSrc: vkPropertyCellSrc,
          price: 140,
          rent: 10,
          ownerColor: <string | null>cellsOwnerColorsMap.get(12),
          name: 'VK',
        },
        n13: {
          imageSrc: rockstarGamesPropertyCellSrc,
          price: 150,
          rent: 20,
          ownerColor: <string | null>cellsOwnerColorsMap.get(13),
          name: 'ROCKSTAR GAMES',
        },
        n14: {
          imageSrc: facebookPropertyCellSrc,
          price: 140,
          rent: 10,
          ownerColor: <string | null>cellsOwnerColorsMap.get(14),
          name: 'FACEBOOK',
        },
        n15: {
          imageSrc: twitterPropertyCellSrc,
          price: 160,
          rent: 12,
          ownerColor: <string | null>cellsOwnerColorsMap.get(15),
          name: 'TWITTER',
        },
        n16: {
          imageSrc: audiPropertyCellSrc,
          price: 200,
          rent: 50,
          ownerColor: <string | null>cellsOwnerColorsMap.get(16),
          name: 'AUDI',
        },
        n17: {
          imageSrc: cocaColaPropertyCellSrc,
          price: 180,
          rent: 14,
          ownerColor: <string | null>cellsOwnerColorsMap.get(17),
          name: 'COCA-COLA',
        },
        n18: {
          imageSrc: rightEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n19: {
          imageSrc: pepsiPropertyCellSrc,
          price: 180,
          rent: 14,
          ownerColor: <string | null>cellsOwnerColorsMap.get(19),
          name: 'PEPSI',
        },
        n20: {
          imageSrc: fantaPropertyCellSrc,
          price: 200,
          rent: 16,
          ownerColor: <string | null>cellsOwnerColorsMap.get(20),
          name: 'FANTA',
        },
        n22: {
          imageSrc: americanAirlinesPropertyCellSrc,
          price: 220,
          rent: 18,
          ownerColor: <string | null>cellsOwnerColorsMap.get(22),
          name: 'AMERICAN AIRLINES',
        },
        n23: {
          imageSrc: topBottomEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n24: {
          imageSrc: lufthansaPropertyCellSrc,
          price: 220,
          rent: 18,
          ownerColor: <string | null>cellsOwnerColorsMap.get(24),
          name: 'LUFTHANSA',
        },
        n25: {
          imageSrc: britishAirwaysPropertyCellSrc,
          price: 240,
          rent: 20,
          ownerColor: <string | null>cellsOwnerColorsMap.get(25),
          name: 'BRITISH AIRWAYS',
        },
        n26: {
          imageSrc: fordPropertyCellSrc,
          price: 200,
          rent: 50,
          ownerColor: <string | null>cellsOwnerColorsMap.get(26),
          name: 'FORD',
        },
        n27: {
          imageSrc: mcdonaldsPropertyCellSrc,
          price: 260,
          rent: 22,
          ownerColor: <string | null>cellsOwnerColorsMap.get(27),
          name: 'MCDONALDS',
        },
        n28: {
          imageSrc: burgerKingPropertyCellSrc,
          price: 260,
          rent: 22,
          ownerColor: <string | null>cellsOwnerColorsMap.get(28),
          name: 'BURGER KING',
        },
        n29: {
          imageSrc: rovioPropertyCellSrc,
          price: 150,
          rent: 20,
          ownerColor: <string | null>cellsOwnerColorsMap.get(29),
          name: 'ROVIO',
        },
        n30: {
          imageSrc: kfcPropertyCellSrc,
          price: 280,
          rent: 24,
          ownerColor: <string | null>cellsOwnerColorsMap.get(30),
          name: 'KFC',
        },
        n32: {
          imageSrc: holidayInnPropertyCellSrc,
          price: 300,
          rent: 26,
          ownerColor: <string | null>cellsOwnerColorsMap.get(32),
          name: 'HOLIDAY INN',
        },
        n33: {
          imageSrc: radissonBluPropertyCellSrc,
          price: 300,
          rent: 26,
          ownerColor: <string | null>cellsOwnerColorsMap.get(33),
          name: 'RADISSON BLU',
        },
        n34: {
          imageSrc: leftEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n35: {
          imageSrc: novotelPropertyCellSrc,
          price: 320,
          rent: 28,
          ownerColor: <string | null>cellsOwnerColorsMap.get(35),
          name: 'NOVOTEL',
        },
        n36: {
          imageSrc: landRoverPropertyCellSrc,
          price: 200,
          rent: 50,
          ownerColor: <string | null>cellsOwnerColorsMap.get(36),
          name: 'LAND ROVER',
        },
        n37: {
          imageSrc: taxCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n38: {
          imageSrc: applePropertyCellSrc,
          price: 350,
          rent: 35,
          ownerColor: <string | null>cellsOwnerColorsMap.get(38),
          name: 'APPLE',
        },
        n39: {
          imageSrc: leftEdgeChanceCellSrc,
          price: 0,
          rent: 0,
          ownerColor: null,
          name: null,
        },
        n40: {
          imageSrc: nokiaPropertyCellSrc,
          price: 400,
          rent: 50,
          ownerColor: <string | null>cellsOwnerColorsMap.get(40),
          name: 'NOKIA',
        },
      },
    };
  },
};
