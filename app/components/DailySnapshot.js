
"use client";

import { useEffect, useState } from 'react';
import CircularProgress from './CircularProgress';
import Confetti from 'react-confetti';
import './DailySnapshot.css'; 

export default function DailySnapshot({ activities, steps, weightGoal }) {
  const [totalCalories, setTotalCalories] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);

  useEffect(() => {
    const caloriesBurned = activities.reduce((total, activity) => total + activity.calories, 0);
    setTotalCalories(caloriesBurned);
  }, [activities]);

  useEffect(() => {
    if (steps >= 10000 || totalCalories >= 2000) {
      setShowConfetti(true);
      setShowCongrats(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 10000);
    }
  }, [steps, totalCalories]);

  const stepProgress = Math.min((steps / 10000) * 100, 100);
  const calorieProgress = (totalCalories / 2000) * 100;

  return (
    <div className="daily-snapshot">
      <h2>Today's Rundown</h2>

      
      {showConfetti && <Confetti />}

      <div className="progress-container">
        <div>
          <h3>Steps</h3>
          <CircularProgress progress={stepProgress} />
          <p>{steps} / 10,000</p>
        </div>
        <div>
          <h3>Calories Burned</h3>
          <CircularProgress progress={calorieProgress} />
          <p>{totalCalories} kcal</p>
        </div>
        <div>
          <h3>Weight Goal</h3>
          <CircularProgress progress={weightGoal ? (weightGoal / 100) * 100 : 0} />
          <p>Goal: {weightGoal} kg</p>
        </div>
      </div>

      
      {showCongrats && (
        <div className="congrats-modal">
          <div className="modal-content">
            <h2>🎉 Congratulations! 🎉</h2>
            <p>You've exceeded your daily target!</p>
            <button onClick={() => setShowCongrats(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
