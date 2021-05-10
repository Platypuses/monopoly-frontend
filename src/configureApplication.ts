import Handlebars from 'handlebars/runtime';
import Router from 'router/Router';

function registerHandlebarsHelpers() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function repeat(count: number, block: any): Handlebars.SafeString {
    let result = '';

    for (let i = 0; i < count; i += 1) {
      result += block.fn(i);
    }

    return new Handlebars.SafeString(result);
  }

  Handlebars.registerHelper('repeat', repeat);
}

export default function configureApplication(): void {
  registerHandlebarsHelpers();
  document.onsubmit = (event) => event.preventDefault();
  Router.initRouter();
}
