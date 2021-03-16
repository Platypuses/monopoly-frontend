import Presenter from 'presenters/Presenter';
import MainPagePresenter from 'presenters/MainPagePresenter';
import TestPagePresenter from 'presenters/TestPagePresenter';

enum Routes {
  MAIN = 'main',
  TEST = 'test',
}

const pages = new Map<string, Presenter>();
pages.set(Routes.MAIN, new MainPagePresenter());
pages.set(Routes.TEST, new TestPagePresenter());

const DEFAULT_ROUTE = Routes.MAIN;

async function handlePageHashChange(): Promise<void> {
  const pageRoute = window.location.hash.substr(1);
  const pagePresenter = pages.get(pageRoute);

  if (pagePresenter === undefined) {
    window.location.hash = `#${DEFAULT_ROUTE}`;
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
