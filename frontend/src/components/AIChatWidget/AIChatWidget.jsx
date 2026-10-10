import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Paperclip, AlertCircle, ShieldAlert, Bot } from 'lucide-react';
import './AIChatWidget.css';

/**
 * Floating AI Assistant Widget
 * Signature lime floating action button with interactive compact chatbot panel.
 * Strictly presents frontend mock interface without fabricated medical diagnosis.
 */
export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'assistant',
      text: 'Hi! I am AROVEXA’s AI Health Assistant. Ask a general health question or upload a medical report for explanation.',
      time: 'Just now'
    }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const widgetPanelRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageText.trim() && !selectedFile) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: selectedFile ? `${messageText} [Uploaded: ${selectedFile.name}]` : messageText,
      time: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setMessageText('');
    setSelectedFile(null);

    // Polite placeholder response explaining backend connection
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: 'AI responses and automated report explanations will be connected in a later backend/AI integration phase. All medical guidance will remain strictly informational.',
          time: 'Just now'
        }
      ]);
    }, 600);
  };

  const handlePromptClick = (prompt) => {
    setMessageText(prompt);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <div className="arovexa-ai-floating-container">
      {/* Floating Action Button */}
      <button
        type="button"
        className={`ai-floating-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close AI Assistant' : 'Open AI Assistant'}
        title="AROVEXA AI Assistant"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} className="sparkle-icon-pulse" />}
      </button>

      {/* Compact Chatbot Panel */}
      {isOpen && (
        <div 
          className="ai-chat-panel" 
          ref={widgetPanelRef}
          role="dialog"
          aria-label="AI Health Assistant Chat"
        >
          {/* Panel Header */}
          <div className="ai-panel-header">
            <div className="ai-header-brand">
              <div className="ai-avatar-badge">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="ai-panel-title">AROVEXA AI Assistant</h3>
                <span className="ai-panel-status">Informational Assistant</span>
              </div>
            </div>
            <button
              type="button"
              className="ai-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat window"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mandatory Medical Disclaimer */}
          <div className="ai-panel-disclaimer">
            <ShieldAlert size={14} className="disclaimer-alert-icon" />
            <span>AI-generated health information is informational and not a diagnosis.</span>
          </div>

          {/* Suggested Prompts */}
          <div className="ai-suggested-row">
            <button 
              type="button" 
              className="ai-suggest-chip"
              onClick={() => handlePromptClick('What does a blood test measure?')}
            >
              What does a blood test measure?
            </button>
            <button 
              type="button" 
              className="ai-suggest-chip"
              onClick={() => handlePromptClick('How should I prepare for a doctor visit?')}
            >
              How should I prepare for a doctor visit?
            </button>
          </div>

          {/* Chat Messages Body */}
          <div className="ai-messages-body">
            {chatMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`chat-bubble-wrap ${msg.sender === 'user' ? 'user-wrap' : 'assistant-wrap'}`}
              >
                <div className={`chat-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="bubble-time">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Selected File Notice */}
          {selectedFile && (
            <div className="ai-attached-file">
              <Paperclip size={13} />
              <span>Attached: {selectedFile.name}</span>
              <button 
                type="button" 
                className="ai-remove-file" 
                onClick={() => setSelectedFile(null)}
              >
                <X size={12} />
              </button>
            </div>
          )}

          {/* Input & Action Form */}
          <form onSubmit={handleSendMessage} className="ai-panel-footer">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="ai-action-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Attach Medical Report (PDF/JPG/PNG)"
              aria-label="Upload report"
            >
              <Paperclip size={18} />
            </button>

            <input
              type="text"
              className="ai-chat-input"
              placeholder="Type your health question..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              aria-label="Ask a health question"
            />

            <button
              type="submit"
              className="ai-send-btn"
              disabled={!messageText.trim() && !selectedFile}
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
