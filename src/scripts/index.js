import '../styles/main.css';
import '../styles/responsive.css';
import DATA from '../public/data/DATA.json';

const main = () => {
    const restaurantList = document.querySelector('.restaurant-list');
    const template = document.querySelector('#restaurant-template');

    const populateRestaurants = (restaurants) => {
        restaurants.forEach((restaurant) => {
            const restaurantElement = template.content.cloneNode(true);

            const thumbnail = restaurantElement.querySelector('.restaurant-item__thumbnail');
            thumbnail.src = restaurant.pictureId;
            thumbnail.alt = restaurant.name;

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

    populateRestaurants(DATA.restaurants);
};

main();


