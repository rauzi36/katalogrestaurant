import LikeButton from '../../src/scripts/utils/like-button';

const createLikeButtonPresenterWithRestaurant = async (restaurant) => {
  await LikeButton.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    restaurant,
  });
};

// eslint-disable-next-line import/prefer-default-export
export { createLikeButtonPresenterWithRestaurant };
