import React from 'react';

/**
 * Custom Vector Illustration for Landing Page Hero
 * Designed specifically with Arovexa brand colors.
 */
export default function HeroIllustration({ className = '' }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 600 480" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="AROVEXA Unified Healthcare Platform Illustration"
    >
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="600" y2="480" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F7F8F7" />
          <stop offset="1" stopColor="#EAF3F5" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="380" y2="280" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#F9FBFC" />
        </linearGradient>
        <filter id="cardShadow" x="80" y="50" width="440" height="340" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="16" stdDeviation="20" floodColor="#083A4F" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Background Soft Bubble */}
      <rect width="600" height="480" rx="24" fill="url(#bgGrad)" />

      {/* Decorative Network Grid Dots */}
      <g opacity="0.25" fill="#407E8C">
        <circle cx="50" cy="60" r="3" />
        <circle cx="90" cy="60" r="3" />
        <circle cx="130" cy="60" r="3" />
        <circle cx="50" cy="100" r="3" />
        <circle cx="90" cy="100" r="3" />
        <circle cx="130" cy="100" r="3" />
        <circle cx="470" cy="380" r="3" />
        <circle cx="510" cy="380" r="3" />
        <circle cx="550" cy="380" r="3" />
        <circle cx="470" cy="420" r="3" />
        <circle cx="510" cy="420" r="3" />
        <circle cx="550" cy="420" r="3" />
      </g>

      {/* Main Patient Portal Interface Card */}
      <g filter="url(#cardShadow)">
        <rect x="110" y="70" width="380" height="280" rx="16" fill="url(#cardGrad)" stroke="rgba(8, 58, 79, 0.08)" strokeWidth="1.5" />
        
        {/* Card Header Bar */}
        <rect x="110" y="70" width="380" height="54" rx="16" fill="#083A4F" />
        <rect x="110" y="108" width="380" height="16" fill="#083A4F" /> {/* square bottom corners */}

        {/* Brand Dot & Text in Header */}
        <circle cx="138" cy="97" r="10" fill="#407E8C" />
        <path d="M138 92v10M133 97h10" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <rect x="156" y="91" width="80" height="12" rx="4" fill="#FFFFFF" opacity="0.9" />
        <rect x="420" y="90" width="50" height="14" rx="7" fill="#A58D66" opacity="0.85" />

        {/* ECG Heart Rhythm Curve */}
        <path 
          d="M140 180h40l10 -25 15 50 15 -35 10 10h50" 
          stroke="#407E8C" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />

        {/* Metric 1: Heart Rate */}
        <rect x="140" y="210" width="130" height="70" rx="10" fill="#F7F8F7" stroke="rgba(8, 58, 79, 0.06)" />
        <text x="155" y="235" fill="#5C717B" fontSize="12" fontWeight="600" fontFamily="sans-serif">PULSE RATE</text>
        <text x="155" y="265" fill="#083A4F" fontSize="20" fontWeight="700" fontFamily="sans-serif">72 <tspan fontSize="12" fill="#407E8C">BPM</tspan></text>

        {/* Metric 2: Blood Pressure */}
        <rect x="290" y="210" width="160" height="70" rx="10" fill="#F7F8F7" stroke="rgba(8, 58, 79, 0.06)" />
        <text x="305" y="235" fill="#5C717B" fontSize="12" fontWeight="600" fontFamily="sans-serif">BLOOD PRESSURE</text>
        <text x="305" y="265" fill="#083A4F" fontSize="20" fontWeight="700" fontFamily="sans-serif">120/80 <tspan fontSize="12" fill="#407E8C">mmHg</tspan></text>

        {/* Bottom Status Ribbon */}
        <rect x="140" y="300" width="310" height="30" rx="6" fill="#EAF6F0" />
        <circle cx="160" cy="315" r="5" fill="#2E7D5E" />
        <text x="175" y="320" fill="#2E7D5E" fontSize="11" fontWeight="600" fontFamily="sans-serif">Clinical Vitals Synchronized • Secure Portal</text>
      </g>

      {/* Floating Badge 1: Telehealth / Doctor Badge (Top Right) */}
      <g transform="translate(360, 40)">
        <rect width="180" height="64" rx="12" fill="#FFFFFF" stroke="rgba(8, 58, 79, 0.1)" strokeWidth="1" filter="url(#cardShadow)" />
        <circle cx="32" cy="32" r="18" fill="#407E8C" />
        <path d="M26 32h12M32 26v12" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        <text x="60" y="28" fill="#083A4F" fontSize="12" fontWeight="700" fontFamily="sans-serif">Dr. Sarah Bennett</text>
        <text x="60" y="46" fill="#5C717B" fontSize="10" fontWeight="500" fontFamily="sans-serif">Cardiology • Verified</text>
      </g>

      {/* Floating Badge 2: AI Health Assistant (Bottom Left) */}
      <g transform="translate(40, 310)">
        <rect width="200" height="76" rx="12" fill="#FFFFFF" stroke="rgba(165, 141, 102, 0.35)" strokeWidth="1.5" filter="url(#cardShadow)" />
        <circle cx="36" cy="38" r="18" fill="#083A4F" />
        <path d="M36 28l2.5 7.5L46 38l-7.5 2.5L36 48l-2.5-7.5L26 38l7.5-2.5z" fill="#A58D66" />
        <text x="66" y="33" fill="#083A4F" fontSize="12" fontWeight="700" fontFamily="sans-serif">AI Health Assistant</text>
        <text x="66" y="50" fill="#5C717B" fontSize="10" fontWeight="500" fontFamily="sans-serif">Report Analysis Ready</text>
        <rect x="66" y="56" width="60" height="12" rx="3" fill="#FFF9EE" />
        <text x="70" y="65" fill="#8C621E" fontSize="8.5" fontWeight="700" fontFamily="sans-serif">SMART CARE</text>
      </g>
    </svg>
  );
}
