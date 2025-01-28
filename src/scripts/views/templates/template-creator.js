import CONFIG from '../../globals/config';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-item">
     <a href="/#/detail/${restaurant.id}">
        <img class="restaurant-item__thumbnail lazyload" src=${CONFIG.BASE_URL_IMAGE + restaurant.pictureId} alt=${`Restaurant ${restaurant.name}`}>
        <div class="restaurant-item__city__wrapper">
            <p class="restaurant-item__city">${restaurant.city || '-'}</p>
        </div>
        <div class="restaurant-item__content">
            <p class="restaurant-item__rating">${restaurant.rating || '-'}</p>
            <h1 class="restaurant-item__name">${restaurant.name || '-'}</h1>
            <p class="restaurant-item__description">${restaurant.description || '-'}</p>
            <button class="read-more">Read More</button>
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
  <button aria-label="like this restaurant" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
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

const createDetailRestaurantItemTemplate = (restaurant) => `
    <div class="restaurant-detail__wrapper">
      <div class="restaurant-detail__header">
        <h2 class="restaurant-detail__title">${restaurant.name}</h2>
        <div class="restaurant-detail__info">
          <p><i class="fa fa-map-marker"></i> ${restaurant.address}, ${restaurant.city}</p>
          <p><i class="fa fa-star"></i> ${restaurant.rating}</p>
        </div>
      </div>
          
      <div class="restaurant-detail__image">
        <img class="lazyload" src="${CONFIG.BASE_URL_IMAGE + restaurant.pictureId}" alt="${restaurant.name}">
      </div>

      <div class="restaurant-detail__description">
       <h3>About</h3>
        <p>${restaurant.description}</p>
      </div>

      <div class="restaurant-detail__menus">
        <div class="menu-section">
        <h3><i class="fa fa-cutlery"></i> Foods</h3>
        <ul>
          ${restaurant.menus.foods.map((food) => `
            <li>${food.name}</li>
          `).join('')}
        </ul>
      </div>

      <div class="menu-section">
        <h3><i class="fa fa-glass"></i> Drinks</h3>
        <ul>
          ${restaurant.menus.drinks.map((drink) => `
           <li>${drink.name}</li>
          `).join('')}
        </ul>
      </div>
    </div>

    <div class="restaurant-detail__reviews">
      <h3><i class="fa fa-comments"></i> Customer Reviews</h3>
      <div class="review-list">
         ${restaurant.customerReviews.map((review) => `
          <div class="review-item">
          <div class="review-header">
          <strong>${review.name}</strong>
          <small>${review.date}</small>
          </div>
          <p>${review.review}</p>
          </div>
            `).join('')}
          </div>
          </div>
        </div>
      `;

const createSkeletonRestaurantTemplate = (count) => {
  let template = '';

  for (let i = 0; i < count; i++) {
    template += `
      <div class="restaurant-item skeleton">
        <div class="skeleton-thumbnail"></div>
        <div class="skeleton-content">
          <div class="skeleton-title"></div>
          <div class="skeleton-rating"></div>
          <div class="skeleton-description"></div>
        </div>
      </div>
    `;
  }
  return template;
};

export { createRestaurantItemTemplate, createFeaturesItemTemplate, createLikeButtonTemplate, createLikedButtonTemplate, createLoadingTemplate, createErrorTemplate, createDetailRestaurantItemTemplate, createSkeletonRestaurantTemplate };