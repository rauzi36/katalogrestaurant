/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.content__restaurant-title');
  const firstRestaurantName = await I.grabTextFrom('.content__restaurant-title');
  I.click(firstRestaurantName);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Verify the restaurant is liked
  I.seeElement('#likeButton.liked');

  // Go to the favorite page
  I.amOnPage('/#/favorite');
  I.seeElement('.card');
  const likedRestaurantName = await I.grabTextFrom('.content__restaurant-title');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('removing one favorite restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');
  I.seeElement('.content__restaurant-title');
  const firstRestaurantName = await I.grabTextFrom('.content__restaurant-title');
  I.click(firstRestaurantName);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.seeElement('.card');
  const likedRestaurantName = await I.grabTextFrom('.content__restaurant-title');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
  I.amOnPage('/#/favorite');
  I.seeElement('.content__restaurant-title');
  const firstFavoriteRestaurantName = await I.grabTextFrom('.content__restaurant-title');
  I.click(firstFavoriteRestaurantName);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Verify the restaurant is unliked
  I.dontSeeElement('#likeButton.liked');
  // Verify the restaurant is unliked
  // Go to the favorite page again
  I.amOnPage('/#/favorite');
  I.dontSeeElement('#likeButton.liked');

  // Go to the favorite page again
  I.amOnPage('/#/favorite');

  // Verify the favorite list is empty
  I.dontSeeElement('.restaurant-list .daftar_item');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});
