
"use client";

import { useState } from 'react';

export default function StatsPage() {
  const [weight, setWeight] = useState(localStorage.getItem('weight') || '');
  const [height, setHeight] = useState(localStorage.getItem('height') || '');
  const [goalWeight, setGoalWeight] = useState(localStorage.getItem('goalWeight') || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('goalWeight', goalWeight);
    alert('Profile updated!');
  };

  return (
    <div>
      <h2>My Stats</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Weight (kg):</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        </div>
        <div>
          <label>Height (cm):</label>
          <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} required />
        </div>
        <div>
          <label>Goal Weight (kg):</label>
          <input type="number" value={goalWeight} onChange={(e) => setGoalWeight(e.target.value)} required />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}
