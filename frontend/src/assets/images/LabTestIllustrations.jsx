import React from 'react';

/**
 * 5 Distinct, Bright, Soft, Professional Healthcare SVG Illustrations for Lab Tests
 * Palette: Approved Arovexa system (#142B3A navy, #D9FF4F lime, #EAF4FB ice blue, #EAF7D5 mint, #FFF2EE coral)
 * 1. Blood Test (CMP-14)
 * 2. Complete Blood Count (CBC)
 * 3. Lipid & Cardiovascular Profile
 * 4. Thyroid Profile
 * 5. Diabetes & Fasting Glucose
 */

export function BloodTestIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="lab-illustration-svg">
      <defs>
        <linearGradient id="bg-grad-1" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F7F8" />
          <stop offset="1" stopColor="#EAF4FB" />
        </linearGradient>
        <linearGradient id="tube-liquid" x1="0" y1="0" x2="0" y2="100">
          <stop stopColor="#FF7A70" />
          <stop offset="1" stopColor="#D9534F" />
        </linearGradient>
        <linearGradient id="serum-liquid" x1="0" y1="0" x2="0" y2="40">
          <stop stopColor="#F4F7C5" />
          <stop offset="1" stopColor="#E5EBA2" />
        </linearGradient>
      </defs>
      {/* Soft Background */}
      <rect width="400" height="240" rx="16" fill="url(#bg-grad-1)" />
      
      {/* Decorative clean circles */}
      <circle cx="80" cy="60" r="45" fill="#EAF7D5" opacity="0.7" />
      <circle cx="330" cy="180" r="50" fill="#D9FF4F" opacity="0.3" />
      
      {/* Laboratory Rack & Tube */}
      <g transform="translate(140, 25)">
        {/* Test Tube 1 (Serum & Blood Separation) */}
        <rect x="35" y="25" width="46" height="135" rx="23" fill="#FFFFFF" stroke="#142B3A" strokeWidth="3" />
        {/* Serum Layer (Top) */}
        <path d="M37 80 H79 V137 C79 148 70 157 58 157 C46 157 37 148 37 137 Z" fill="url(#tube-liquid)" />
        <rect x="37" y="55" width="42" height="25" fill="url(#serum-liquid)" />
        <line x1="45" y1="65" x2="55" y2="65" stroke="#142B3A" strokeWidth="2" opacity="0.4" />
        <line x1="45" y1="85" x2="60" y2="85" stroke="#142B3A" strokeWidth="2" opacity="0.4" />
        <line x1="45" y1="105" x2="55" y2="105" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
        {/* Cap */}
        <rect x="30" y="15" width="56" height="16" rx="4" fill="#142B3A" />
        <rect x="34" y="27" width="48" height="4" fill="#D9FF4F" />
        {/* Glass Glare */}
        <path d="M43 35 L43 140" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        
        {/* Test Tube 2 (Tilted in background) */}
        <g transform="rotate(18, 110, 60)" opacity="0.85">
          <rect x="80" y="30" width="34" height="110" rx="17" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2.5" />
          <path d="M82 85 H112 V123 C112 131 106 138 97 138 C88 138 82 131 82 123 Z" fill="#75B798" />
          <rect x="76" y="22" width="42" height="12" rx="3" fill="#142B3A" />
          <path d="M86 40 L86 115" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </g>
        
        {/* Clean Pipette Dropper */}
        <g transform="translate(-40, 15)">
          <path d="M30 15 L35 75 L38 95 L40 95 L43 75 L48 15 Z" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2.5" />
          <rect x="26" y="5" width="26" height="14" rx="7" fill="#D9FF4F" stroke="#142B3A" strokeWidth="2" />
          {/* Droplet */}
          <path d="M39 110 C36 114 34 117 34 120 C34 123 36.5 125 39 125 C41.5 125 44 123 44 120 C44 117 42 114 39 110 Z" fill="#D9534F" />
        </g>
      </g>
      
      {/* Badge Pill */}
      <rect x="25" y="190" width="130" height="28" rx="14" fill="#FFFFFF" stroke="rgba(20, 43, 58, 0.1)" />
      <circle cx="40" cy="204" r="5" fill="#D9534F" />
      <text x="52" y="208" fill="#142B3A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">14 Biomarkers</text>
    </svg>
  );
}

