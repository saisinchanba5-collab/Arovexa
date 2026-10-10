/**
 * AI Healthcare & Report Analysis Service
 * Clean contract for future AI capabilities.
 * 
 * IMPORTANT:
 * Real AI processing will route through the AROVEXA backend in future phases.
 * No third-party AI keys or direct client-side model queries are placed here.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const aiService = {
  /**
   * Submit an informational health inquiry to the AI Health Assistant
   * @param {string} query - Patient question or medical inquiry
   * @returns {Promise<Object>} Response object containing guidance and disclaimers
   */
  async askHealthQuestion(query) {
    // Structured for future endpoint: POST ${API_BASE_URL}/ai/assistant/chat
    console.info('[aiService] askHealthQuestion called with:', query);
    throw new Error('AI Health Assistant requires active backend connection.');
  },

  /**
   * Submit a diagnostic report file for automated AI clinical summarization
   * @param {File|FormData} fileData - Uploaded medical document or lab scan
   * @returns {Promise<Object>} Extracted medical terms, findings, and summaries
   */
  async analyzeReport(fileData) {
    // Structured for future endpoint: POST ${API_BASE_URL}/ai/reports/analyze
    console.info('[aiService] analyzeReport called');
    throw new Error('AI Report Analysis requires active backend connection.');
  },

  /**
   * Ask follow-up questions referencing a previously analyzed medical report
   * @param {string} reportId - ID of the analyzed report
   * @param {string} question - Specific clarification or terminology question
   * @returns {Promise<Object>} Contextual answer linked to report parameters
   */
  async askReportFollowUp(reportId, question) {
    // Structured for future endpoint: POST ${API_BASE_URL}/ai/reports/${reportId}/follow-up
    console.info('[aiService] askReportFollowUp called for report:', reportId);
    throw new Error('AI Report follow-up requires active backend connection.');
  }
};
