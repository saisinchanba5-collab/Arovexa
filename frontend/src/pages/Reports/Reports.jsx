import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  FileText, 
  Download, 
  Upload, 
  Eye, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  CheckCircle2, 
  FileCheck, 
  X 
} from 'lucide-react';
import { SAMPLE_REPORTS } from '../../data/mockData';
import './Reports.css';

export default function Reports() {
  const location = useLocation();
  const [reportsList, setReportsList] = useState([
    {
      id: 'REP-8902',
      title: 'Complete Blood Count (CBC) & ESR',
      lab: 'Metropolitan Clinical Pathology Lab',
      date: 'Aug 24, 2026',
      fileType: 'PDF Document (1.2 MB)',
      status: 'Normal Biomarkers',
      badgeClass: 'badge-mint'
    },
    {
      id: 'REP-8874',
      title: 'Comprehensive Lipid & Cholesterol Profile',
      lab: 'Apex Diagnostic Pathology',
      date: 'Aug 10, 2026',
      fileType: 'PDF Document (850 KB)',
      status: 'Reviewed by Doctor',
      badgeClass: 'badge-ice'
    },
    {
      id: 'REP-8810',
      title: 'High-Resolution Chest X-Ray (PA View)',
      lab: 'St. Jude Radiology Center',
      date: 'Jul 15, 2026',
      fileType: 'DICOM / PDF (4.1 MB)',
      status: 'Archived',
      badgeClass: 'badge-demo'
    }
  ]);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const repId = params.get('report') || location.state?.selectedId;
    if (repId) {
      const found = reportsList.find((r) => r.id === repId) || (SAMPLE_REPORTS || []).find((r) => r.id === repId);
      if (found) {
        setNotice(`Viewing Medical Report: "${found.title}" (${found.lab} • ${found.status}).`);
      }
    }
  }, [location.search, location.state, reportsList]);

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadedFile) return;

    const newReport = {
      id: `REP-${Date.now().toString().slice(-4)}`,
      title: uploadedFile.name.replace(/\.[^/.]+$/, ''),
      lab: 'Patient Uploaded Document',
      date: 'Today',
      fileType: `${uploadedFile.name.split('.').pop().toUpperCase()} Document`,
      status: 'Uploaded (Pending Review)',
      badgeClass: 'badge-lime'
    };

    setReportsList([newReport, ...reportsList]);
    setUploadModalOpen(false);
    setUploadedFile(null);
    setNotice(`Document "${newReport.title}" added to your demo records vault.`);
  };

  return (
    <div className="reports-page">
      {/* Header */}
      <div className="page-header-row">
        <div>
          <span className="page-badge-pill">Health Records Vault</span>
          <h1 className="page-title">Medical Reports & Health Records</h1>
          <p className="page-subtitle">
            Secure client-side vault for diagnostic laboratory reports, imaging scans, and doctor summaries (Sample Preview).
          </p>
        </div>
        <div className="reports-header-actions">
          <Link to="/ai-assistant" className="btn btn-secondary">
            <Sparkles size={16} />
            <span>AI Report Explanation</span>
          </Link>
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={() => setUploadModalOpen(true)}
          >
            <Upload size={16} />
            <span>Upload Document</span>
          </button>
        </div>
      </div>

      {notice && (
        <div className="report-notice-banner">
          <CheckCircle2 size={16} />
          <span>{notice}</span>
          <button type="button" onClick={() => setNotice('')} className="banner-close">&times;</button>
        </div>
      )}

      {/* Security Privacy Card */}
      <div className="reports-privacy-card">
        <ShieldCheck size={20} className="privacy-icon" />
        <div className="privacy-text">
          <strong>HIPAA-Ready Client Privacy:</strong> All sample records are securely simulated in frontend memory. Real encrypted patient storage will connect via backend endpoints in Step 8 and Step 9.
        </div>
      </div>

      {/* Reports Grid */}
      <div className="reports-cards-grid">
        {reportsList.map((report) => (
          <div key={report.id} className="report-card-full">
            <div className="report-card-header">
              <div className="report-icon-box">
                <FileText size={22} />
              </div>
              <div className="report-title-meta">
                <h3 className="report-title">{report.title}</h3>
                <span className="report-lab-info">{report.lab} • {report.date}</span>
              </div>
              <span className={`report-status-badge ${report.badgeClass}`}>
                {report.status}
              </span>
            </div>

            <div className="report-meta-row">
              <div className="report-meta-item">
                <Clock size={14} />
                <span>{report.fileType}</span>
              </div>
              <span className="demo-record-tag">Sample Preview</span>
            </div>

            <div className="report-card-actions">
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setNotice(`Viewing preview for ${report.title} (Demo Simulation).`)}
              >
                <Eye size={14} />
                <span>Preview</span>
              </button>
              <button 
                type="button" 
                className="btn btn-secondary btn-sm"
                onClick={() => setNotice(`Downloaded ${report.title} to local device (Demo).`)}
              >
                <Download size={14} />
                <span>Download</span>
              </button>
              <Link 
                to="/ai-assistant" 
                className="btn btn-primary btn-sm ai-explain-link"
                title="Explain with AROVEXA AI"
              >
                <Sparkles size={14} />
                <span>AI Explain</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Document Modal */}
      {uploadModalOpen && (
        <div className="upload-modal-overlay" onClick={() => setUploadModalOpen(false)}>
          <div className="upload-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="upload-modal-header">
              <h3>Upload Medical Record</h3>
              <button 
                type="button" 
                className="modal-close-btn"
                onClick={() => setUploadModalOpen(false)}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="upload-modal-body">
              <p className="upload-intro">
                Supported formats: PDF, JPG, PNG (Max 25MB). Uploaded documents will be stored in your demo session.
              </p>

              <label className="upload-dropzone">
                <Upload size={32} className="dropzone-icon" />
                <span className="dropzone-title">Click to browse or drop document here</span>
                <span className="dropzone-sub">PDF, PNG, JPG accepted</span>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  style={{ display: 'none' }}
                  onChange={(e) => {
                    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
                  }}
                />
              </label>

              {uploadedFile && (
                <div className="selected-upload-file">
                  <FileCheck size={16} />
                  <span>Selected: <strong>{uploadedFile.name}</strong></span>
                </div>
              )}

              <div className="upload-modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setUploadModalOpen(false)}
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={!uploadedFile}
                >
                  Confirm Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
