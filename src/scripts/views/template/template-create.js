import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => {
  const maxLength = 150;
  const truncatedDescription = restaurant.description.length > maxLength
    ? `${restaurant.description.slice(0, maxLength - 3)}...`
    : restaurant.description;
  return `
    <div class="daftar_item">
      <img loading="lazy" class="daftar_item_gambar" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" title="Gambar ${restaurant.name}" crossorigin="anonymous">
      <div class="city">${restaurant.city}</div>
      <div class="daftar_item_content">
        <p class="daftar_item_rating">
          Rating: 
          <a class="daftar_item_rating_value">${restaurant.rating}</a>
        </p>
        <h1 class="name"><a href="#/detail/${restaurant.id}">${restaurant.name}</a></h1> <!-- Corrected this line -->
        <div class="daftar_item_desc">${truncatedDescription}</div>
      </div>
    </div>
  `;
};

const createRestaurantDetailTemplate = (restaurant) => `
  <div class="detail">
    <div class="container-info">
      <div class="img-container">
        <img loading="lazy" class="detail-img" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="Gambar ${restaurant.name}" crossorigin="anonymous"/>
      </div>
      <ul class="detail-info">
        <li class="detail-name">
          <i title="restaurant"></i>
          <h3 class="detail-item-name">${restaurant.name}</h3>
        </li>
        <li class="detail-address">
          <i class="fa fa-building"></i>
          <p class="detail-name-address">${restaurant.address}, ${restaurant.city}</p>
        </li>
        <li class="detail-rating">
          <i class="fa fa-star ratings"></i>
          <p class="detail-item-rating">${restaurant.rating}</p>
        </li>
        <h4>Description:</h4>
        <p class="detail-item-desc">${restaurant.description}</p>
      </ul>
      <div class="resto-category">
        ${restaurant.categories ? restaurant.categories.map((category) => `<span class="category">${category.name}</span>`).join(' ') : ''}
      </div>
    </div>
    <div class= menu>
    <h1 id="list-menu"><span>List Menu</span></h1>
    <div class="detail__menu-list">
      <div class="foods">
        <h3>Food</h3>
        <hr>
        <ul class="detail__foods">
          ${restaurant.menus && restaurant.menus.foods ? restaurant.menus.foods.map((food) => `<li><i class="fa fa-cutlery font-decoration"></i> ${food.name}</li>`).join('') : ''}
        </ul>
      </div>
      <div class="drinks">
        <h3>Drink</h3>
        <hr>
        <ul class="detail__drinks">
          ${restaurant.menus && restaurant.menus.drinks ? restaurant.menus.drinks.map((drink) => `<li><i class="fa fa-coffee font-decoration"></i> ${drink.name}</li>`).join('') : ''}
        </ul>
      </div>
    </div>
    </div>
    <h1 id="review-title"><span>Reviews</span></h1>
    <div class="detail-review">
      ${restaurant.customerReviews ? restaurant.customerReviews.map((review) => `
        <div class="detail-review-item">
          <div class="header-review">
            <p class="name-review"><i title="restaurant" class="fa fa-user-circle" style="font-size:1.3em; padding-right:10px;"></i>${review.name}</p>
            <p class="date-review">${review.date}</p>
          </div>
          <div class="body-review">
            ${review.review}
          </div>
        </div>
      `).join('') : ''}
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createUnlikeButtonTemplate,
};
