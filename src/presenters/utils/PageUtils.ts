import WebSocketApi from 'model/api/WebSocketApi';
import SecurityContextStorage from 'model/storage/SecurityContextStorage';
import Router from 'router/Router';
import RoutesEnum from 'router/RoutesEnum';

export default {
  extractIdFromArgs(args: string[]): number | null {
    if (args.length === 0) {
      return null;
    }

    const id = Number.parseInt(args[0], 10);

    if (Number.isNaN(id)) {
      return null;
    }

    return id;
  },

  logout(): void {
    SecurityContextStorage.clear();
    WebSocketApi.closeWebSocket();
    Router.goToRoute(RoutesEnum.LOGIN);
  },
};
