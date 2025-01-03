import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
         <div class="content">
          <div class="favorite__wrapper">
            <h2 class="content__title">Your Liked Restaurant</h2>
            <div class="restaurant-list">
            </div>
          </div>
         </div>
    `;
  },

  async afterRender() {

    const heroSection = document.querySelector('.hero');
    if (heroSection) heroSection.style.display = 'none';

    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantsContainer = document.querySelector('.restaurant-list');
    restaurants.forEach((restaurant) => {
      restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
    });
  },

  async beforeLeave() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) heroSection.style.display = 'grid';
  },
};

export default Favorite;