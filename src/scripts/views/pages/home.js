import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
    <section class="content">
      <div class="explore">
      <h3>Explore Restaurant</h3>
        <div class="rest-list"></div>
      </div>
    </section>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.allRestaurant();
    const restaurantsContainer = document.querySelector('.rest-list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },
};

export default Home;
