import { createRestaurantItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Restaurant</h2>
  
        <div id="restaurants" class="restaurants">
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
        Tidak ada film untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
