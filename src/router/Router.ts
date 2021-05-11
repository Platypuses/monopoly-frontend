import ErrorHandler from 'model/error/ErrorHandler';
import JoinLobbyPagePresenter from 'presenters/JoinLobbyPagePresenter';
import LobbyPagePresenter from 'presenters/LobbyPagePresenter';
import MainMenuPagePresenter from 'presenters/MainMenuPagePresenter';
import MainPagePresenter from 'presenters/MainPagePresenter';
import Presenter from 'presenters/Presenter';
import RegistrationPagePresenter from 'presenters/RegistrationPagePresenter';
import RoutesEnum from 'router/RoutesEnum';

const mainPagePresenter = new MainPagePresenter();
const registrationPagePresenter = new RegistrationPagePresenter(
  mainPagePresenter
);
const mainMenuPagePresenter = new MainMenuPagePresenter();
const joinLobbyPagePresenter = new JoinLobbyPagePresenter(
  mainMenuPagePresenter
);
const lobbyPagePresenter = new LobbyPagePresenter(mainMenuPagePresenter);

const pagesDictionary = new Map<string, Presenter>();
pagesDictionary.set(RoutesEnum.MAIN, mainPagePresenter);
pagesDictionary.set(RoutesEnum.REGISTRATION, registrationPagePresenter);
pagesDictionary.set(RoutesEnum.MAIN_MENU, mainMenuPagePresenter);
pagesDictionary.set(RoutesEnum.JOIN_LOBBY, joinLobbyPagePresenter);
pagesDictionary.set(RoutesEnum.LOBBY, lobbyPagePresenter);

const DEFAULT_ROUTE = RoutesEnum.MAIN;

function extractPageArgs(pageRoute: string): string[] {
  return pageRoute.split('/');
}

async function handlePageHashChange(): Promise<void> {
  const pageArgs = extractPageArgs(window.location.hash);
  const pageRoute = <string>pageArgs.shift();
  const pagePresenter = pagesDictionary.get(pageRoute);

  if (pagePresenter === undefined) {
    window.location.hash = DEFAULT_ROUTE;
    return;
  }

  try {
    await pagePresenter.initAndRenderView(pageArgs);
  } catch (e) {
    ErrorHandler.handleError(e);
  }
}

export default {
  initRouter(): void {
    window.addEventListener('hashchange', handlePageHashChange);
  },

  goToRoute(route: RoutesEnum, args?: string[]): void {
    let targetRoute: string = route;

    if (args !== undefined) {
      args.forEach((routeArg) => {
        targetRoute += `/${routeArg}`;
      });
    }

    window.location.hash = targetRoute;
  },
};
