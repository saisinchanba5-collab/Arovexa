/**
 * Doctor Service
 * Clean contract for doctor directory and specialist scheduling.
 * Prepared for future REST API integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const doctorService = {
  /**
   * Fetch all doctors across specialties
   */
  async getDoctors() {
    // Structured for future endpoint: GET ${API_BASE_URL}/doctors
    return [];
  },

  /**
   * Fetch detailed doctor profile by ID
   * @param {string} id - Doctor identifier
   */
  async getDoctorById(id) {
    // Structured for future endpoint: GET ${API_BASE_URL}/doctors/:id
    return null;
  },

  /**
   * Fetch doctors filtered by medical specialty
   * @param {string} specialty - Specialty name (e.g. Cardiology, Pediatrics)
   */
  async getDoctorsBySpecialty(specialty) {
    // Structured for future endpoint: GET ${API_BASE_URL}/doctors?specialty=${specialty}
    return [];
  }
};
