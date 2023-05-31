class FavRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavRestaurants();
  }

  _displayRestaurants(restaurants) {
    this._view.showFavRestaurants(restaurants);
  }

  async _showFavRestaurants() {
    const restaurants = await this._favoriteRestaurants.getAllRestaurant();
    this._displayRestaurants(restaurants);
  }
}

export default FavRestaurantShowPresenter;
