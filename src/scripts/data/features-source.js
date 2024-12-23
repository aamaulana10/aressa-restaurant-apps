class FeaturesSource {

    static async getListFeatures() {
        const features = [
            {
                "id": "1",
                "title": "Quality Dining",
                "description": "Carefully selected restaurants that meet our high standards"
            },
            {
                "id": "2",
                "title": "Verified Reviews",
                "description": "Honest feedback from real diners"
            },
            {
                "id": "3",
                "title": "Local Favorites",
                "description": "Discover the best restaurants in your area"
            }
        ];
        return features;
    }
}

export default FeaturesSource;