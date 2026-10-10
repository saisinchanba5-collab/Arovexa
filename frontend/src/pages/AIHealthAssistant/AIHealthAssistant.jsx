import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  FileText, 
  Send, 
  Upload, 
  HelpCircle, 
  ShieldAlert, 
  ArrowRight, 
  FileCheck,
  Bot,
  AlertCircle,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import './AIHealthAssistant.css';

export default function AIHealthAssistant() {
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' | 'analysis'
  const [chatInput, setChatInput] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: "Hi! I'm AROVEXA's AI Health Assistant. Ask a general health-information question or upload a report.",
      time: 'Ready'
    }
  ]);

  const [analysisFile, setAnalysisFile] = useState(null);
  const [analysisSubmitted, setAnalysisSubmitted] = useState(false);
  const fileInputRef = useRef(null);

  const suggestedPrompts = [
    'What is a health checkup?',
    'What does a blood test measure?',
    'How should I prepare for a doctor visit?'
  ];

  const handleSelectPrompt = (prompt) => {
    setChatInput(prompt);
  };

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userEntry = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
      time: 'Just now'
    };

    setChatLog((prev) => [...prev, userEntry]);
    setChatInput('');

    // Safe placeholder without fabricated medical diagnosis
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: 'AI responses and real model integration will be connected in a later backend/AI integration phase. In this Step 2 prototype, no clinical answers or diagnoses are fabricated.',
          time: 'Just now'
        }
      ]);
    }, 500);
  };

  const handleAnalysisUpload = (e) => {
    e.preventDefault();
    if (!analysisFile) return;
    setAnalysisSubmitted(true);
  };

  return (
    <div className="ai-assistant-page">
      {/* Header */}
      <div className="ai-page-header">
        <div className="ai-header-badge">
          <Sparkles size={16} />
          <span>Health Intelligence (UI Preview)</span>
        </div>
        <h1 className="page-title">AI Health Assistant</h1>
        <p className="page-subtitle">
          Intended to provide general health information and structured medical report explanations in future releases.
        </p>
      </div>

      {/* Prominent Clinical Disclaimer */}
      <div className="ai-disclaimer-card" role="alert">
        <ShieldAlert size={22} className="disclaimer-icon" />
        <div className="disclaimer-body">
          <strong>Important Clinical & Regulatory Notice:</strong>
          <p>
            AROVEXA AI is strictly an informational tool. It is NOT intended to diagnose diseases, replace licensed physicians, prescribe medications, or provide emergency clinical care. Always consult qualified doctors for medical symptoms.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="ai-mode-tabs">
        <button
          type="button"
          className={`ai-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <Bot size={18} />
          <span>General Health Conversation</span>
        </button>
        <button
          type="button"
          className={`ai-tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
          onClick={() => setActiveTab('analysis')}
        >
          <FileText size={18} />
          <span>Report Analysis</span>
        </button>
      </div>

      {/* Mode 1: General Conversation */}
      {activeTab === 'chat' && (
        <div className="ai-chat-layout">
          <div className="chat-messages-container">
            {chatLog.map((msg) => (
              <div 
                key={msg.id} 
                className={`ai-chat-bubble-row ${msg.sender === 'user' ? 'user' : 'assistant'}`}
              >
                {msg.sender === 'assistant' && (
                  <div className="assistant-avatar">
                    <Sparkles size={18} />
                  </div>
                )}
                <div className={`ai-message-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="ai-bubble-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Suggested Prompts (Item 24 Requirement) */}
          <div className="ai-prompts-section">
            <span className="prompts-label">
              <HelpCircle size={15} /> Suggested Health Topics (UI Examples):
            </span>
            <div className="prompts-chips-list">
              {suggestedPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className="prompt-chip-btn"
                  onClick={() => handleSelectPrompt(prompt)}
                >
                  <span>{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendChat} className="ai-chat-input-bar">
            <input
              type="text"
              className="chat-text-field"
              placeholder="Ask a general health-information question..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button
              type="submit"
              className="btn btn-primary chat-submit-btn"
              disabled={!chatInput.trim()}
            >
              <span>Send</span>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      {/* Mode 2: Report Analysis (Item 26 Requirement) */}
      {activeTab === 'analysis' && (
        <div className="ai-report-analysis-layout">
          <div className="analysis-card">
            <div className="analysis-header">
              <FileText size={28} className="analysis-icon" />
              <div>
                <h3 className="analysis-title">Report Analysis</h3>
                <p className="analysis-subtitle">
                  Upload your medical report for AI-assisted explanation.
                </p>
              </div>
            </div>

            <div className="analysis-notice-box">
              <AlertCircle size={18} className="notice-icon" />
              <p>
                <strong>Step 2 Prototype Boundary:</strong> Document upload UI allows testing PDF, JPG, and PNG uploads. Real automated AI analysis and clinical summaries will be connected in a later phase without fabricating diagnoses.
              </p>
            </div>

            {analysisSubmitted ? (
              <div className="analysis-submitted-state">
                <CheckCircle2 size={44} className="submitted-check" />
                <h4>Medical Report Received (Demo Mode)</h4>
                <p>
                  Document "<strong>{analysisFile?.name}</strong>" has been queued. In future phases, you will receive an educational breakdown of biomarker ranges.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setAnalysisSubmitted(false);
                    setAnalysisFile(null);
                  }}
                >
                  Upload Another Document
                </button>
              </div>
            ) : (
              <form onSubmit={handleAnalysisUpload} className="analysis-upload-form">
                <label className="analysis-dropzone">
                  <Upload size={36} className="dropzone-upload-icon" />
                  <span className="dropzone-main-text">Upload PDF, JPG, or PNG</span>
                  <span className="dropzone-sub-text">Laboratory panels, blood test reports, and imaging scans (Max 25MB)</span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.jpg,.jpeg,.png"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                      if (e.target.files?.[0]) setAnalysisFile(e.target.files[0]);
                    }}
                  />
                </label>

                {analysisFile && (
                  <div className="analysis-selected-preview">
                    <FileCheck size={18} />
                    <span>Selected Document: <strong>{analysisFile.name}</strong></span>
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary analysis-submit-btn"
                  disabled={!analysisFile}
                >
                  <Sparkles size={16} />
                  <span>Explain Report with AI</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
