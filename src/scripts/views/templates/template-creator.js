import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
    <div class="rest-info">
        <img id="rest-thumbnail" class="lazyload" data-src="${CONFIG.BASE_SMALL_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name || '-'}" crossorigin="anonymous">
        <div class="rest-content">
            <p class="rest-rating">Rating : ${restaurant.rating || '-'}</p>
            <p class="rest-city">City : ${restaurant.city || '-'}</p>
            <h4 class="rest-name"><a href="/#/detail/${restaurant.id || '-'}">${restaurant.name || '-'}</a></h4>
            <p class="rest-description">${restaurant.description || '-'}</p>
        </div>
    </div>
`;

const createRestaurantDetailTemplate = (restaurant) => `
  <h4 class="restaurant-name">${restaurant.name}</h4>
  <img class="restaurant-image" src="${CONFIG.BASE_LARGE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" />
  <div class="restaurant-info">
    <h5>RATING : ${restaurant.rating}</h5>
    <h5>Address</h5>
    <p>${restaurant.address}</p>
    <h5>City</h5>
    <p>${restaurant.city}</p>
    <h5>Description</h5>
    <p>${restaurant.description}</p>
  </div>
  <div class="rest-menus">
    <div class="foods">
      <h5>Foods :</h5>
      <ul>${restaurant.menus.foods.map((food) => `<li>${food.name}</li>`).join(' ')}</ul>
    </div>
    <div class="drinks">
      <h5>Drinks :</h5>
      <ul>${restaurant.menus.drinks.map((drink) => `<li>${drink.name}</li>`).join(' ')}</ul>
    </div>
  </div>
  <div class="customer-reviews">
  <h5 class="list-reviews">Reviews : </h5>
  ${restaurant.customerReviews.map((review) => `
    <div class="customer">
      <h5>${review.name}</h5>
      <p class="review-comment">${review.review}</p>
      <p class="review-date">${review.date}</p>
    </div>
  `).join('')}
  </div>
`;

const createRestaurantLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createRestaurantUnlikeButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createRestaurantLikeButtonTemplate,
  createRestaurantUnlikeButtonTemplate,
};
