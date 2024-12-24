import RestaurantSource from "../../data/restaurants-source";
import UrlParser from "../../routes/url-parser";
import LikeButtonInitiator from "../../utils/like-button-initiator";

const Detail = {
    async render() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        return `
            <div>
                <h1>Detail ${url.id}</h1>
                <div id="likeButtonContainer"></div>
            </div>
        `;
    },

    async afterRender() {
        const url = UrlParser.parseActiveUrlWithoutCombiner();
        const restaurant = await RestaurantSource.getDetailRestaurant(url.id);
        console.log('detail ', restaurant);
        LikeButtonInitiator.init({
            likeButtonContainer: document.querySelector('#likeButtonContainer'),
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                description: restaurant.description,
                pictureId: restaurant.pictureId,
                city: restaurant.city,
                rating: restaurant.rating
            },
        });
    }
}

export default Detail;