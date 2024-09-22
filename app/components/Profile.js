"use client";
import { useState, useEffect } from 'react';

export default function Profile({ onUpdate }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');

  useEffect(() => {
    const savedWeight = localStorage.getItem('weight');
    const savedHeight = localStorage.getItem('height');
    const savedGoalWeight = localStorage.getItem('goalWeight');

    if (savedWeight) setWeight(savedWeight);
    if (savedHeight) setHeight(savedHeight);
    if (savedGoalWeight) setGoalWeight(savedGoalWeight);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('weight', weight);
    localStorage.setItem('height', height);
    localStorage.setItem('goalWeight', goalWeight);
    onUpdate({ weight, height, goalWeight });
    alert('Profile updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label>Height (cm):</label>
        <input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
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
      <button type="submit">Update Profile</button>
    </form>
  );
}
