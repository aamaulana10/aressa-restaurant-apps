import FeaturesSource from "../../data/features-source";
import RestaurantSource from "../../data/restaurants-source";
import { createRestaurantItemTemplate, createFeaturesItemTemplate } from "../templates/template-creator";

const Home = {
    async render() {
        return `
            <div>
                <section class="content">
                 <div class="restaurant-list">
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
        const restaurants = await RestaurantSource.getList();
        console.log('RESTAURANT ', restaurants);

        const restaurantsContainer = document.querySelector('.restaurant-list');
        restaurants.forEach((restaurant) => {
            restaurantsContainer.innerHTML += createRestaurantItemTemplate(restaurant);
        });

        this.setupFeature();
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