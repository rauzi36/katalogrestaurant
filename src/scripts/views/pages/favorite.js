import FavoriteRestaurants from '../../data/favorite-resto-db';
import { createRestaurantItemTemplate } from '../template/template-create';

const Favorite = {
  async render() {
    return `
    <section id="content">
      <div class="favorite" id="favoriteRestaurants">
        <h1 class="favorite_label" id="favorite_label">Favorite Restaurant</h1>
      <div id="favoriteList" class="restaurant-list"></div>
    <div class="restaurant-item__not__found"></div>
  </div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurants.getAllRestaurant();
    const restaurantContainer = document.getElementById('favoriteList');
    const emptyMessageContainer = document.querySelector('.restaurant-item__not__found');

    if (restaurants.length === 0) {
      emptyMessageContainer.innerHTML = `
        <h3>Tidak ada restoran favorit yang ditampilkan</h3>
      `;
    } else {
      restaurants.forEach((restaurant) => {
        const restaurantItem = document.createElement('div');
        restaurantItem.className = 'daftar_item';
        restaurantItem.innerHTML = createRestaurantItemTemplate(restaurant);
        restaurantContainer.appendChild(restaurantItem);
      });
    }

    // Add class to hide the hero section
    document.body.classList.add('hide-hero');
  },

  async beforeUnload() {
    // Show the hero section when navigating away from this page
    const hero = document.querySelector('#hero');
    if (hero) {
      hero.style.display = 'block';
    }
  },
};

export default Favorite;
