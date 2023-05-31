/* eslint-disable no-new */
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavRestaurantSearchView from './liked-restaurants/fav-restaurant-search-view';
import FavRestaurantShowPresenter from './liked-restaurants/fav-restaurant-show-presenter';
import FavoriteRestaurantSearchPresenter from './liked-restaurants/fav-restaurant-search-presenter';

const view = new FavRestaurantSearchView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};

export default Favorite;
