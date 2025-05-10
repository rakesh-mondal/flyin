"use client";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CurationVersionToggleProps {
  version: 'v2' | 'v3';
  setVersion: (v: 'v2' | 'v3') => void;
}

const CurationVersionToggle: React.FC<CurationVersionToggleProps> = ({ version, setVersion }) => (
  <div className="flex items-center gap-2 bg-white border rounded-lg shadow px-3 py-2">
    <button
      className={`px-3 py-1 rounded text-xs font-medium transition-all ${version === 'v2' ? 'bg-black text-white' : 'bg-white text-black border'}`}
      onClick={() => setVersion('v2')}
    >
      v2
    </button>
    <button
      className={`px-3 py-1 rounded text-xs font-medium transition-all ${version === 'v3' ? 'bg-black text-white' : 'bg-white text-black border'}`}
      onClick={() => setVersion('v3')}
    >
      v3
    </button>
  </div>
);

export default CurationVersionToggle; 