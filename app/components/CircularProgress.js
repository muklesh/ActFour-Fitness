
"use client";

import React from 'react';
import './CircularProgress.css'; 

export default function CircularProgress({ progress }) {
  const percentage = Math.min(Math.max(progress, 0), 100);
  const strokeDashoffset = 283 - (283 * percentage) / 100; 
  return (
    <div className="circular-progress">
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" className="bg-circle"></circle>
        <circle 
          cx="50" 
          cy="50" 
          r="45" 
          className="progress-circle" 
          style={{ strokeDashoffset }} 
        ></circle>
      </svg>
      <div className="progress-text">{Math.round(percentage)}%</div>
    </div>
  );
}
