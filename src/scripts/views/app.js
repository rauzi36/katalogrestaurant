/* eslint-disable class-methods-use-this */
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    hero, menu, button, drawer, content,
  }) {
    this.hero = hero;
    this._menu = menu;
    this._button = button;
    this._drawer = drawer;
    this._content = content;
    this.currentPage = null; // Track the current page

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      hero: this.hero,
      menu: this._menu,
      button: this._button,
      drawer: this._drawer,
      content: this._content,
    });

    // Initialize other components if necessary
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];

    // Call beforeUnload on the current page before rendering a new one
    if (this.currentPage && this.currentPage.beforeUnload) {
      await this.currentPage.beforeUnload();
    }

    this._content.innerHTML = await page.render();
    await page.afterRender();
    this.currentPage = page; // Set the current page

    this._toggleHeroVisibility(url);
    this._initSkipLink(); // Ensure the skip link works after page render
  }

  _initSkipLink() {
    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#mainContent');

    // Remove existing event listener to avoid multiple listeners
    skipLink.removeEventListener('click', this._skipLinkHandler);

    // Define and add the new event listener
    this._skipLinkHandler = (e) => {
      e.preventDefault();
      mainContent.scrollIntoView({ behavior: 'smooth' });
      skipLink.blur();
    };

    skipLink.addEventListener('click', this._skipLinkHandler);
  }

  _toggleHeroVisibility(url) {
    const hero = document.querySelector('#hero');
    if (hero) { // Ensure hero element exists
      if (url !== '/') {
        hero.style.display = 'none';
      } else {
        hero.style.display = 'block';
      }
    }
  }
}

export default App;
