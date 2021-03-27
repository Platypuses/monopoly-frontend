import MainPagePresenter from 'presenters/MainPagePresenter';
import Presenter from 'presenters/Presenter';
import RegistrationPagePresenter from 'presenters/RegistrationPagePresenter';
import TestPagePresenter from 'presenters/TestPagePresenter';
import RoutesEnum from 'router/RoutesEnum';

const mainPagePresenter = new MainPagePresenter();
const testPagePresenter = new TestPagePresenter();
const registrationPagePresenter = new RegistrationPagePresenter(
  mainPagePresenter
);

const pagesDictionary = new Map<string, Presenter>();
pagesDictionary.set(RoutesEnum.MAIN, mainPagePresenter);
pagesDictionary.set(RoutesEnum.TEST, testPagePresenter);
pagesDictionary.set(RoutesEnum.REGISTRATION, registrationPagePresenter);

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

  goToRoute(route: RoutesEnum): void {
    window.location.hash = route;
  },
};
