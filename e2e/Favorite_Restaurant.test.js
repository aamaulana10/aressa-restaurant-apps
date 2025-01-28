const assert = require('assert');

Feature('Favorite Restaurant');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorite restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
  I.amOnPage('/');

  // Tunggu sampai elemen restaurant muncul
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');

  const firstRestaurant = locate('.restaurant-item').first();
  const firstRestaurantName = locate('.restaurant-item__name').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurantName);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant-item__name');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
  // Like restaurant first
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  // Unlike the restaurant
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('.restaurant-item');
  I.click(locate('.restaurant-item').first());

  I.waitForElement('#likeButton', 10);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');

  // Add some restaurants to favorites first
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.waitForElement('.restaurant-item', 10);
    const restaurantName = locate('.restaurant-item__name').at(i);
    titles.push(await I.grabTextFrom(restaurantName));

    I.click(locate('.restaurant-item').at(i));
    I.waitForElement('#likeButton', 10);
    I.click('#likeButton');
    I.amOnPage('/');
  }

  // Go to favorite page
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('#query');

  // Make sure all liked restaurants are displayed
  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(visibleLikedRestaurants, 3);

  // Search using first restaurant name
  const searchQuery = titles[0].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // Wait for search results
  I.wait(1);

  // Get matching restaurants
  const matchingRestaurants = titles.filter((title) => title.toLowerCase().includes(searchQuery.toLowerCase()));
  const searchResultCount = await I.grabNumberOfVisibleElements('.restaurant-item');

  // Verify search results
  assert.strictEqual(searchResultCount, matchingRestaurants.length);

  // Verify restaurant names in search results
  for (let i = 0; i < matchingRestaurants.length; i++) {
    const visibleName = await I.grabTextFrom(locate('.restaurant-item__name').at(i + 1));
    assert.ok(visibleName.toLowerCase().includes(searchQuery.toLowerCase()),
      `Restaurant "${visibleName}" should contain search query "${searchQuery}"`);
  }
});

Scenario('searching restaurants with empty query', async ({ I }) => {
  // Like some restaurants first
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);

  // Like first restaurant
  I.click(locate('.restaurant-item').first());
  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');

  // Go to favorite and search
  I.amOnPage('/#/favorite');
  I.waitForElement('.restaurant-item', 10);
  I.seeElement('#query');

  // Search with empty query
  I.fillField('#query', ' ');
  I.pressKey('Enter');

  // Should show all liked restaurants
  I.seeElement('.restaurant-item');
  const visibleRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');
  assert.strictEqual(visibleRestaurants, 1);
});

Scenario('searching restaurants with non-existent name', async ({ I }) => {
  // Like a restaurant first
  I.amOnPage('/');
  I.waitForElement('.restaurant-item', 10);
  I.click(locate('.restaurant-item').first());
  I.waitForElement('#likeButton', 10);
  I.click('#likeButton');

  // Search non-existent restaurant
  I.amOnPage('/#/favorite');
  I.waitForElement('#query', 10);
  I.fillField('#query', 'ThisRestaurantDoesNotExist');
  I.pressKey('Enter');

  // Should show not found message
  I.see('Tidak ada restaurant untuk ditampilkan', '.restaurant-item__not__found');
});
