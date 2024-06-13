// restodb-source.js
import API_ENDPOINT from '../globals/api-endpoint';

class RestoDbSource {
  static async restaurantList() {
    try {
      const response = await fetch(API_ENDPOINT.RESTAURANTS);
      const responseJSON = await response.json();
      return responseJSON.restaurants;
    } catch (error) {
      console.error('Failed to fetch list of restaurants:', error);
      throw error;
    }
  }

  static async restaurantDetail(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    return response.json();
  }

  static async postReview(data) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(API_ENDPOINT.POST_REVIEW, options);
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.error('Failed to post review:', error);
      throw error;
    }
  }
}

export default RestoDbSource;
