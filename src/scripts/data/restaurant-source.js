import API_ENDPOINT from '../globals/api-endpoint';

class RestaurantSource {
  static async allRestaurant() {
    const response = await fetch(API_ENDPOINT.ALL_RESTAURANT);
    const responseJSON = await response.json();
    return responseJSON.restaurants;
  }

  static async detailRestaurant(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJSON = await response.json();
    return responseJSON.restaurant;
  }
}

export default RestaurantSource;
