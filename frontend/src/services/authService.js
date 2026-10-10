/**
 * Authentication Service
 * Clean contract for future authentication API integration.
 * No fake network calls or hardcoded backend simulations in Step 1.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const authService = {
  /**
   * Log in a user with credentials
   * @param {Object} credentials - { email, password }
   */
  async loginUser(credentials) {
    // Structured for future endpoint: POST ${API_BASE_URL}/auth/login
    console.info('[authService] loginUser called with credentials:', { email: credentials?.email });
    throw new Error('Authentication backend not connected yet. Real login will be enabled in Step 5.');
  },

  /**
   * Register a new user
   * @param {Object} userData - { name, email, password, role }
   */
  async registerUser(userData) {
    // Structured for future endpoint: POST ${API_BASE_URL}/auth/register
    console.info('[authService] registerUser called for:', { email: userData?.email });
    throw new Error('Authentication backend not connected yet. Real registration will be enabled in Step 5.');
  },

  /**
   * Log out the current user session
   */
  async logoutUser() {
    // Structured for future endpoint: POST ${API_BASE_URL}/auth/logout
    console.info('[authService] logoutUser called');
  },

  /**
   * Retrieve currently authenticated user profile
   */
  async getCurrentUser() {
    // Structured for future endpoint: GET ${API_BASE_URL}/auth/me
    return null;
  }
};
