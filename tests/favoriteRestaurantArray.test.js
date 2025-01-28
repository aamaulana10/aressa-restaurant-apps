import { afterEach, describe } from '@jest/globals';
import { itActsAsFavoriteRestaurantModel } from './contract/favoriteRestaurantContract';

let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id == id);
  },

  getAllRestaurants() {
    return favoriteRestaurants;
  },

  putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestaurants
    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id

    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id != id);
  },

  async searchRestaurants(query) {
    const restaurants = await this.getAllRestaurants();

    const foundRestaurants = restaurants.filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '').toLowerCase();
      const isMatch = loweredCaseRestaurantName.includes(query.toLowerCase());
      return isMatch;
    });

    return foundRestaurants;
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestaurants = [];
  });

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
