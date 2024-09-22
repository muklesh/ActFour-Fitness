"use client";

import { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';  

export default function WeightGoalProgress() {
  const [currentWeight, setCurrentWeight] = useState('');
  const [goalWeight, setGoalWeight] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const savedWeight = parseFloat(localStorage.getItem('weight'));
    const savedGoalWeight = parseFloat(localStorage.getItem('goalWeight'));

    if (savedWeight && savedGoalWeight) {
      setCurrentWeight(savedWeight);
      setGoalWeight(savedGoalWeight);
      calculateProgress(savedWeight, savedGoalWeight);
    }
  }, []);

  const calculateProgress = (weight, goal) => {
    const weightToLose = weight - goal;
    const progressPercent = ((weight - goal) / weightToLose) * 100;
    setProgress(Math.max(0, Math.min(progressPercent, 100)));  // Ensure progress is between 0 and 100
  };

  const handleSetWeights = (e) => {
    e.preventDefault();
    const weight = parseFloat(currentWeight);
    const goal = parseFloat(goalWeight);

    if (!isNaN(weight) && !isNaN(goal) && weight > goal) {
      localStorage.setItem('weight', weight);
      localStorage.setItem('goalWeight', goal);
      calculateProgress(weight, goal);
    } else {
      alert("Please enter valid weights (current weight must be greater than goal weight).");
    }
  };

  return (
    <div>
      <h2>Your Weight Goal Progress</h2>
      
      <form onSubmit={handleSetWeights} className="mb-4">
        <div className="mb-2">
          <label className="block">Current Weight (kg):</label>
          <input 
            type="number" 
            value={currentWeight} 
            onChange={(e) => setCurrentWeight(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-2">
          <label className="block">Goal Weight (kg):</label>
          <input 
            type="number" 
            value={goalWeight} 
            onChange={(e) => setGoalWeight(e.target.value)} 
            required 
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400">
          Set Weight Goal
        </button>
      </form>

      {currentWeight && goalWeight && (
        <>
          <CircularProgress progress={progress} />  {/* Circular progress bar */}
          <p>{progress.toFixed(2)}% of the way to your goal!</p>
          <p>Current Weight: {currentWeight} kg</p>
          <p>Goal Weight: {goalWeight} kg</p>
        </>
      )}
    </div>
  );
}
