import availablePositionIconSrc from 'assets/images/lobby/available-position-icon.png';
import creatorIconSrc from 'assets/images/lobby/creator-icon.png';
import participantIconSrc from 'assets/images/lobby/participant-icon.png';
import LobbyInfoDto from 'model/dto/responses/LobbyInfoDto';
import LobbyParticipantDto from 'model/dto/responses/LobbyParticipantDto';
import lobbyWindowContentTemplate from './lobby-window-content.hbs';
import lobbyParticipantsListTemplate from './lobby-participants-list.hbs';
import './lobby-window-content.scss';

const maxPlayersCount = 6;
const windowBodyClass = 'modal-window-body';
const participantsListClass = 'lobby-participants-list';
const copyLobbyIdButtonClass = 'copy-lobby-id-button';
const startGameButtonClass = 'start-game-button';
const exitLobbyButtonClass = 'exit-lobby-button';

let currentLobbyInfo: LobbyInfoDto | null = null;

interface ParticipantsData {
  creatorNickname: string;
  nicknames: string[];
  availablePositionsCount: number;
}

function buildParticipantsData(
  lobbyParticipants: LobbyParticipantDto[]
): ParticipantsData {
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
    currentLobbyInfo = lobbyInfo;
    const lobbyId = lobbyInfo.id;

    const windowBodyElement = <HTMLElement>(
      document.getElementsByClassName(windowBodyClass)[0]
    );

    windowBodyElement.innerHTML = lobbyWindowContentTemplate({
      lobbyId,
    });

    this.renderParticipantsList(lobbyInfo.lobbyParticipants);
  },

  renderParticipantsList(lobbyParticipants: LobbyParticipantDto[]): void {
    if (currentLobbyInfo === null) {
      return;
    }

    currentLobbyInfo.lobbyParticipants = lobbyParticipants;
    const participantsData = buildParticipantsData(lobbyParticipants);

    const elements = document.getElementsByClassName(participantsListClass);

    if (elements.length === 0) {
      return;
    }

    const participantsListElement = elements[0];
    participantsListElement.innerHTML = lobbyParticipantsListTemplate({
      creatorIconSrc,
      participantIconSrc,
      availablePositionIconSrc,
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

  get currentLobbyInfo(): LobbyInfoDto | null {
    return currentLobbyInfo;
  },
};