export function CompleteBloodCountIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="lab-illustration-svg">
      <defs>
        <linearGradient id="bg-grad-2" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F7F8" />
          <stop offset="1" stopColor="#EAF7D5" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="16" fill="url(#bg-grad-2)" />
      
      {/* Background soft circular glow */}
      <circle cx="270" cy="110" r="65" fill="#EAF4FB" />
      
      {/* Clean Modern Microscope */}
      <g transform="translate(70, 30)">
        {/* Base */}
        <rect x="40" y="160" width="100" height="14" rx="7" fill="#142B3A" />
        <path d="M80 160 L80 135" stroke="#142B3A" strokeWidth="8" strokeLinecap="round" />
        {/* Arm / Neck */}
        <path d="M80 135 C80 90 120 70 120 45" stroke="#142B3A" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* Stage */}
        <rect x="85" y="115" width="60" height="8" rx="3" fill="#142B3A" />
        <rect x="100" y="111" width="30" height="4" rx="1" fill="#D9FF4F" />
        {/* Eyepiece Tube */}
        <g transform="rotate(-25, 120, 45)">
          <rect x="110" y="10" width="22" height="55" rx="4" fill="#FFFFFF" stroke="#142B3A" strokeWidth="3" />
          <rect x="106" y="2" width="30" height="10" rx="3" fill="#142B3A" />
          <rect x="115" y="65" width="12" height="20" rx="2" fill="#D9FF4F" stroke="#142B3A" strokeWidth="2" />
        </g>
        {/* Focus Knob */}
        <circle cx="95" cy="115" r="10" fill="#D9FF4F" stroke="#142B3A" strokeWidth="3" />
      </g>
      
      {/* Blood Cells (RBC, WBC, Platelets) Infographic Representation */}
      <g transform="translate(235, 45)">
        {/* Petri / Analysis Lens Circle */}
        <circle cx="65" cy="65" r="60" fill="#FFFFFF" stroke="#142B3A" strokeWidth="3" />
        
        {/* Red Blood Cells (Biconcave disc styled) */}
        <g transform="translate(35, 30)">
          <ellipse cx="20" cy="18" rx="16" ry="12" fill="#E98282" stroke="#142B3A" strokeWidth="2" />
          <ellipse cx="20" cy="18" rx="8" ry="6" fill="#D9534F" opacity="0.6" />
        </g>
        <g transform="translate(70, 65)">
          <ellipse cx="18" cy="16" rx="15" ry="11" fill="#E98282" stroke="#142B3A" strokeWidth="2" />
          <ellipse cx="18" cy="16" rx="7" ry="5" fill="#D9534F" opacity="0.6" />
        </g>
        
        {/* White Blood Cell (Lymphocyte with soft granules) */}
        <g transform="translate(68, 25)">
          <circle cx="18" cy="18" r="15" fill="#EAF4FB" stroke="#142B3A" strokeWidth="2" />
          <circle cx="15" cy="17" r="8" fill="#142B3A" opacity="0.3" />
        </g>
        
        {/* Platelets */}
        <polygon points="35,80 40,86 34,90 28,84" fill="#D9FF4F" stroke="#142B3A" strokeWidth="1.5" />
        <polygon points="50,95 55,100 48,103 44,97" fill="#D9FF4F" stroke="#142B3A" strokeWidth="1.5" />
      </g>
      
      {/* Badge Pill */}
      <rect x="25" y="190" width="145" height="28" rx="14" fill="#FFFFFF" stroke="rgba(20, 43, 58, 0.1)" />
      <circle cx="40" cy="204" r="5" fill="#75B798" />
      <text x="52" y="208" fill="#142B3A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Cellular Differential</text>
    </svg>
  );
}

