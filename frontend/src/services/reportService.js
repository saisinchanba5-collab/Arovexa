/**
 * Medical Report Service
 * Clean contract for uploading and viewing patient medical reports.
 * Prepared for future secure file upload & metadata endpoints.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const reportService = {
  /**
   * Retrieve all reports associated with the current patient
   */
  async getReports() {
    // Structured for future endpoint: GET ${API_BASE_URL}/reports
    return [];
  },

  /**
   * Fetch single report record by ID
   * @param {string} id - Report identifier
   */
  async getReportById(id) {
    // Structured for future endpoint: GET ${API_BASE_URL}/reports/:id
    return null;
  },

  /**
   * Upload a diagnostic report file
   * @param {FormData} reportData - Form data containing file and report metadata
   */
  async uploadReport(reportData) {
    // Structured for future endpoint: POST ${API_BASE_URL}/reports/upload
    console.info('[reportService] uploadReport called');
    throw new Error('Report upload service requires active backend connection.');
  }
};
