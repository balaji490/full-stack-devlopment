import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import { ActivityContext } from '../context/ActivityContext';

export default function AddActivity() {
  const { addActivity } = useContext(ActivityContext);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      const result = await addActivity(data);
      if (result) {
        // Small delay to ensure state updates
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('Error adding activity:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Add Activity
          </h1>
          <p className="text-gray-400 text-lg">Log your workout, steps, or other physical activity</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-800 animate-slide-up">
          <ActivityForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}
