import React from 'react';

/**
 * Custom Vector Illustration for Auth Pages (Login / Register side panel)
 */
export default function AuthIllustration({ className = '' }) {
  return (
    <div className={`auth-illustration-panel ${className}`} style={{
      background: 'linear-gradient(145deg, #083A4F 0%, #052634 100%)',
      color: '#FFFFFF',
      padding: '3.5rem 2.5rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative ambient rings */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        border: '1px solid rgba(64, 126, 140, 0.25)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        top: '-40px',
        right: '-40px',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        border: '1px solid rgba(165, 141, 102, 0.25)',
        pointerEvents: 'none'
      }} />

      {/* Top Brand Area */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.35rem 0.85rem',
          borderRadius: '9999px',
          backgroundColor: 'rgba(64, 126, 140, 0.2)',
          border: '1px solid rgba(64, 126, 140, 0.4)',
          marginBottom: '2rem'
        }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#407E8C' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#EAF3F5' }}>Coordinated Health Network</span>
        </div>

        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          marginBottom: '1rem',
          color: '#FFFFFF'
        }}>
          Healthcare made <span style={{ color: '#407E8C' }}>simpler</span> for you.
        </h2>

        <p style={{
          fontSize: '0.95rem',
          color: '#B5C4CB',
          lineHeight: 1.6,
          maxWidth: '380px'
        }}>
          Connect with premier hospitals, board-certified specialists, diagnostic testing, and intelligent report explanations in one secure portal.
        </p>
      </div>

      {/* Center Value Highlights */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        margin: '2.5rem 0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(64, 126, 140, 0.25)',
            color: '#407E8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>✓</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#FFFFFF' }}>Accredited Healthcare Centers</div>
            <div style={{ fontSize: '0.8rem', color: '#8EACB7' }}>Verified doctors, clinics, and trauma centers</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(64, 126, 140, 0.25)',
            color: '#407E8C',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>✓</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#FFFFFF' }}>Diagnostic Pathology at Home</div>
            <div style={{ fontSize: '0.8rem', color: '#8EACB7' }}>Seamless home collection & digital results</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            backgroundColor: 'rgba(165, 141, 102, 0.25)',
            color: '#A58D66',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
          }}>★</div>
          <div>
            <div style={{ fontWeight: 600, fontSize: '0.92rem', color: '#FFFFFF' }}>AI Health & Report Intelligence</div>
            <div style={{ fontSize: '0.8rem', color: '#8EACB7' }}>Understand lab terminology & clinical summaries</div>
          </div>
        </div>
      </div>

      {/* Bottom Clinical Trust Badge */}
      <div style={{
        padding: '1rem 1.25rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.82rem',
        color: '#8EACB7',
        lineHeight: 1.5
      }}>
        <strong style={{ color: '#A58D66' }}>HIPAA-Aware Security:</strong> Designed with encryption and role-based data isolation for patient confidentiality.
      </div>
    </div>
  );
}
