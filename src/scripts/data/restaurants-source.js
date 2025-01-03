import API_ENDPOINT from "../globals/api-endpoints";

class RestaurantSource {
    static async getAllRestaurants() {
        try {
            const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
            const responseJson = await response.json();
            return responseJson.restaurants;
        } catch (error) {
            return { error: true, message: error.message };
        }
    }

    static async getDetailRestaurant(id) {
        try {
            const response = await fetch(API_ENDPOINT.RESTAURANT_DETAIL(id));
            const responseJson = await response.json();
            return responseJson.restaurant;
        } catch (error) {
            return { error: true, message: error.message };
        }
    }
}

export default RestaurantSource;