import React from 'react';
import '../styles/LoadingSpinner.css';

export default function LoadingSpinner() {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
      <p>Processing...</p>
    </div>
  );
}