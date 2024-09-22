
"use client";

import React from 'react';

export default function DatePicker({ selectedDate, onDateChange }) {
  return (
    <div>
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
      />
    </div>
  );
}
