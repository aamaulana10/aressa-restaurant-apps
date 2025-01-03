import FeaturesSource from "../../data/features-source";
import RestaurantSource from "../../data/restaurants-source";
import { createRestaurantItemTemplate, createFeaturesItemTemplate, createErrorTemplate, createLoadingTemplate } from "../templates/template-creator";

const Home = {
    async render() {
        return `
            <div>
                <section class="content">
                <div>
                <h2>Our special restourant</h2>
                ${createLoadingTemplate()}
                <div id="mainError"></div>
                 <div class="restaurant-list">
                 </div>
                 </div>
                </section>
                <section class="features">
                 <h2 class="features__title">Why Choose Us</h2>
                 <div class="features__grid">
                 </div>
                </section>
                <section class="newsletter">
                 <h2>Stay Updated</h2>
                 <p>Subscribe to our newsletter for the latest restaurant updates and exclusive offers</p>
                 <form class="newsletter__form">
                    <input type="email" class="newsletter__input" placeholder="Enter your email" required>
                    <button type="submit" class="newsletter__button">Subscribe</button>
                </form>
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

        this.setupFeature();

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

    async setupFeature() {
        const features = await FeaturesSource.getListFeatures()
        console.log('FEATURES ', features);

        const featuresContainer = document.querySelector('.features__grid');
        features.forEach((feature) => {
            featuresContainer.innerHTML += createFeaturesItemTemplate(feature);
        });
    }
}

export default Home;