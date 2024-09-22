"use client";
import { useState, useEffect } from 'react';
import DatePicker from './components/DatePicker';
import WorkoutHistory from './components/WorkoutHistory';
import ActivityForm from './components/ActivityForm';
import DailySnapshot from './components/DailySnapshot';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css';

export default function HomePage() {
  const [activities, setActivities] = useState([]);
  const [steps, setSteps] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); 
  const [loggedIn, setLoggedIn] = useState(false); 
  const [username, setUsername] = useState(""); 
  const [showStepsPopup, setShowStepsPopup] = useState(false); 
  const [newSteps, setNewSteps] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setLoggedIn(true);
      setUsername(savedUsername);
    }

    const savedActivities = JSON.parse(localStorage.getItem("activities")) || [];
    const savedSteps = JSON.parse(localStorage.getItem("steps")) || 0;

    setActivities(savedActivities);
    setSteps(savedSteps);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const usernameInput = e.target.username.value;
    const passwordInput = e.target.password.value;

    if (usernameInput === 'muklesh' && passwordInput === 'test1234') {
      setLoggedIn(true);
      setUsername(usernameInput);
      localStorage.setItem("username", usernameInput);
    } else {
      toast.error("Please enter a valid credentials.");
    }
  };

  const handleActivityLog = (newActivity) => {
    const updatedActivities = [...activities, newActivity];
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  const handleStepsLog = () => {
    setShowStepsPopup(true); 
  };

  const submitSteps = (e) => {
    e.preventDefault();
    const parsedSteps = parseInt(newSteps, 10);
    
    if (!isNaN(parsedSteps) && parsedSteps >= 0) {
      const updatedSteps = steps + parsedSteps; 
      setSteps(updatedSteps);
      localStorage.setItem("steps", JSON.stringify(updatedSteps));
      toast.success("Steps added successfully!");
      setNewSteps('');
      setShowStepsPopup(false);
    } else {
      toast.error("Please enter a valid number of steps.");
      setNewSteps('');
      setShowStepsPopup(false);
    }
  };
  

  const handleUpdateActivity = (index, updatedActivity) => {
    const updatedActivities = [...activities];
    updatedActivities[index] = updatedActivity;
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  const handleDelete = (index) => {
    const updatedActivities = activities.filter((_, i) => i !== index);
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };
  
  const handleLogout = () => {
    localStorage.removeItem("username");
    setLoggedIn(false);
    setUsername("");
  };

  const closeStepsPopup = () => {
    setShowStepsPopup(false); 
  };

  if (!loggedIn) {
    return (
      <main className="flex flex-col items-center justify-center h-screen">
        <ToastContainer />
        <h1 className="text-4xl font-bold text-white mb-8">ActFour Fitness</h1>
        <form onSubmit={handleLogin} className="bg-white p-8 rounded-lg shadow-lg w-96">
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">Username:</label>
            <input type="text" name="username" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <p>Please enter username : muklesh</p>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700">Password:</label>
            <input type="password" name="password" required className="mt-2 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
            <p>Please enter password : test1234</p>
          </div>
          <button type="submit" className="w-full py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-400 focus:outline-none focus:ring-4 focus:ring-green-300">
            Login
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-center">
      <ToastContainer /> 
      <header className="flex justify-between items-center mb-6 text-white">
        <h1 className="text-3xl font-bold">Welcome, {username}!</h1>
        <button onClick={handleLogout} className="py-2 px-6 bg-red-500 text-white font-bold rounded-lg hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-300">
          Logout
        </button>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          {/* <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} /> */}
          <WorkoutHistory 
            activities={activities} 
            selectedDate={selectedDate}
            onUpdate={handleUpdateActivity}
            onDelete={handleDelete}  
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <DailySnapshot activities={activities} steps={steps} weightGoal={70}/>
          <ActivityForm onActivityLog={handleActivityLog} />
          <button onClick={handleStepsLog} className="mt-4 w-full py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300">
            Log Steps
          </button>
        </div>
      </section>

      {showStepsPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Log Steps</h3>
            <form onSubmit={submitSteps}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Steps:</label>
                <input
                  type="number"
                  value={newSteps}
                  onChange={(e) => setNewSteps(e.target.value)}
                  required
                  className="mt-1 block w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="mt-4 w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 focus:outline-none"
                >
                  Add Step
                </button>
                <button
                  type="button"
                  onClick={closeStepsPopup}
                  className="mt-4 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 focus:outline-none"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
