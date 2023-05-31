/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('There are no Restaurants to display', '.restaurants-not-found');
});

Scenario('liking a restaurant', async ({ I }) => {
  I.see('There are no Restaurants to display', '.restaurants-not-found');
  I.amOnPage('/');

  I.waitForElement('.rest-name a', 10);
  I.seeElement('.rest-name a');
  const firstRestaurant = locate('.rest-name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.rest-list');
  const likedRestaurantName = await I.grabTextFrom('.rest-name a');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('Unliking a restaurants', async ({ I }) => {
  I.see('There are no Restaurants to display', '.restaurants-not-found');
  I.amOnPage('/');

  I.waitForElement('.rest-name a', 10);
  I.seeElement('.rest-name a');
  const firstRestaurant = locate('.rest-name a').first();
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.rest-list');
  I.click(firstRestaurant);

  I.waitForElement('#likeButton');
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.dontSeeElement(firstRestaurant);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('There are no Restaurants to display', '.restaurants-not-found');
  I.amOnPage('/');

  I.waitForElement('.rest-name a', 10);
  I.seeElement('.rest-name a');

  const names = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.rest-name a').at(i));
    I.waitForElement('#likeButton');
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    names.push(await I.grabTextFrom('.restaurant-name'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const searchQuery = names[1].substring(1, 3);
  const matchingRestaurants = names.filter((name) => name.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.rest-info');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (name, index) => {
    const visibleName = await I.grabTextFrom(locate('.rest-name').at(index + 1));
    assert.strictEqual(name, visibleName);
  });
});
