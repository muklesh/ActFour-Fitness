
import ActivityForm from '../components/ActivityForm';
import { useState } from 'react';

export default function LogActivityPage() {
  const [activities, setActivities] = useState([]);

  const handleActivityLog = (newActivity) => {
    setActivities([...activities, newActivity]);
  };

  return (
    <main>
      <h1>Log New Activity</h1>
      <ActivityForm onActivityLog={handleActivityLog} />
    </main>
  );
}
