import '../styles/main.css';
import '../styles/responsive.css';
import '../styles/animation.css';
import restaurantData from '../public/data/restaurants.json';
import featureData from '../public/data/features.json';

const menuLength = 3;

const setupRestaurant = () => {
    const restaurantList = document.querySelector('.restaurant-list');
    const template = document.querySelector('#restaurant-template');

    const populateRestaurants = (restaurants) => {
        restaurants.forEach((restaurant, index) => {
            const restaurantElement = template.content.cloneNode(true);

            const article = restaurantElement.querySelector('.restaurant-card');
            article.setAttribute('tabindex', menuLength + 1 + index);
            article.setAttribute('aria-label', `Restaurant ${restaurant.name}`);

            const thumbnail = restaurantElement.querySelector('.restaurant-item__thumbnail');
            thumbnail.src = restaurant.pictureId;
            thumbnail.alt = `Restaurant ${restaurant.name}`;

            const city = restaurantElement.querySelector('.restaurant-item__city');
            city.textContent = restaurant.city;

            const rating = restaurantElement.querySelector('.restaurant-item__rating');
            rating.textContent = `Rating: ${restaurant.rating}`;

            const title = restaurantElement.querySelector('.restaurant-item__title');
            title.textContent = restaurant.name;

            const description = restaurantElement.querySelector('.restaurant-item__description');
            description.textContent = restaurant.description;

            restaurantList.appendChild(restaurantElement);
        });
    };

    populateRestaurants(restaurantData.restaurants);
};

const setupFeatures = () => {
    const featureList = document.querySelector('.features__grid');
    const template = document.querySelector('#feature-template');

    const populateFeatures = (features) => {
        features.forEach((feature, index) => {
            const featureElement = template.content.cloneNode(true);

            const article = featureElement.querySelector('.feature-card');
            article.setAttribute('tabindex', menuLength + restaurantData.restaurants.length + 1 + index);
            article.setAttribute('aria-label', feature.title);

            const title = featureElement.querySelector('.feature-content__title');
            title.textContent = feature.title;

            const description = featureElement.querySelector('.feature-content__description');
            description.textContent = feature.description;

            featureList.appendChild(featureElement);
        });
    };

    populateFeatures(featureData.features);
};

const setupNavbarMenu = () => {
    const main = document.querySelector('main');
    const hero = document.querySelector('.hero');
    const menu = document.querySelector('#menu');
    const drawer = document.querySelector('#drawer');

    menu.addEventListener('click', function (event) {
        drawer.classList.toggle('open');
        event.stopPropagation();
    });

    main.addEventListener('click', function () {
        drawer.classList.remove('open');
    });

    hero.addEventListener('click', function () {
        drawer.classList.remove('open');
    });
}

const setupNewsletter = () => {
    const form = document.querySelector('.newsletter__form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            // just dummy alert
            alert(`Thank you for subscribing with: ${email}`);
            form.reset();
        });
    }
};

const setupScrollAnimation = () => {
    const cards = document.querySelectorAll('.restaurant-card');
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.1 }
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
};

window.addEventListener('DOMContentLoaded', () => {
    setupNavbarMenu();
    setupRestaurant();
    setupFeatures();
    setupNewsletter();
    setupScrollAnimation();
});