export function LipidProfileIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="lab-illustration-svg">
      <defs>
        <linearGradient id="bg-grad-3" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F7F8" />
          <stop offset="1" stopColor="#EAF4FB" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="16" fill="url(#bg-grad-3)" />
      
      {/* Background cardiac pulse wave */}
      <path d="M30 120 L110 120 L125 90 L140 150 L155 80 L170 140 L185 120 L370 120" stroke="#D9FF4F" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
      
      {/* Central Cardiac Shield with HDL / LDL Indicators */}
      <g transform="translate(125, 30)">
        {/* Outer Shield */}
        <path d="M75 15 C115 15 145 35 145 80 C145 125 80 165 75 168 C70 165 5 125 5 80 C5 35 35 15 75 15 Z" fill="#FFFFFF" stroke="#142B3A" strokeWidth="3.5" />
        
        {/* Anatomical stylized heart center */}
        <path d="M75 45 C88 30 110 32 118 48 C128 66 114 92 75 120 C36 92 22 66 32 48 C40 32 62 30 75 45 Z" fill="#FFF2EE" stroke="#142B3A" strokeWidth="2.5" />
        
        {/* HDL / LDL Molecule representations */}
        <g transform="translate(48, 62)">
          <circle cx="12" cy="12" r="10" fill="#75B798" stroke="#142B3A" strokeWidth="2" />
          <text x="8" y="16" fill="#FFFFFF" fontSize="10" fontWeight="800">H</text>
        </g>
        <g transform="translate(76, 72)">
          <circle cx="12" cy="12" r="11" fill="#F4F7C5" stroke="#142B3A" strokeWidth="2" />
          <text x="8" y="16" fill="#142B3A" fontSize="10" fontWeight="800">L</text>
        </g>
      </g>
      
      {/* Metric Callouts */}
      <g transform="translate(30, 45)">
        <rect x="0" y="0" width="76" height="32" rx="8" fill="#FFFFFF" stroke="#142B3A" strokeWidth="1.5" />
        <text x="12" y="15" fill="#647D8C" fontSize="9" fontWeight="700">HDL RATIO</text>
        <text x="12" y="27" fill="#276732" fontSize="11" fontWeight="800">Optimal</text>
      </g>
      
      <g transform="translate(295, 45)">
        <rect x="0" y="0" width="76" height="32" rx="8" fill="#FFFFFF" stroke="#142B3A" strokeWidth="1.5" />
        <text x="12" y="15" fill="#647D8C" fontSize="9" fontWeight="700">TRIGLYCERIDE</text>
        <text x="12" y="27" fill="#142B3A" fontSize="11" fontWeight="800">110 mg/dL</text>
      </g>
      
      {/* Badge Pill */}
      <rect x="25" y="190" width="135" height="28" rx="14" fill="#FFFFFF" stroke="rgba(20, 43, 58, 0.1)" />
      <circle cx="40" cy="204" r="5" fill="#142B3A" />
      <text x="52" y="208" fill="#142B3A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Cardio Risk Score</text>
    </svg>
  );
}

export function ThyroidProfileIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="lab-illustration-svg">
      <defs>
        <linearGradient id="bg-grad-4" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F7F8" />
          <stop offset="1" stopColor="#EAF7D5" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="16" fill="url(#bg-grad-4)" />
      
      {/* Background delicate endocrine orbit rings */}
      <circle cx="200" cy="115" r="85" stroke="#142B3A" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.2" />
      <circle cx="200" cy="115" r="55" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2" opacity="0.9" />
      
      {/* Stylized Butterfly-shaped Thyroid Gland Anatomy */}
      <g transform="translate(150, 65)">
        {/* Left Lobe */}
        <path d="M45 45 C30 20 5 30 10 60 C15 90 35 95 48 65 Z" fill="#EAF4FB" stroke="#142B3A" strokeWidth="3" />
        {/* Right Lobe */}
        <path d="M55 45 C70 20 95 30 90 60 C85 90 65 95 52 65 Z" fill="#EAF4FB" stroke="#142B3A" strokeWidth="3" />
        {/* Isthmus (Bridge) */}
        <path d="M42 55 Q50 68 58 55" stroke="#142B3A" strokeWidth="4" strokeLinecap="round" fill="none" />
        {/* Active Hormone Particle Nodes */}
        <circle cx="25" cy="55" r="5" fill="#D9FF4F" stroke="#142B3A" strokeWidth="1.5" />
        <circle cx="75" cy="55" r="5" fill="#D9FF4F" stroke="#142B3A" strokeWidth="1.5" />
      </g>
      
      {/* Hormone markers callouts: T3, T4, TSH */}
      <g transform="translate(70, 85)">
        <rect x="0" y="0" width="55" height="28" rx="14" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2" />
        <text x="18" y="19" fill="#142B3A" fontSize="12" fontWeight="800">T3</text>
      </g>
      <g transform="translate(275, 85)">
        <rect x="0" y="0" width="55" height="28" rx="14" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2" />
        <text x="18" y="19" fill="#142B3A" fontSize="12" fontWeight="800">T4</text>
      </g>
      <g transform="translate(172, 168)">
        <rect x="0" y="0" width="56" height="28" rx="14" fill="#D9FF4F" stroke="#142B3A" strokeWidth="2" />
        <text x="13" y="19" fill="#142B3A" fontSize="12" fontWeight="800">TSH</text>
      </g>
      
      {/* Badge Pill */}
      <rect x="25" y="190" width="130" height="28" rx="14" fill="#FFFFFF" stroke="rgba(20, 43, 58, 0.1)" />
      <circle cx="40" cy="204" r="5" fill="#276732" />
      <text x="52" y="208" fill="#142B3A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Endocrine Health</text>
    </svg>
  );
}

