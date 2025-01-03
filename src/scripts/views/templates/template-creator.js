import CONFIG from '../../globals/config';
const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-card">
     <a href="/#/detail/${restaurant.id}">
        <img class="restaurant-item__thumbnail" src=${CONFIG.BASE_URL_IMAGE + restaurant.pictureId} alt=${`Restaurant ${restaurant.name}`}>
        <div class="restaurant-item__city__wrapper">
            <p class="restaurant-item__city">${restaurant.city}</p>
        </div>
        <div class="restaurant-item__content">
            <p class="restaurant-item__rating">${restaurant.rating}</p>
            <h1 class="restaurant-item__title">${restaurant.name}</h1>
            <p class="restaurant-item__description">${restaurant.description}</p>
        </div>
     </a>
    </div>
`;

const createFeaturesItemTemplate = (feature) => `
    <div id="feature-template">
        <div class="feature-card">
            <h3 class="feature-content__title">${feature.title}</h3>
            <p class="feature-content__description">${feature.title}</p>
        </div>
    </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLoadingTemplate = () => `
  <div id="loading" class="loading-container">
    <div class="loading-spinner"></div>
  </div>
`;

const createErrorTemplate = (message = 'Something went wrong', withRetry = true) => `
  <div id="mainError" class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <i class="fa fa-exclamation-circle"></i>
      </div>
      <h3 class="error-title">Oops!</h3>
      <p class="error-message">${message}</p>
      ${withRetry ? `
        <button class="error-retry" onclick="window.location.reload()">
          <i class="fa fa-refresh"></i> Try Again
        </button>
      ` : ''}
    </div>
  </div>
`;

export { createRestaurantItemTemplate, createFeaturesItemTemplate, createLikeButtonTemplate, createLikedButtonTemplate, createLoadingTemplate, createErrorTemplate };