import React, { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ActivityForm from '../components/ActivityForm';
import { ActivityContext } from '../context/ActivityContext';
import { useState, useEffect } from 'react';

export default function EditActivity() {
  const { activities, updateActivity } = useContext(ActivityContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Find activity - handle both string and number IDs
  const activity = activities.find(a => a.id === parseInt(id) || a.id === id);

  useEffect(() => {
    if (activities.length > 0) {
      setLoading(false);
    }
  }, [activities]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading activity...</p>
        </div>
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl p-8 border border-gray-800 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">Activity Not Found</h2>
            <p className="text-gray-400 mb-6">The activity you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/history')}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl font-semibold"
            >
              Back to History
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (activityData) => {
    await updateActivity(activity.id, activityData);
    navigate('/history');
  };

  const handleCancel = () => {
    navigate('/history');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Edit Activity
          </h1>
          <p className="text-gray-400 text-lg">Update your activity details</p>
        </div>
        
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl p-8 border border-gray-800">
          <ActivityForm 
            initial={activity} 
            onSubmit={handleSubmit} 
            onCancel={handleCancel}
          />
        </div>
      </div>
    </div>
  );
}
