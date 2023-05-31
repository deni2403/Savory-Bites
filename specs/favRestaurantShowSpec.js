/* eslint-disable no-new */
import FavRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/fav-restaurant-search-view';
import FavRestaurantShowPresenter from '../src/scripts/views/pages/liked-restaurants/fav-restaurant-show-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
/* eslint-disable no-undef */

describe('Showing all favorite restaurants', () => {
  let view;

  const renderTemplate = () => {
    view = new FavRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  beforeEach(() => {
    renderTemplate();
  });

  describe('When no restaurants have been liked', () => {
    it('should ask for the favorite restaurants', () => {
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      new FavRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalledTimes(1);
    });

    it('should show the information that no restaurants have been liked', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurants-not-found').length).toEqual(1);
        done();
      });

      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
      favoriteRestaurants.getAllRestaurant.and.returnValues([]);

      new FavRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });

  describe('When favorite restaurants exist', () => {
    it('should show the restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.rest-info').length).toEqual(2);
        done();
      });
      const favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb, false);
      favoriteRestaurants.getAllRestaurant.and.returnValues([
        {
          id: 11,
          name: 'A',
        },
        {
          id: 22,
          name: 'B',
        },
      ]);
      new FavRestaurantShowPresenter({
        view,
        favoriteRestaurants,
      });
    });
  });
});
