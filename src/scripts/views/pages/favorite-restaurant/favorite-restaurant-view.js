import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="content">
        <div class="favorite_content__wrapper">
          <h2 class="content__heading">Your Favorite Restaurant</h2>
         <div class="search-container">
          <input 
            id="query" 
            type="text" 
            placeholder="Search your favorite Restaurant"
            class="modern-input">
         </div>
         <div id="restaurants" class="restaurant-list">
        </div>
        </div>
      </div>
    `;
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  showFavoriteRestaurants(restaurant) {
    let html;

    if (restaurant.length) {
      html = restaurant.reduce((carry, restaurants) => carry.concat(createRestaurantItemTemplate(restaurants)), '');
    } else {
      html = this._getEmptyRestaurantTemplate();
    }

    document.getElementById('restaurants').innerHTML = html;

    document.getElementById('restaurants').dispatchEvent(new Event('restaurants:updated'));
  }

  _getEmptyRestaurantTemplate() {
    return `
      <div class="restaurant-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
