"use client";

import React from "react";

// Hand-drawn tilted lined paper sketch doodle (left)
export function LinedPaperDoodleLeft({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: "rotate(-8deg)" }}
    >
      <svg
        width="110"
        height="130"
        viewBox="0 0 110 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm opacity-85"
      >
        {/* Paper sheet */}
        <rect
          x="6"
          y="6"
          width="96"
          height="116"
          rx="4"
          fill="#FFFDF6"
          stroke="#111815"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lined paper lines */}
        <line x1="16" y1="24" x2="88" y2="24" stroke="#111815" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1 3" />
        <line x1="28" y1="40" x2="86" y2="40" stroke="#111815" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="28" y1="56" x2="82" y2="56" stroke="#111815" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="28" y1="72" x2="88" y2="72" stroke="#111815" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="28" y1="88" x2="76" y2="88" stroke="#111815" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="28" y1="104" x2="84" y2="104" stroke="#111815" strokeWidth="1.4" strokeLinecap="round" />

        {/* Bullet checklist dots / checks */}
        <circle cx="20" cy="40" r="2.5" fill="#111815" />
        <circle cx="20" cy="56" r="2.5" fill="#111815" />
        <circle cx="20" cy="72" r="2.5" fill="#111815" />
        <circle cx="20" cy="88" r="2.5" fill="#111815" />
        <circle cx="20" cy="104" r="2.5" fill="#111815" />

        {/* Hand drawn fold corner */}
        <path d="M84 6 L102 24 L84 24 Z" fill="#F4EED8" stroke="#111815" strokeWidth="1.4" />
      </svg>
    </div>
  );
}

// Hand-drawn tilted lined paper sketch doodle (right)
export function LinedPaperDoodleRight({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: "rotate(9deg)" }}
    >
      <svg
        width="110"
        height="130"
        viewBox="0 0 110 130"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm opacity-85"
      >
        {/* Paper sheet with ragged lines */}
        <rect
          x="8"
          y="6"
          width="94"
          height="116"
          rx="5"
          fill="#FFFDF6"
          stroke="#111815"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Lined paper header */}
        <path
          d="M18 26 Q 55 23 90 27"
          stroke="#111815"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Wavy cursive hand-drawn lines */}
        <path
          d="M18 42 Q 35 40 50 43 T 88 41"
          stroke="#111815"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M18 58 Q 40 60 62 57 T 86 59"
          stroke="#111815"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M18 74 Q 38 72 58 75 T 82 73"
          stroke="#111815"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M18 90 Q 45 92 70 89 T 88 91"
          stroke="#111815"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path
          d="M18 106 Q 36 104 54 107 T 72 105"
          stroke="#111815"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// Hand-drawn curly sketch arrow
export function CurlySketchArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="90"
      height="65"
      viewBox="0 0 90 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none ${className}`}
    >
      <path
        d="M12 48 C 22 18, 55 12, 68 28 C 76 38, 70 48, 56 46 C 45 44, 46 32, 54 26 C 62 20, 75 22, 82 34"
        stroke="#111815"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrowhead */}
      <path
        d="M72 32 L83 35 L80 24"
        stroke="#111815"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Sticky note paperclip or pushpin
export function StickyPaperclip({ color = "#111815" }: { color?: string }) {
  return (
    <svg
      width="32"
      height="22"
      viewBox="0 0 32 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      {/* Little tape strip */}
      <rect
        x="2"
        y="2"
        width="28"
        height="12"
        rx="2"
        fill="rgba(255, 255, 255, 0.7)"
        stroke="rgba(0, 0, 0, 0.25)"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
    </svg>
  );
}

// Career ladder success illustration for pre-footer banner
export function CareerLadderGraphic() {
  return (
    <svg
      width="160"
      height="140"
      viewBox="0 0 160 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="select-none"
    >
      {/* Growth steps */}
      <rect x="80" y="95" width="22" height="35" rx="3" fill="#111815" />
      <rect x="105" y="70" width="22" height="60" rx="3" fill="#111815" />
      <rect x="130" y="45" width="22" height="85" rx="3" fill="#111815" />

      {/* Ground line */}
      <line x1="10" y1="130" x2="155" y2="130" stroke="#111815" strokeWidth="2.5" strokeLinecap="round" />

      {/* Big Star above target */}
      <path
        d="M141 18 L144 26 L152 27 L146 33 L148 41 L141 37 L134 41 L136 33 L130 27 L138 26 Z"
        fill="#FEF08A"
        stroke="#111815"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Candidate climbing with briefcase */}
      {/* Head */}
      <circle cx="56" cy="62" r="8" fill="#FFFDF6" stroke="#111815" strokeWidth="2.2" />
      {/* Body */}
      <path d="M56 70 L56 94" stroke="#111815" strokeWidth="2.4" strokeLinecap="round" />
      {/* Legs climbing */}
      <path d="M56 94 L70 94 L80 95" stroke="#111815" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M56 94 L46 112 L40 128" stroke="#111815" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Arms */}
      <path d="M56 76 L70 72 L82 70" stroke="#111815" strokeWidth="2.2" strokeLinecap="round" />
      {/* Briefcase */}
      <rect x="28" y="80" width="16" height="12" rx="2" fill="#FEF08A" stroke="#111815" strokeWidth="1.8" />
      <path d="M33 80 L33 76 L39 76 L39 80" stroke="#111815" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M56 76 L40 82" stroke="#111815" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

