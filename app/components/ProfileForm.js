// app/components/ProfileForm.js
"use client";

import { useState, useEffect } from 'react';

export default function ProfileForm({ onUpdate }) {
  const [weight, setWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

  useEffect(() => {
    const savedWeight = localStorage.getItem('weight');
    const savedGoalWeight = localStorage.getItem('goalWeight');
    
    if (savedWeight) setWeight(savedWeight);
    if (savedGoalWeight) setGoalWeight(savedGoalWeight);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('weight', weight);
    localStorage.setItem('goalWeight', goalWeight);
    onUpdate({ weight, goalWeight });
    alert('Weight and Goal updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Set Your Weight Goals</h3>
      <div>
        <label>Current Weight (kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Goal Weight (kg):</label>
        <input
          type="number"
          value={goalWeight}
          onChange={(e) => setGoalWeight(e.target.value)}
          required
        />
      </div>
      <button type="submit">Save Weight Goal</button>
    </form>
  );
}
