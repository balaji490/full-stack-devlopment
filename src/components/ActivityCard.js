import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import { WorkoutIcon, WalkingIcon, RunningIcon, CyclingIcon, StepsIcon, CaloriesIcon, DurationIcon } from './Icons';

export default function ActivityCard({ activity }) {
  const navigate = useNavigate();
  const { removeActivity } = useContext(ActivityContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActivityIcon = (type) => {
    const iconProps = { className: "w-8 h-8" };
    switch(type) {
      case 'workout':
        return <WorkoutIcon {...iconProps} color="text-purple-400" />;
      case 'steps':
      case 'walking':
        return <WalkingIcon {...iconProps} color="text-green-400" />;
      case 'running':
        return <RunningIcon {...iconProps} color="text-red-400" />;
      case 'cycling':
        return <CyclingIcon {...iconProps} color="text-blue-400" />;
      default:
        return <WorkoutIcon {...iconProps} color="text-gray-400" />;
    }
  };

  const getActivityColor = (type) => {
    const colors = {
      workout: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
      steps: 'bg-green-500/20 text-green-400 border-green-500/50',
      walking: 'bg-green-500/20 text-green-400 border-green-500/50',
      running: 'bg-red-500/20 text-red-400 border-red-500/50',
      cycling: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
      other: 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    };
    return colors[type] || colors.other;
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this activity?')) {
      removeActivity(activity.id);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit/${activity.id}`);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-xl shadow-2xl hover:shadow-orange-500/20 transition-all p-6 border border-gray-800 hover:border-orange-500/50 transform hover:-translate-y-1 animate-fade-in">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
            {getActivityIcon(activity.type)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">{activity.name}</h3>
            <p className="text-sm text-gray-400">{formatDate(activity.date)}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getActivityColor(activity.type)}`}>
          {activity.type}
        </span>
      </div>

      {activity.description && (
        <p className="text-gray-300 mb-4">{activity.description}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {activity.duration > 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <DurationIcon className="w-5 h-5" color="text-green-400" />
              <p className="text-xs text-gray-400 uppercase">Duration</p>
            </div>
            <p className="text-lg font-bold text-white">{activity.duration} min</p>
          </div>
        )}
        {activity.calories > 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <CaloriesIcon className="w-5 h-5" color="text-orange-400" />
              <p className="text-xs text-gray-400 uppercase">Calories</p>
            </div>
            <p className="text-lg font-bold text-orange-400">{activity.calories} kcal</p>
          </div>
        )}
        {activity.steps > 0 && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center gap-2 mb-1">
              <StepsIcon className="w-5 h-5" color="text-blue-400" />
              <p className="text-xs text-gray-400 uppercase">Steps</p>
            </div>
            <p className="text-lg font-bold text-blue-400">{activity.steps.toLocaleString()}</p>
          </div>
        )}
        {!activity.duration && !activity.calories && !activity.steps && (
          <div className="col-span-2 md:col-span-4 text-center text-gray-500 text-sm py-2">
            No metrics recorded
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-4 border-t border-gray-800">
        <button
          onClick={handleEdit}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-lg transition-all text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
