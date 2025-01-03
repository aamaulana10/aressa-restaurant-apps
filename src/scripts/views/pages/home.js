import RestaurantSource from '../../data/restaurants-source';
import { createRestaurantItemTemplate, createErrorTemplate, createLoadingTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
            <div>
                <section class="content">
                <div>
                <h2 class="content__title">Our Healty Partner</h2>
                ${createLoadingTemplate()}
                <div id="mainError"></div>
                 <div class="restaurant-list">
                 </div>
                 </div>
                </section>
            </div>
        `;
  },


  async afterRender() {

    const loadingElement = document.querySelector('#loading');
    const restaurantsContainer = document.querySelector('.restaurant-list');
    const errorContainer = document.querySelector('#mainError');

    // Show loading
    loadingElement.style.display = 'flex';
    restaurantsContainer.style.display = 'none';
    errorContainer.style.display = 'none';

    setTimeout(async () => {

      try {

        const restaurants = await RestaurantSource.getAllRestaurants();
        console.log('RESTAURANT ', restaurants);

        loadingElement.style.display = 'none';

        if (restaurants.error) {
          restaurantsContainer.style.display = 'none';
          errorContainer.style.display = 'block';
          errorContainer.innerHTML = createErrorTemplate(
            'Failed to load restaurants. Please check your connection and try again.',
            true
          );
          return;
        }

        if (!restaurants.length) {
          restaurantsContainer.style.display = 'none';
          errorContainer.style.display = 'block';
          errorContainer.innerHTML = createErrorTemplate(
            'No restaurants found.',
            false
          );
          return;
        }

        errorContainer.style.display = 'none';
        restaurantsContainer.style.display = 'grid';

        restaurants.forEach((restaurant) => {
          restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });

      } catch (error) {
        loadingElement.style.display = 'none';
        restaurantsContainer.style.display = 'none';
        errorContainer.style.display = 'block';
        console.log(error);
        if (!navigator.onLine) {
          errorContainer.innerHTML = createErrorTemplate(
            'You are offline. Please check your internet connection.',
            true
          );
        } else {
          errorContainer.innerHTML = createErrorTemplate(
            'Something went wrong while loading the restaurants.',
            true
          );
        }
      }
    }, 2000);
  },
};

export default Home;