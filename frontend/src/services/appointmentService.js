/**
 * Appointment Service
 * Clean contract for booking and managing patient appointments.
 * Prepared for future REST API integration.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const appointmentService = {
  /**
   * Fetch appointments for the active user
   */
  async getAppointments() {
    // Structured for future endpoint: GET ${API_BASE_URL}/appointments
    return [];
  },

  /**
   * Book a new clinical appointment
   * @param {Object} appointmentData - { doctorId, hospitalId, date, timeSlot, notes }
   */
  async bookAppointment(appointmentData) {
    // Structured for future endpoint: POST ${API_BASE_URL}/appointments
    console.info('[appointmentService] bookAppointment called with:', appointmentData);
    throw new Error('Appointment service requires active backend connection.');
  },

  /**
   * Cancel an upcoming appointment
   * @param {string} id - Appointment identifier
   */
  async cancelAppointment(id) {
    // Structured for future endpoint: DELETE ${API_BASE_URL}/appointments/:id
    console.info('[appointmentService] cancelAppointment called for ID:', id);
  }
};
