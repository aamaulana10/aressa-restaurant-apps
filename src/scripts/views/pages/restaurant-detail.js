import RestaurantSource from '../../data/restaurants-source';
import UrlParser from '../../routes/url-parser';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import { createDetailRestaurantItemTemplate, createErrorTemplate } from '../templates/template-creator';

const RestaurantDetail = {
  async render() {
    return `
      <div class="content">
        <div id="loading" class="skeleton-detail">
          <div class="skeleton-detail__header skeleton"></div>
          <div class="skeleton-detail__image skeleton"></div>
          <div class="skeleton-detail__info skeleton"></div>
          <div class="skeleton-detail__description skeleton"></div>
        </div>
        <div id="mainError"></div>
        <div id="restaurant" class="restaurant-detail"></div>
        <div id="likeButtonContainer"></div>
      </div>
    `;
  },

  async afterRender() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) heroSection.style.display = 'none';

    const loadingElement = document.querySelector('#loading');
    const restaurantContainer = document.querySelector('#restaurant');
    const errorContainer = document.querySelector('#mainError');

    // Show loading skeleton
    loadingElement.style.display = 'block';
    restaurantContainer.style.display = 'none';
    errorContainer.style.display = 'none';

    setTimeout(async () => {
      try {
        const url = UrlParser.parseActiveUrlWithoutCombiner();

        const restaurant = await RestaurantSource.getDetailRestaurant(url.id);

        if (restaurant.error) {
          throw new Error(restaurant.message);
        }

        // Hide loading skeleton and show content
        loadingElement.style.display = 'none';
        restaurantContainer.style.display = 'block';
        restaurantContainer.innerHTML = createDetailRestaurantItemTemplate(restaurant);

        // Initialize like button
        const likeButtonContainer = document.querySelector('#likeButtonContainer');
        await LikeButtonPresenter.init({
          likeButtonContainer,
          restaurant: {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            pictureId: restaurant.pictureId,
            city: restaurant.city,
            rating: restaurant.rating,
          },
        });
      } catch (error) {
        // Show error and hide other elements
        loadingElement.style.display = 'none';
        restaurantContainer.style.display = 'none';
        errorContainer.style.display = 'block';
        errorContainer.innerHTML = createErrorTemplate(
          error.message || 'Failed to load restaurant details'
        );
      }
    }, 2000);
  },

  async beforeLeave() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) heroSection.style.display = 'grid';
  },
};

export default RestaurantDetail;