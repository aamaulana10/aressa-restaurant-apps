import FavoriteRestaurantIdb from "../../data/favorite-restaurant-idb";
import { createRestaurantItemTemplate } from "../templates/template-creator";

const Favorite = {
    async render() {
        return `
         <div class="content">
          <h2 class="content__heading">Your Liked Restaurant</h2>
          <div class="restaurant-list">
          </div>
         </div>
    `;
    },

    async afterRender() {
        const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
        const restaurantsContainer = document.querySelector('.restaurant-list');
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });
    },
};

export default Favorite;