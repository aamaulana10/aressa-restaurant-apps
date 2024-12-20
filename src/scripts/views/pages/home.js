const Home = {
    async render() {
        return `
            <div>
                <section class="content">
                    <div class="restaurant-list">
                        <template id="restaurant-template">
                        <article class="restaurant-card">
                            <img class="restaurant-item__thumbnail" src="" alt="">
                            <div class="restaurant-item__city__wrapper">
                            <p class="restaurant-item__city"></p>
                            </div>
                            <div class="restaurant-item__content">
                            <p class="restaurant-item__rating"></p>
                            <h1 class="restaurant-item__title"></h1>
                            <p class="restaurant-item__description"></p>
                            </div>
                        </article>
                        </template>
                    </div>
                    </section>
                    <section class="features">
                    <h2 class="features__title">Why Choose Us</h2>
                    <div class="features__grid">
                        <template id="feature-template">
                        <article class="feature-card">
                            <h3 class="feature-content__title"></h3>
                            <p class="feature-content__description"></p>
                        </article>
                        </template>
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

    }
}

export default Home;