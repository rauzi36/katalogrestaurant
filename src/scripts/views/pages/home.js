import RestoDbSource from '../../data/restodb-source';
import { createRestaurantItemTemplate } from '../template/template-create';

const Home = {
  async render() {
    return `
      <section id="content">
        <div class="terbaru">
          <h1 class="terbaru_label">Explore Restaurant</h1>
          <div class="daftar" id="test"></div>
        </div>
      `;
  },

  async afterRender() {
    const restaurant = await RestoDbSource.restaurantList();
    const restaurantContainer = document.querySelector('.daftar');
    // eslint-disable-next-line no-shadow
    restaurant.forEach((restaurant) => {
      restaurantContainer.innerHTML += createRestaurantItemTemplate(restaurant);
      document.body.classList.remove('hide-hero');
    });
  },
};

export default Home;
