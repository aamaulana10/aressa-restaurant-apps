import routes from '../routes/routes';
import UrlParser from '../routes/url-parser';

class App {
  constructor({ button, drawer, content }) {
    this._button = button;
    this._drawer = drawer;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    import('../utils/drawer-initiator').then((module) => {
      const DrawerInitiator = module.default;
      DrawerInitiator.init({
        button: this._button,
        drawer: this._drawer,
        content: this._content,
      });
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    try {
      this._content.innerHTML = await page.render();
      const skipLink = document.querySelector('.skip-link');
      const mainContent = document.querySelector('#mainContent');

      skipLink.addEventListener('click', (event) => {
        event.preventDefault();
        mainContent.focus();
      });

      await page.afterRender();
      return page;
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  }
}

export default App;