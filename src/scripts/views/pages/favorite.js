import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import FavoriteRestaurantSearchPresenter from './favorite-restaurant/favorite-restaurant-search-presenter';
import FavoriteRestaurantShowPresenter from './favorite-restaurant/favorite-restaurant-show-presenter';
import FavoriteRestaurantView from './favorite-restaurant/favorite-restaurant-view';

const view = new FavoriteRestaurantView();

const Favorite = {
  async render() {
    return view.getTemplate();
  },

  async afterRender() {
    new FavoriteRestaurantShowPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
    new FavoriteRestaurantSearchPresenter({ view, favoriteRestaurants: FavoriteRestaurantIdb });
  },
};


export default Favorite;