export function DiabetesGlucoseIllustration() {
  return (
    <svg viewBox="0 0 400 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="lab-illustration-svg">
      <defs>
        <linearGradient id="bg-grad-5" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4F7F8" />
          <stop offset="1" stopColor="#EAF4FB" />
        </linearGradient>
      </defs>
      <rect width="400" height="240" rx="16" fill="url(#bg-grad-5)" />
      
      {/* Background graph grid lines */}
      <g opacity="0.3" stroke="#142B3A" strokeWidth="1">
        <line x1="60" y1="60" x2="340" y2="60" strokeDasharray="4 4" />
        <line x1="60" y1="100" x2="340" y2="100" strokeDasharray="4 4" />
        <line x1="60" y1="140" x2="340" y2="140" strokeDasharray="4 4" />
      </g>
      
      {/* Modern Digital Glucometer Device */}
      <g transform="translate(145, 25)">
        {/* Device Body */}
        <rect x="20" y="20" width="70" height="115" rx="20" fill="#FFFFFF" stroke="#142B3A" strokeWidth="3" />
        {/* Screen */}
        <rect x="30" y="35" width="50" height="42" rx="8" fill="#142B3A" />
        <text x="37" y="62" fill="#D9FF4F" fontSize="19" fontWeight="800" fontFamily="monospace">94</text>
        <text x="40" y="72" fill="#FFFFFF" fontSize="8" fontWeight="600">mg/dL</text>
        {/* Navigation button */}
        <circle cx="55" cy="102" r="10" fill="#EAF7D5" stroke="#142B3A" strokeWidth="2" />
        {/* Strip Port & Strip */}
        <rect x="47" y="132" width="16" height="35" rx="3" fill="#D9FF4F" stroke="#142B3A" strokeWidth="2" />
        <line x1="55" y1="135" x2="55" y2="150" stroke="#142B3A" strokeWidth="2" />
        {/* Blood Sample Droplet on Strip */}
        <circle cx="55" cy="162" r="6" fill="#D9534F" stroke="#142B3A" strokeWidth="1.5" />
      </g>
      
      {/* Lancet / Pen Device on Left */}
      <g transform="translate(80, 50)">
        <rect x="0" y="0" width="16" height="95" rx="8" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2.5" />
        <rect x="0" y="70" width="16" height="20" fill="#142B3A" />
        <circle cx="8" cy="12" r="4" fill="#D9FF4F" />
      </g>
      
      {/* HbA1c 3-Month Trend Gauge */}
      <g transform="translate(260, 50)">
        <rect x="0" y="0" width="85" height="95" rx="14" fill="#FFFFFF" stroke="#142B3A" strokeWidth="2" />
        <text x="12" y="22" fill="#647D8C" fontSize="9" fontWeight="700">HbA1c TREND</text>
        <text x="14" y="52" fill="#276732" fontSize="22" fontWeight="800">5.4%</text>
        <rect x="12" y="65" width="60" height="8" rx="4" fill="#EAF7D5" />
        <rect x="12" y="65" width="38" height="8" rx="4" fill="#75B798" />
        <text x="12" y="86" fill="#142B3A" fontSize="8" fontWeight="600">Normal Glycemic</text>
      </g>
      
      {/* Badge Pill */}
      <rect x="25" y="190" width="135" height="28" rx="14" fill="#FFFFFF" stroke="rgba(20, 43, 58, 0.1)" />
      <circle cx="40" cy="204" r="5" fill="#D9FF4F" stroke="#142B3A" strokeWidth="1.5" />
      <text x="52" y="208" fill="#142B3A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">Fasting Plasma Glucose</text>
    </svg>
  );
}
