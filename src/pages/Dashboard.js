import React, { useContext } from 'react';
import { ActivityContext } from '../context/ActivityContext';
import { MembershipContext, MEMBERSHIP_PLANS } from '../context/MembershipContext';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { StepsIcon, CaloriesIcon, WorkoutIcon, DurationIcon, RunningIcon, WalkingIcon, CyclingIcon } from '../components/Icons';
import FitnessLogo from '../components/FitnessLogo';

export default function Dashboard() {
  const { activities, goals, getTodayStats, getWeekStats } = useContext(ActivityContext);
  const { membership, isActive } = useContext(MembershipContext);
  
  const todayStats = getTodayStats();
  const weekStats = getWeekStats();

  // Calculate progress percentages
  const stepsProgress = goals.dailySteps > 0 
    ? Math.min((todayStats.steps / goals.dailySteps) * 100, 100) 
    : 0;
  const caloriesProgress = goals.dailyCalories > 0 
    ? Math.min((todayStats.calories / goals.dailyCalories) * 100, 100) 
    : 0;
  const workoutProgress = goals.weeklyWorkouts > 0 
    ? Math.min((weekStats.workouts / goals.weeklyWorkouts) * 100, 100) 
    : 0;

  // Prepare data for last 7 days chart
  const getLast7DaysData = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      const dayActivities = activities.filter(a => 
        new Date(a.date).toDateString() === dateString
      );
      
      days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dateString,
        steps: dayActivities.reduce((sum, a) => sum + (a.steps || 0), 0),
        calories: dayActivities.reduce((sum, a) => sum + (a.calories || 0), 0),
        workouts: dayActivities.filter(a => a.type === 'workout').length
      });
    }
    return days;
  };

  const chartData = getLast7DaysData();

  // Get recent activities
  const recentActivities = [...activities]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };


  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Membership Status Banner */}
        {isActive ? (
          <div className="mb-8 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 rounded-2xl shadow-2xl shadow-orange-500/50 p-6 text-white border border-orange-500/50 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="text-4xl">{MEMBERSHIP_PLANS[membership.tier]?.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">{MEMBERSHIP_PLANS[membership.tier]?.name} Member</h2>
                  <p className="text-orange-100">
                    Member since {formatDate(membership.joinDate)} • Expires {formatDate(membership.expiryDate)}
                  </p>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                <p className="text-sm text-white font-semibold">Active Membership</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-gradient-to-r from-orange-500 via-red-600 to-orange-500 rounded-2xl shadow-2xl shadow-orange-500/50 p-6 text-white border border-orange-500/50 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold mb-1">Join FitFlex Today!</h2>
                <p className="text-orange-100">Unlock exclusive features and start your fitness journey</p>
              </div>
              <Link
                to="/membership"
                className="bg-white text-orange-600 font-bold px-6 py-3 rounded-lg hover:bg-orange-50 transition-all shadow-lg transform hover:scale-105"
              >
                View Plans
              </Link>
            </div>
          </div>
        )}

        <div className="mb-8 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-orange-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-400 text-lg">Track your fitness journey and progress</p>
        </div>

        {/* Today's Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 text-white shadow-2xl border border-blue-500/50 hover:scale-105 transition-transform animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <StepsIcon />
              <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">Today</span>
            </div>
            <p className="text-4xl font-bold mb-2">{todayStats.steps.toLocaleString()}</p>
            <p className="text-sm opacity-90 mb-4">Steps</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 shadow-lg"
                style={{ width: `${stepsProgress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 opacity-90">
              {stepsProgress.toFixed(0)}% of {goals.dailySteps?.toLocaleString()} goal
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 via-red-600 to-orange-700 rounded-2xl p-6 text-white shadow-2xl border border-orange-500/50 hover:scale-105 transition-transform animate-fade-in delay-100">
            <div className="flex items-center justify-between mb-4">
              <CaloriesIcon />
              <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">Today</span>
            </div>
            <p className="text-4xl font-bold mb-2">{todayStats.calories}</p>
            <p className="text-sm opacity-90 mb-4">Calories</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 shadow-lg"
                style={{ width: `${caloriesProgress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 opacity-90">
              {caloriesProgress.toFixed(0)}% of {goals.dailyCalories} goal
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 rounded-2xl p-6 text-white shadow-2xl border border-purple-500/50 hover:scale-105 transition-transform animate-fade-in delay-200">
            <div className="flex items-center justify-between mb-4">
              <WorkoutIcon />
              <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">This Week</span>
            </div>
            <p className="text-4xl font-bold mb-2">{weekStats.workouts}</p>
            <p className="text-sm opacity-90 mb-4">Workouts</p>
            <div className="mt-3 bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-500 shadow-lg"
                style={{ width: `${workoutProgress}%` }}
              ></div>
            </div>
            <p className="text-xs mt-2 opacity-90">
              {workoutProgress.toFixed(0)}% of {goals.weeklyWorkouts} goal
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 rounded-2xl p-6 text-white shadow-2xl border border-green-500/50 hover:scale-105 transition-transform animate-fade-in delay-300">
            <div className="flex items-center justify-between mb-4">
              <DurationIcon />
              <span className="text-sm opacity-90 bg-white/20 px-3 py-1 rounded-full">Today</span>
            </div>
            <p className="text-4xl font-bold mb-2">{todayStats.workoutDuration}</p>
            <p className="text-sm opacity-90 mb-4">Minutes</p>
            <p className="text-xs mt-3 opacity-90">
              Total workout time
            </p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-6 border border-gray-800 animate-slide-up">
            <h2 className="text-2xl font-bold text-white mb-6">Last 7 Days - Steps & Calories</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis yAxisId="left" stroke="#9CA3AF" />
                <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="steps" 
                  stroke="#60A5FA" 
                  strokeWidth={3}
                  name="Steps"
                  dot={{ fill: '#60A5FA', r: 4 }}
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="calories" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  name="Calories"
                  dot={{ fill: '#F97316', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-6 border border-gray-800 animate-slide-up delay-100">
            <h2 className="text-2xl font-bold text-white mb-6">Last 7 Days - Workouts</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                />
                <Legend wrapperStyle={{ color: '#9CA3AF' }} />
                <Bar dataKey="workouts" fill="#A855F7" radius={[8, 8, 0, 0]} name="Workouts" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-800 animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
            Explore Our Facilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { id: 1, title: 'Weight Training', Icon: WorkoutIcon, color: 'from-blue-600 to-blue-800', iconColor: 'text-blue-300', bgGradient: 'from-blue-900/30 via-blue-800/20 to-black' },
              { id: 2, title: 'Cardio Zone', Icon: RunningIcon, color: 'from-red-600 to-red-800', iconColor: 'text-red-300', bgGradient: 'from-red-900/30 via-red-800/20 to-black' },
              { id: 3, title: 'Yoga Studio', Icon: DurationIcon, color: 'from-purple-600 to-purple-800', iconColor: 'text-purple-300', bgGradient: 'from-purple-900/30 via-purple-800/20 to-black' },
              { id: 4, title: 'Group Classes', Icon: CaloriesIcon, color: 'from-green-600 to-green-800', iconColor: 'text-green-300', bgGradient: 'from-green-900/30 via-green-800/20 to-black' },
              { id: 5, title: 'Personal Training', Icon: WorkoutIcon, color: 'from-orange-600 to-orange-800', iconColor: 'text-orange-300', bgGradient: 'from-orange-900/30 via-orange-800/20 to-black' },
              { id: 6, title: 'Recovery Area', Icon: StepsIcon, color: 'from-pink-600 to-pink-800', iconColor: 'text-pink-300', bgGradient: 'from-pink-900/30 via-pink-800/20 to-black' },
            ].map((item, index) => {
              const IconComponent = item.Icon;
              return (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden bg-gradient-to-br ${item.color} rounded-xl p-6 text-white shadow-xl hover:scale-110 transition-all cursor-pointer border border-white/20 hover:border-white/40 animate-fade-in`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Background Logo with low opacity */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGradient} opacity-30 group-hover:opacity-50 transition-opacity duration-500`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="scale-125 opacity-30">
                        <FitnessLogo showText={false} size="small" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="flex justify-center mb-3">
                      <IconComponent className="w-10 h-10" color={item.iconColor} />
                    </div>
                    <h3 className="text-sm font-semibold text-center">{item.title}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* How to Increase Goals Guide */}
        <div className="mb-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-800 animate-slide-up">
          <h2 className="text-3xl font-bold text-white mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
            How to Check & Increase Your Goals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 p-6 rounded-xl border border-blue-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <StepsIcon />
                Check Your Steps & Calories
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>View your current progress in the stats cards above</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Check the progress bars to see percentage completion</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>View detailed charts for last 7 days trends</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Go to <Link to="/goals" className="text-orange-400 hover:text-orange-300 underline">Goals</Link> page to see all metrics</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-orange-900/50 to-red-800/50 p-6 rounded-xl border border-orange-700/50">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <CaloriesIcon />
                How to Increase Steps & Calories
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Log activities by clicking <Link to="/add" className="text-orange-400 hover:text-orange-300 underline">Add Activity</Link></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Track workouts, walking, running with steps and calories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Increase daily activities: take stairs, park farther, walk more</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 mt-1">•</span>
                  <span>Set higher goals in the <Link to="/goals" className="text-orange-400 hover:text-orange-300 underline">Goals</Link> page</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl shadow-2xl p-8 border border-gray-800 animate-slide-up">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Activities</h2>
            <Link 
              to="/history"
              className="text-orange-400 hover:text-orange-300 font-medium text-sm transition-colors"
            >
              View All →
            </Link>
          </div>
          {recentActivities.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4 text-lg">No activities recorded yet</p>
              <Link
                to="/add"
                className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Add Your First Activity
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-gray-700 hover:border-orange-500/50 hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-600 rounded-lg flex items-center justify-center">
                        {activity.type === 'workout' ? <WorkoutIcon className="w-6 h-6" color="text-white" /> : 
                         activity.type === 'steps' || activity.type === 'walking' ? <WalkingIcon className="w-6 h-6" color="text-white" /> : 
                         activity.type === 'running' ? <RunningIcon className="w-6 h-6" color="text-white" /> : 
                         activity.type === 'cycling' ? <CyclingIcon className="w-6 h-6" color="text-white" /> : <WorkoutIcon className="w-6 h-6" color="text-white" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{activity.name}</h3>
                        <p className="text-sm text-gray-400">
                          {new Date(activity.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      {activity.steps > 0 && (
                        <div className="flex items-center gap-2">
                          <StepsIcon />
                          <span className="text-gray-300">{activity.steps.toLocaleString()}</span>
                        </div>
                      )}
                      {activity.calories > 0 && (
                        <div className="flex items-center gap-2">
                          <CaloriesIcon />
                          <span className="text-orange-400">{activity.calories}</span>
                        </div>
                      )}
                      {activity.duration > 0 && (
                        <div className="flex items-center gap-2">
                          <DurationIcon />
                          <span className="text-green-400">{activity.duration}m</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
