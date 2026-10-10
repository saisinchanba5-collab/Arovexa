/**
 * Hospital Service
 * Clean contract for hospital directory and search operations.
 * Prepared for future REST API integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const hospitalService = {
  /**
   * Fetch all registered healthcare centers and hospitals
   */
  async getHospitals() {
    // Structured for future endpoint: GET ${API_BASE_URL}/hospitals
    return [];
  },

  /**
   * Fetch detailed information for a specific hospital
   * @param {string} id - Hospital identifier
   */
  async getHospitalById(id) {
    // Structured for future endpoint: GET ${API_BASE_URL}/hospitals/:id
    return null;
  },

  /**
   * Search hospitals by query, location, or department
   * @param {string} query - Search keyword
   */
  async searchHospitals(query) {
    // Structured for future endpoint: GET ${API_BASE_URL}/hospitals/search?q=${query}
    return [];
  }
};
