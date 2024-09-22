"use client";

import { useState } from 'react';
import metsData from '../data/mets.json';
import { calculateCalories } from '../utils/calorieUtils';

export default function ActivityForm({ onActivityLog }) {
  const [weight, setWeight] = useState('');
  const [time, setTime] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(metsData[0]);
  const [showPopup, setShowPopup] = useState(false); 
  const handleSubmit = (e) => {
    e.preventDefault();

    const calories = calculateCalories(selectedActivity.met, weight, time);
    const currentDate = new Date().toISOString().split('T')[0]; 
    const newActivity = {
      ...selectedActivity,
      weight,
      time,
      calories,
      date: currentDate,
    };

    onActivityLog(newActivity);
    setWeight('');
    setTime('');
    setSelectedActivity(metsData[0]);
    setShowPopup(false); 
  };

  const openPopup = () => {
    setShowPopup(true); 
  };

  const closePopup = () => {
    setShowPopup(false); 
  };

  return (
    <div className="text-center">
      <button
        onClick={openPopup}
        className="mt-4 w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300"
      >
        Log Activity
      </button>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Log Activity</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Time (hours):</label>
                <input
                  type="number"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Activity:</label>
                <select
                  value={selectedActivity.id}
                  onChange={(e) => setSelectedActivity(metsData.find(met => met.id === e.target.value))}
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  {metsData.map((activity) => (
                    <option key={activity.id} value={activity.id}>
                      {activity.motion}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:outline-none"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={closePopup}
                  className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
