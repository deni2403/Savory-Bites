/* eslint-disable no-undef */
/* eslint-disable consistent-return */
import { itActsAsFavoriteRestaurantModel } from './contract/favRestaurantContract';

// eslint-disable-next-line prefer-const
let favoriteRestaurants = [];

const FavoriteRestaurantArray = {
  getRestaurant(id) {
    if (!id) {
      return;
    }

    return favoriteRestaurants.find((restaurant) => restaurant.id === id);
  },

  getAllRestaurant() {
    return favoriteRestaurants;
  },

  putRestaurant(restaurant) {
    // eslint-disable-next-line no-prototype-builtins
    if (!restaurant.hasOwnProperty('id')) {
      return;
    }

    if (this.getRestaurant(restaurant.id)) {
      return;
    }

    favoriteRestaurants.push(restaurant);
  },

  deleteRestaurant(id) {
    favoriteRestaurants = favoriteRestaurants.filter((restaurant) => restaurant.id !== id);
  },

  searchRestaurants(query) {
    return this.getAllRestaurant().filter((restaurant) => {
      const loweredCaseRestaurantName = (restaurant.name || '-').toLowerCase();
      const jammedRestaurantName = loweredCaseRestaurantName.replace(/\s/g, '');
      const loweredCaseQuery = query.toLowerCase();
      const jammedQuery = loweredCaseQuery.replace(/\s/g, '');
      return jammedRestaurantName.indexOf(jammedQuery) !== -1;
    });
  },
};

describe('Favorite Restaurant Array Contract Test Implementation', () => {
  // eslint-disable-next-line no-return-assign
  afterEach(() => favoriteRestaurants = []);

  itActsAsFavoriteRestaurantModel(FavoriteRestaurantArray);
});
