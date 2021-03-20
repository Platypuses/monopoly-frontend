import MainPagePresenter from 'presenters/MainPagePresenter';
import Presenter from 'presenters/Presenter';
import TestPagePresenter from 'presenters/TestPagePresenter';
import RoutesEnum from 'router/RoutesEnum';

const pagesDictionary = new Map<string, Presenter>();
pagesDictionary.set(RoutesEnum.MAIN, new MainPagePresenter());
pagesDictionary.set(RoutesEnum.TEST, new TestPagePresenter());

const DEFAULT_ROUTE = RoutesEnum.MAIN;

async function handlePageHashChange(): Promise<void> {
  const pageRoute = window.location.hash;
  const pagePresenter = pagesDictionary.get(pageRoute);

  if (pagePresenter === undefined) {
    window.location.hash = DEFAULT_ROUTE;
    return;
  }

  await pagePresenter.initAndRenderView();
}

export default {
  initRouter(): void {
    window.addEventListener('hashchange', async () => handlePageHashChange());
    window.dispatchEvent(new Event('hashchange'));
  },
};
