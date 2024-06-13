const NotificationHelper = {
  async sendNotification({ title, options }) {
    if (!('Notification' in window)) {
      console.error('This browser does not support notifications.');
      return;
    }

    if (Notification.permission === 'granted') {
      // eslint-disable-next-line no-new
      new Notification(title, options);
    } else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // eslint-disable-next-line no-new
        new Notification(title, options);
      }
    }
  },

  async notifyFavoriteRestaurant(restaurant) {
    const title = 'Restaurant added to favorites!';
    const options = {
      body: `${restaurant.name} has been added to your favorites.`,
      icon: '/images/icons/icon-192x192.png', // Path to the icon image
      badge: '/images/icons/icon-72x72.png', // Path to the badge image
    };
    await this.sendNotification({ title, options });
  },

  async notifyUnfavoriteRestaurant(restaurant) {
    const title = 'Restaurant removed from favorites';
    const options = {
      body: `${restaurant.name} has been removed from your favorites.`,
      icon: '/images/icons/icon-192x192.png', // Path to the icon image
      badge: '/images/icons/icon-72x72.png', // Path to the badge image
    };
    await this.sendNotification({ title, options });
  },
};

export default NotificationHelper;
