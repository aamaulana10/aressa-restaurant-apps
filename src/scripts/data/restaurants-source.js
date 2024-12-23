import API_ENDPOINT from "../globals/api-endpoints";

class RestaurantSource {
    static async getList() {
        const response = await fetch(API_ENDPOINT.RESTAURANT_LIST);
        const responseJson = await response.json();
        return responseJson.restaurants;
    }

    static async getDetailRestaurant(id) {
        const response = await fetch(API_ENDPOINT.DETAIL(id));
        return response.json();
    }
}

export default RestaurantSource;