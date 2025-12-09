import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import ActivityCard from '../components/ActivityCard';

export default function History() {
  const { activities } = useContext(ActivityContext);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [dateFilter, setDateFilter] = useState('all');

  // Filter activities
  let filteredActivities = [...activities];

  if (filterType !== 'all') {
    filteredActivities = filteredActivities.filter(a => a.type === filterType);
  }

  // Date filtering
  if (dateFilter === 'today') {
    const today = new Date().toDateString();
    filteredActivities = filteredActivities.filter(a => 
      new Date(a.date).toDateString() === today
    );
  } else if (dateFilter === 'week') {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    filteredActivities = filteredActivities.filter(a => 
      new Date(a.date) >= weekAgo
    );
  } else if (dateFilter === 'month') {
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);
    filteredActivities = filteredActivities.filter(a => 
      new Date(a.date) >= monthAgo
    );
  }

  // Sorting
  filteredActivities.sort((a, b) => {
    if (sortBy === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'calories-desc') {
      return (b.calories || 0) - (a.calories || 0);
    } else if (sortBy === 'duration-desc') {
      return (b.duration || 0) - (a.duration || 0);
    }
    return 0;
  });

  // Group activities by date
  const groupedActivities = filteredActivities.reduce((groups, activity) => {
    const date = new Date(activity.date).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {});

  const activityTypes = [
    { value: 'all', label: 'All Types', icon: '📋' },
    { value: 'workout', label: 'Workout', icon: '💪' },
    { value: 'steps', label: 'Walking', icon: '🚶' },
    { value: 'running', label: 'Running', icon: '🏃' },
    { value: 'cycling', label: 'Cycling', icon: '🚴' },
    { value: 'other', label: 'Other', icon: '🏋️' }
  ];

  // Calculate total stats
  const totalStats = filteredActivities.reduce(
    (acc, activity) => ({
      steps: acc.steps + (activity.steps || 0),
      calories: acc.calories + (activity.calories || 0),
      duration: acc.duration + (activity.duration || 0),
      count: acc.count + 1
    }),
    { steps: 0, calories: 0, duration: 0, count: 0 }
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Activity History
          </h1>
          <p className="text-gray-400 text-lg">View and manage all your fitness activities</p>
        </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl shadow-2xl p-6 border border-blue-500/50 animate-fade-in">
          <p className="text-sm text-blue-200 mb-2">Total Activities</p>
          <p className="text-3xl font-bold text-white">{totalStats.count}</p>
        </div>
        <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl shadow-2xl p-6 border border-green-500/50 animate-fade-in delay-100">
          <p className="text-sm text-green-200 mb-2">Total Steps</p>
          <p className="text-3xl font-bold text-white">{totalStats.steps.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl shadow-2xl p-6 border border-orange-500/50 animate-fade-in delay-200">
          <p className="text-sm text-orange-200 mb-2">Total Calories</p>
          <p className="text-3xl font-bold text-white">{totalStats.calories.toLocaleString()}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-2xl p-6 border border-purple-500/50 animate-fade-in delay-300">
          <p className="text-sm text-purple-200 mb-2">Total Duration</p>
          <p className="text-3xl font-bold text-white">{totalStats.duration}m</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-6 mb-8 border border-gray-800 animate-slide-up">
        <h2 className="text-xl font-bold text-white mb-6">Filters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Activity Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              {activityTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
            >
              <option value="date-desc">Date (Newest First)</option>
              <option value="date-asc">Date (Oldest First)</option>
              <option value="calories-desc">Calories (High to Low)</option>
              <option value="duration-desc">Duration (Long to Short)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities List */}
      {filteredActivities.length === 0 ? (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-12 text-center border border-gray-800 animate-slide-up">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-gray-800 to-gray-900 rounded-full flex items-center justify-center border border-gray-700">
            <svg className="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No activities found</h3>
          <p className="text-gray-400 mb-6 text-lg">
            {activities.length === 0 
              ? "Start tracking your fitness journey by adding your first activity!"
              : "Try adjusting your filters to see more activities."
            }
          </p>
          {activities.length === 0 && (
            <Link
              to="/add"
              className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Add Your First Activity
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedActivities).map(([date, dateActivities]) => (
            <div key={date}>
              <h3 className="text-lg font-bold text-white mb-4 sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 py-3 px-4 rounded-lg border border-gray-700 shadow-lg">
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                <span className="ml-2 text-sm font-normal text-gray-500">
                  ({dateActivities.length} {dateActivities.length === 1 ? 'activity' : 'activities'})
                </span>
              </h3>
              <div className="space-y-4">
                {dateActivities.map(activity => (
                  <ActivityCard key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

