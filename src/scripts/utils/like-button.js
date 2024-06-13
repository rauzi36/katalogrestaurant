/* eslint-disable max-len */
import FavoriteRestaurantIdb from '../data/favorite-resto-db';
import {
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
} from '../views/template/template-create';
// import NotificationHelper from './notification-helper'; // Import NotificationHelper

const LikeButton = {
  async init({ likeButtonContainer, restaurant }) {
    this._likeButtonContainer = likeButtonContainer;
    this._restaurant = restaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._renderLikedButton();
    } else {
      this._renderLikeButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(id);
    return !!restaurant;
  },

  _renderLikeButton() {
    this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

    const likeButton = document.querySelector('#likeButton');
    likeButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      // await NotificationHelper.notifyFavoriteRestaurant(this._restaurant); // Notify when added
      this._renderLikedButton(); // Render liked button after clicking like
    });
  },

  _renderLikedButton() {
    this._likeButtonContainer.innerHTML = createUnlikeButtonTemplate();

    const likedButton = document.querySelector('#likeButton');
    likedButton.addEventListener('click', async () => {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      // await NotificationHelper.notifyUnfavoriteRestaurant(this._restaurant); // Notify when removed
      this._renderLikeButton(); // Render like button after clicking unlike
    });
  },
};

export default LikeButton;
