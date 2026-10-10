/**
 * Lab Test Service
 * Clean contract for diagnostics catalog and home/clinic test bookings.
 * Prepared for future REST API integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const labTestService = {
  /**
   * Fetch all available diagnostic tests and health packages
   */
  async getLabTests() {
    // Structured for future endpoint: GET ${API_BASE_URL}/lab-tests
    return [];
  },

  /**
   * Book a diagnostic lab test
   * @param {Object} testData - { testId, sampleCollectionType, preferredDate }
   */
  async bookLabTest(testData) {
    // Structured for future endpoint: POST ${API_BASE_URL}/lab-tests/book
    console.info('[labTestService] bookLabTest called with:', testData);
    throw new Error('Lab test service requires active backend connection.');
  }
};
