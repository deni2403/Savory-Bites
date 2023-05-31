/* eslint-disable no-undef */
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/liked-restaurants/fav-restaurant-search-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favorite-restaurant-idb';
import FavRestaurantSearchView from '../src/scripts/views/pages/liked-restaurants/fav-restaurant-search-view';

describe('Searching restaurants', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchRestaurants = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;
    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavRestaurantSearchView();
    document.body.innerHTML = view.getTemplate();
  };

  const constructPresenter = () => {
    favoriteRestaurants = spyOnAllFunctions(FavoriteRestaurantIdb);
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {
    it('should be able to capture the query typed by the user', () => {
      searchRestaurants('restaurant a');

      expect(presenter.latestQuery)
        .toEqual('restaurant a');
    });

    it('should ask the model to search for restaurants', () => {
      searchRestaurants('restaurant a');

      expect(favoriteRestaurants.searchRestaurants)
        .toHaveBeenCalledWith('restaurant a');
    });

    it('should show - when the restaurant returned does not contain a name', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.rest-name');
        expect(restaurantNames.item(0).textContent).toEqual('-');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([
        { id: 444 },
      ]);

      searchRestaurants('restaurant a');
    });

    it('should show the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.rest-info').length)
          .toEqual(3);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a')
        .and
        .returnValues([
          { id: 111, name: 'restaurant abc' },
          { id: 222, name: 'ada juga restaurant abcde' },
          { id: 333, name: 'ini juga boleh restaurant a' },
        ]);

      searchRestaurants('restaurant a');
    });

    it('should show the name of the restaurants found by Favorite Restaurants', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        const restaurantNames = document.querySelectorAll('.rest-name');

        expect(restaurantNames.item(0).textContent)
          .toEqual('restaurant abc');
        expect(restaurantNames.item(1).textContent)
          .toEqual('ada juga restaurant abcde');
        expect(restaurantNames.item(2).textContent)
          .toEqual('ini juga boleh restaurant a');

        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a')
        .and
        .returnValues([
          { id: 111, name: 'restaurant abc' },
          { id: 222, name: 'ada juga restaurant abcde' },
          { id: 333, name: 'ini juga boleh restaurant a' },
        ]);

      searchRestaurants('restaurant a');
    });
  });

  describe('When query is empty', () => {
    it('should capture the query as empty', () => {
      searchRestaurants(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchRestaurants('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite restaurants', () => {
      searchRestaurants('    ');
      expect(favoriteRestaurants.getAllRestaurant).toHaveBeenCalled();
    });
  });

  describe('When no favorite restaurants could be found', () => {
    it('should show the empty message', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.restaurants-not-found').length).toEqual(1);
        done();
      });

      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);

      searchRestaurants('restaurant a');
    });

    it('should not show any restaurant', (done) => {
      document.getElementById('restaurants').addEventListener('restaurants:updated', () => {
        expect(document.querySelectorAll('.rest-info').length).toEqual(0);
        done();
      });
      favoriteRestaurants.searchRestaurants.withArgs('restaurant a').and.returnValues([]);
      searchRestaurants('restaurant a');
    });
  });
});
