const DrawerInitiator = {
  init({
    menu, drawer, content, hero,
  }) {
    if (menu && drawer) {
      menu.addEventListener('click', (event) => {
        this._toggleDrawer(event, drawer);
      });
    }

    if (content && drawer) {
      content.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
      });
    }

    if (hero && drawer) {
      hero.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
      });
    }

    // Adding event listener to close drawer when clicking outside the drawer
    document.addEventListener('click', (event) => {
      if (drawer.classList.contains('open') && !drawer.contains(event.target) && event.target !== menu) {
        this._closeDrawer(event, drawer);
      }
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('open');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('open');
  },
};

export default DrawerInitiator;
