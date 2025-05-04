"use client";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface CurationVersionToggleProps {
  version: string;
}

const CurationVersionToggle: React.FC<CurationVersionToggleProps> = ({ version }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleVersionChange = (v: 'v1' | 'v2') => {
    const params = new URLSearchParams(location.search);
    params.set('version', v);
    navigate(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <span className="font-semibold text-gray-700">Version:</span>
      <button
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${version === 'v1' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
        onClick={() => handleVersionChange('v1')}
      >
        v1
      </button>
      <button
        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${version === 'v2' ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'}`}
        onClick={() => handleVersionChange('v2')}
      >
        v2
      </button>
    </div>
  );
};

export default CurationVersionToggle; 