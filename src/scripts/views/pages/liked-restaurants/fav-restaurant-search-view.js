import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavRestaurantSearchView {
  getTemplate() {
    return `
    <section class="content">
    <div class="searchBar">Search Restaurant : <input id="query" type="text" placeholder="restaurant name ex: Kafein"></div>
      <div class="explore">
        <h3>Favorite Restaurant</h3>
          <div id="restaurants" class="rest-list"></div>
      </div>
    </section>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavRestaurants(restaurants = []) {
    let html;

    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestaurantItemTemplate(restaurant)), '');
    } else {
      html = this._emptyRestaurantTemplate();
    }

    document.querySelector('.rest-list').innerHTML = html;
    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _emptyRestaurantTemplate() {
    return '<div class="restaurants-not-found">There are no Restaurants to display.</div>';
  }
}

export default FavRestaurantSearchView;
