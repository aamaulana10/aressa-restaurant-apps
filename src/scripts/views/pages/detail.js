import RestaurantSource from "../../data/restaurants-source";
import UrlParser from "../../routes/url-parser";
import LikeButtonInitiator from "../../utils/like-button-initiator";
import { createDetailRestaurantItemTemplate, createErrorTemplate, createLikeButtonTemplate, createLoadingTemplate } from "../templates/template-creator";

const Detail = {
    async render() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        return `
             <div class="content">
                ${createLoadingTemplate()}
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

        try {
            const url = UrlParser.parseActiveUrlWithoutCombiner();
            loadingElement.style.display = 'flex';
            restaurantContainer.style.display = 'none';
            errorContainer.style.display = 'none';

            const restaurant = await RestaurantSource.getDetailRestaurant(url.id);

            if (restaurant.error) {
                throw new Error(restaurant.message);
            }

            loadingElement.style.display = 'none';
            restaurantContainer.style.display = 'block';
            restaurantContainer.innerHTML = createDetailRestaurantItemTemplate(restaurant);

            // Initialize like button
            const likeButtonContainer = document.querySelector('#likeButtonContainer');

            LikeButtonInitiator.init({
                likeButtonContainer: likeButtonContainer,
                restaurant: {
                    id: restaurant.id,
                    name: restaurant.name,
                    description: restaurant.description,
                    pictureId: restaurant.pictureId,
                    city: restaurant.city,
                    rating: restaurant.rating
                },
            });

        } catch (error) {
            loadingElement.style.display = 'none';
            restaurantContainer.style.display = 'none';
            errorContainer.style.display = 'block';
            errorContainer.innerHTML = createErrorTemplate(
                error.message || 'Failed to load restaurant details'
            );
        }
    },

    async beforeLeave() {
        const heroSection = document.querySelector('.hero');
        if (heroSection) heroSection.style.display = 'grid';
    },
}

export default Detail;