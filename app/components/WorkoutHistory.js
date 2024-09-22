"use client";

import React, { useState } from 'react';
import metsData from '../data/mets.json';
import { calculateCalories } from '../utils/calorieUtils';

export default function WorkoutHistory({ activities, onUpdate, onDelete }) {
  const today = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(today);
  const [editIndex, setEditIndex] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newWeight, setNewWeight] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newActivityId, setNewActivityId] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleEditClick = (index, activity) => {
    setEditIndex(index);
    setNewDate(activity.date);
    setNewWeight(activity.weight);
    setNewTime(activity.time);
    setNewActivityId(activity.id); 
    setShowMessage(false);
  };

  const handleDateUpdate = () => {
    if (editIndex !== null) {
      const selectedActivity = metsData.find(met => met.id === newActivityId);
      const calories = calculateCalories(selectedActivity.met, newWeight, newTime);
      
      const updatedActivity = {
        ...activities[editIndex],
        date: newDate,
        weight: newWeight,
        time: newTime,
        motion: selectedActivity.motion,
        calories: calories, 
      };
      onUpdate(editIndex, updatedActivity);
      setEditIndex(null);
      setShowMessage(true);
    }
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setNewDate('');
    setNewWeight('');
    setNewTime('');
    setNewActivityId('');
  };

  const handleDeleteClick = (index) => {
    onDelete(index);
  };

  const filteredActivities = activities.filter(activity => activity.date === selectedDate);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Workout History</h2>
      
      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleDateChange} 
        className="p-2 border border-gray-300 rounded mb-4"
      />
      
      <ul className="border border-gray-300 rounded-lg">
        {filteredActivities.length > 0 ? (
          filteredActivities.map((activity, index) => (
            <li key={index} className="p-4 border-b last:border-b-0">
              <p>{activity.date === today ? 'Today' : activity.date}</p>
              <p>{activity.motion} for {activity.time} hours</p>
              <p>{activity.weight} kg</p>
              <p>{activity.calories} calories burned</p>
              
              {editIndex === index ? (
                <div className="mt-4 space-y-2">
                  <input 
                    type="date" 
                    value={newDate} 
                    onChange={(e) => setNewDate(e.target.value)} 
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input 
                    type="number" 
                    value={newWeight} 
                    onChange={(e) => setNewWeight(e.target.value)} 
                    placeholder="Weight (kg)" 
                    className="p-2 border border-gray-300 rounded"
                  />
                  <input 
                    type="number" 
                    value={newTime} 
                    onChange={(e) => setNewTime(e.target.value)} 
                    placeholder="Time (hours)" 
                    className="p-2 border border-gray-300 rounded"
                  />
                  <select 
                    value={newActivityId} 
                    onChange={(e) => setNewActivityId(e.target.value)} 
                    className="p-2 border border-gray-300 rounded"
                  >
                    {metsData.map((activity) => (
                      <option key={activity.id} value={activity.id}>
                        {activity.motion}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex space-x-2 mt-2">
                    <button 
                      onClick={handleDateUpdate} 
                      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-400"
                    >
                      Save
                    </button>
                    <button 
                      onClick={handleCancelEdit} 
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2 mt-2">
                  <button 
                    onClick={() => handleEditClick(index, activity)} 
                    className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteClick(index)} 
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))
        ) : (
          <p>No activities found for this date.</p>
        )}
      </ul>
      
      {showMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded">
          Activity updated successfully!
        </div>
      )}
    </div>
  );
}
