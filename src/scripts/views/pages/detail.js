import UrlParser from '../../routes/url-parser';
import RestoDbSource from '../../data/restodb-source';
import LikeButton from '../../utils/like-button';
import { createRestaurantDetailTemplate } from '../template/template-create';
import FavoriteRestaurantIdb from '../../data/favorite-resto-db';
import PostReview from '../../utils/post-review';

const Detail = {
  async render() {
    return `
    <section id="content">
    <div class="detail">
      <h1  class="detail_label">Detail Restaurant</h1>
      <section id="detail-rest"></section>
      <div class="like" id="likeButtonContainer"></div>
    </div>

    <div class="form-review">
      <form>
        <div class="mb-3">
          <label for="inputName" class="form-label">Name</label>
          <input name="inputName" type="text" class="form-control" id="inputName">
        </div>
        <div class="mb-3">
          <label for="inputReview" class="form-label">Review</label>
          <input name="inputReview" type="text" class="form-control" id="inputReview">
        </div>
        <button id="submit-review" type="submit" class="btn">Submit</button>
      </form>
    </div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestoDbSource.restaurantDetail(url.id);
    const restaurantContainer = document.querySelector('#detail-rest');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant.restaurant);

    LikeButton.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestaurants: FavoriteRestaurantIdb,
      restaurant: {
        id: restaurant.restaurant.id,
        name: restaurant.restaurant.name,
        city: restaurant.restaurant.city,
        pictureId: restaurant.restaurant.pictureId,
        description: restaurant.restaurant.description,
        rating: restaurant.restaurant.rating,
      },
    });

    // Add class to hide the hero section
    document.body.classList.add('hide-hero');

    const submitReview = document.getElementById('submit-review');
    submitReview.addEventListener('click', (event) => {
      event.preventDefault();
      PostReview();
    });
  },

  async beforeUnload() {
    // Remove the class when navigating away from the detail page
    document.body.classList.remove('hide-hero');
  },
};

export default Detail;
