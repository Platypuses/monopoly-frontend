import availablePositionIconSrc from 'assets/images/lobby/available-position-icon.png';
import creatorIconSrc from 'assets/images/lobby/creator-icon.png';
import participantIconSrc from 'assets/images/lobby/participant-icon.png';
import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import lobbyWindowContentTemplate from './lobby-window-content.hbs';
import './lobby-window-content.scss';

const maxPlayersCount = 6;
const windowBodyClass = 'modal-window-body';
const copyLobbyIdButtonClass = 'copy-lobby-id-button';
const startGameButtonClass = 'start-game-button';
const exitLobbyButtonClass = 'exit-lobby-button';

interface ParticipantsData {
  creatorNickname: string;
  nicknames: string[];
  availablePositionsCount: number;
}

function buildParticipantsData(lobbyInfo: LobbyInfoDto): ParticipantsData {
  const { lobbyParticipants } = lobbyInfo;
  const availablePositionsCount = maxPlayersCount - lobbyParticipants.length;

  let creatorNickname = '';
  const nicknames: string[] = [];

  lobbyParticipants.forEach((participant) => {
    if (participant.isCreator) {
      creatorNickname = participant.nickname;
    } else {
      nicknames.push(participant.nickname);
    }
  });

  return {
    creatorNickname,
    nicknames,
    availablePositionsCount,
  };
}

export default {
  render(lobbyInfo: LobbyInfoDto): void {
    const lobbyId = lobbyInfo.id;
    const participantsData = buildParticipantsData(lobbyInfo);

    const windowBodyElement = <HTMLElement>(
      document.getElementsByClassName(windowBodyClass)[0]
    );

    windowBodyElement.innerHTML = lobbyWindowContentTemplate({
      creatorIconSrc,
      participantIconSrc,
      availablePositionIconSrc,
      lobbyId,
      participantsData,
    });
  },

  get copyLobbyIdButtonClass(): string {
    return copyLobbyIdButtonClass;
  },

  get startGameButtonClass(): string {
    return startGameButtonClass;
  },

  get exitLobbyButtonClass(): string {
    return exitLobbyButtonClass;
  },
};
