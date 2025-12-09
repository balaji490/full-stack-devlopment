import React, { useState, useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { Link } from 'react-router-dom';
import { StepsIcon, CaloriesIcon, WorkoutIcon, DurationIcon, CheckIcon } from '../components/Icons';

export default function Goals() {
  const { goals, updateGoals, getTodayStats, getWeekStats } = useContext(ActivityContext);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    dailySteps: goals.dailySteps || 10000,
    dailyCalories: goals.dailyCalories || 2000,
    weeklyWorkouts: goals.weeklyWorkouts || 5,
    dailyWorkoutDuration: goals.dailyWorkoutDuration || 60
  });

  const todayStats = getTodayStats();
  const weekStats = getWeekStats();

  const handleSubmit = (e) => {
    e.preventDefault();
    updateGoals(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      dailySteps: goals.dailySteps,
      dailyCalories: goals.dailyCalories,
      weeklyWorkouts: goals.weeklyWorkouts,
      dailyWorkoutDuration: goals.dailyWorkoutDuration
    });
    setIsEditing(false);
  };

  const calculateProgress = (current, goal) => {
    if (!goal || goal === 0) return 0;
    return Math.min((current / goal) * 100, 100);
  };

  const goalCards = [
    {
      title: 'Daily Steps',
      Icon: StepsIcon,
      current: todayStats.steps,
      goal: goals.dailySteps,
      unit: 'steps',
      gradient: 'from-blue-600 via-blue-700 to-blue-800',
      borderColor: 'border-blue-500/50',
      textColor: 'text-blue-300',
      tips: [
        'Take the stairs instead of elevators',
        'Park farther from your destination',
        'Take short walks during breaks',
        'Use a pedometer or fitness tracker',
        'Walk while on phone calls'
      ]
    },
    {
      title: 'Daily Calories',
      Icon: CaloriesIcon,
      current: todayStats.calories,
      goal: goals.dailyCalories,
      unit: 'calories',
      gradient: 'from-orange-600 via-red-600 to-orange-700',
      borderColor: 'border-orange-500/50',
      textColor: 'text-orange-300',
      tips: [
        'Include cardio exercises (running, cycling)',
        'Add high-intensity interval training (HIIT)',
        'Engage in strength training',
        'Increase workout duration',
        'Try new activities like swimming or dancing'
      ]
    },
    {
      title: 'Weekly Workouts',
      Icon: WorkoutIcon,
      current: weekStats.workouts,
      goal: goals.weeklyWorkouts,
      unit: 'workouts',
      gradient: 'from-purple-600 via-purple-700 to-purple-800',
      borderColor: 'border-purple-500/50',
      textColor: 'text-purple-300',
      tips: [
        'Schedule workouts in your calendar',
        'Start with shorter sessions and build up',
        'Mix different types of workouts',
        'Find a workout buddy for motivation',
        'Join group fitness classes'
      ]
    },
    {
      title: 'Daily Workout Duration',
      Icon: DurationIcon,
      current: todayStats.workoutDuration,
      goal: goals.dailyWorkoutDuration,
      unit: 'minutes',
      gradient: 'from-green-600 via-green-700 to-green-800',
      borderColor: 'border-green-500/50',
      textColor: 'text-green-300',
      tips: [
        'Gradually increase workout time by 5-10 minutes',
        'Split workouts into morning and evening sessions',
        'Include warm-up and cool-down periods',
        'Try longer activities like hiking or cycling',
        'Track time with a fitness app'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4 animate-fade-in">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
              Fitness Goals
            </h1>
            <p className="text-gray-400 text-lg">Set and track your fitness objectives</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Edit Goals
            </button>
          )}
        </div>

        {/* How to Check and Increase Goals Guide */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-800 animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
            How to Check & Increase Your Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-6 rounded-xl border border-blue-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <StepsIcon />
                Check Your Progress
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>View current progress in the goal cards below</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Check progress bars showing percentage completion</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Visit <Link to="/dashboard" className="text-orange-400 hover:text-orange-300 underline">Dashboard</Link> for detailed stats</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>View charts showing trends over the last 7 days</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-900/50 to-red-800/50 p-6 rounded-xl border border-orange-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CaloriesIcon />
                Increase Your Goals
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Log activities regularly via <Link to="/add" className="text-orange-400 hover:text-orange-300 underline">Add Activity</Link></span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Gradually increase your goal targets</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Follow tips for each goal category below</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Stay consistent and track daily progress</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {isEditing ? (
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 mb-8 border border-gray-800 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Edit Your Goals</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Daily Steps Goal
                  </label>
                  <input
                    type="number"
                    value={formData.dailySteps}
                    onChange={(e) => setFormData({ ...formData, dailySteps: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Daily Calories Goal
                  </label>
                  <input
                    type="number"
                    value={formData.dailyCalories}
                    onChange={(e) => setFormData({ ...formData, dailyCalories: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Weekly Workouts Goal
                  </label>
                  <input
                    type="number"
                    value={formData.weeklyWorkouts}
                    onChange={(e) => setFormData({ ...formData, weeklyWorkouts: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Daily Workout Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.dailyWorkoutDuration}
                    onChange={(e) => setFormData({ ...formData, dailyWorkoutDuration: parseInt(e.target.value) || 0 })}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Save Goals
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : null}

        {/* Goal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {goalCards.map((goal, index) => {
            const progress = calculateProgress(goal.current, goal.goal);
            const isAchieved = progress >= 100;
            const Icon = goal.Icon;

            return (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl overflow-hidden border ${goal.borderColor} hover:scale-105 transition-all animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`bg-gradient-to-r ${goal.gradient} p-8 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Icon />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{goal.title}</h3>
                        <p className="text-sm opacity-90">Target: {goal.goal.toLocaleString()} {goal.unit}</p>
                      </div>
                    </div>
                    {isAchieved && (
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm animate-pulse">
                        <CheckIcon />
                      </div>
                    )}
                  </div>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{goal.current.toLocaleString()}</span>
                      <span className="text-xl opacity-90">/ {goal.goal.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full h-3">
                    <div
                      className={`bg-white rounded-full h-3 transition-all duration-500 shadow-lg ${
                        isAchieved ? 'animate-pulse' : ''
                      }`}
                      style={{ width: `${Math.min(progress, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm mt-3 opacity-90">
                    {progress.toFixed(1)}% complete
                    {isAchieved && ' - Goal Achieved!'}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-sm font-medium ${goal.textColor}`}>
                      {goal.current >= goal.goal 
                        ? 'Goal exceeded!' 
                        : `${(goal.goal - goal.current).toLocaleString()} ${goal.unit} remaining`
                      }
                    </span>
                  </div>
                  
                  {/* Tips Section */}
                  <div className="border-t border-gray-700 pt-4">
                    <h4 className="text-sm font-semibold text-white mb-3">Tips to Increase {goal.title}:</h4>
                    <ul className="space-y-2">
                      {goal.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-400">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Message */}
        <div className="mt-8 bg-gradient-to-r from-gray-900 via-gray-800 to-black rounded-2xl p-8 border border-gray-800 shadow-2xl animate-slide-up">
          <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
            Keep Going!
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Consistency is key to achieving your fitness goals. Track your activities daily and 
            watch your progress improve over time. Every step counts! Remember to:
          </p>
          <ul className="mt-4 space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span>Set realistic and achievable goals</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span>Log your activities regularly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span>Review your progress weekly</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckIcon />
              <span>Gradually increase your targets as you improve</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
