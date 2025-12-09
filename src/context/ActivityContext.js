import React, { createContext, useState, useEffect } from 'react';

export const ActivityContext = createContext();

const API_URL = 'http://localhost:3001';

const STORAGE_KEYS = {
  ACTIVITIES: 'fitflex_activities',
  GOALS: 'fitflex_goals'
};

export function ActivityProvider({ children }) {
  const [activities, setActivities] = useState(() => {
    // Try to load from localStorage first (fallback)
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITIES);
    return saved ? JSON.parse(saved) : [];
  });
  const [goals, setGoals] = useState(() => {
    // Try to load from localStorage first (fallback)
    const saved = localStorage.getItem(STORAGE_KEYS.GOALS);
    return saved ? JSON.parse(saved) : {
      dailySteps: 10000,
      dailyCalories: 2000,
      weeklyWorkouts: 5,
      dailyWorkoutDuration: 60
    };
  });
  const [loading, setLoading] = useState(true);

  // Load activities and goals from JSON server on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesRes, goalsRes] = await Promise.all([
          fetch(`${API_URL}/activities`),
          fetch(`${API_URL}/goals/1`)
        ]);
        
        if (activitiesRes.ok) {
          const activitiesData = await activitiesRes.json();
          if (Array.isArray(activitiesData)) {
            // Merge with localStorage data (localStorage might have newer data)
            const localActivities = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITIES) || '[]');
            // Combine and deduplicate by ID
            const combined = [...activitiesData, ...localActivities];
            const unique = combined.filter((activity, index, self) => 
              index === self.findIndex(a => a.id === activity.id)
            );
            // Sort by date (newest first)
            unique.sort((a, b) => new Date(b.date) - new Date(a.date));
            setActivities(unique);
            localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(unique));
          }
        }
        
        if (goalsRes.ok) {
          const goalsData = await goalsRes.json();
          setGoals(goalsData);
          localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goalsData));
        }
      } catch (error) {
        console.warn('JSON server not available, using localStorage:', error);
        // Already loaded from localStorage in useState
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Save to localStorage whenever activities change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(activities));
  }, [activities]);

  // Save to localStorage whenever goals change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
  }, [goals]);

  const addActivity = async (activity) => {
    // Ensure all required fields are present
    const newActivity = {
      type: activity.type || 'workout',
      name: activity.name || 'Activity',
      description: activity.description || '',
      date: activity.date || new Date().toISOString(),
      duration: activity.duration ? parseInt(activity.duration) : 0,
      calories: activity.calories ? parseInt(activity.calories) : 0,
      steps: activity.steps ? parseInt(activity.steps) : 0
    };
    
    console.log('Adding activity:', newActivity);
    
    try {
      const response = await fetch(`${API_URL}/activities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newActivity),
      });
      
      if (response.ok) {
        const createdActivity = await response.json();
        console.log('Activity created on server:', createdActivity);
        setActivities(prev => {
          const updated = [...prev, createdActivity];
          localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
          console.log('Activities updated, total:', updated.length);
          return updated;
        });
        return createdActivity;
      } else {
        // Server error, use fallback
        const errorText = await response.text();
        console.warn('Server error:', response.status, errorText);
        throw new Error('Server error');
      }
    } catch (error) {
      console.warn('JSON server not available, using localStorage fallback:', error);
      // Fallback: add to local state and localStorage
      const fallbackActivity = {
        id: Date.now(),
        ...newActivity
      };
      console.log('Adding activity to localStorage:', fallbackActivity);
      setActivities(prev => {
        const updated = [...prev, fallbackActivity];
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
        console.log('Activities updated (localStorage), total:', updated.length);
        return updated;
      });
      return fallbackActivity;
    }
  };

  const updateActivity = async (id, updates) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const updatedActivity = await response.json();
        setActivities(prev => {
          const updated = prev.map(a => a.id === id ? updatedActivity : a);
          localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
          return updated;
        });
        return updatedActivity;
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.warn('JSON server not available, using localStorage fallback:', error);
      // Fallback: update local state and localStorage
      setActivities(prev => {
        const updated = prev.map(a => a.id === id ? { ...a, ...updates } : a);
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const removeActivity = async (id) => {
    try {
      const response = await fetch(`${API_URL}/activities/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setActivities(prev => {
          const updated = prev.filter(a => a.id !== id);
          localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
          return updated;
        });
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.warn('JSON server not available, using localStorage fallback:', error);
      // Fallback: remove from local state and localStorage
      setActivities(prev => {
        const updated = prev.filter(a => a.id !== id);
        localStorage.setItem(STORAGE_KEYS.ACTIVITIES, JSON.stringify(updated));
        return updated;
      });
    }
  };

  const updateGoals = async (newGoals) => {
    try {
      const response = await fetch(`${API_URL}/goals/1`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoals),
      });
      
      if (response.ok) {
        const updatedGoals = await response.json();
        setGoals(updatedGoals);
        localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.warn('JSON server not available, using localStorage fallback:', error);
      // Fallback: update local state and localStorage
      const updatedGoals = { ...goals, ...newGoals };
      setGoals(updatedGoals);
      localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(updatedGoals));
    }
  };

  // Helper functions for statistics
  const getTodayStats = () => {
    const today = new Date().toDateString();
    const todayActivities = activities.filter(a => 
      new Date(a.date).toDateString() === today
    );

    return {
      steps: todayActivities.reduce((sum, a) => sum + (a.steps || 0), 0),
      calories: todayActivities.reduce((sum, a) => sum + (a.calories || 0), 0),
      workouts: todayActivities.filter(a => a.type === 'workout').length,
      workoutDuration: todayActivities
        .filter(a => a.type === 'workout')
        .reduce((sum, a) => sum + (a.duration || 0), 0)
    };
  };

  const getWeekStats = () => {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const weekActivities = activities.filter(a => 
      new Date(a.date) >= weekAgo
    );

    return {
      steps: weekActivities.reduce((sum, a) => sum + (a.steps || 0), 0),
      calories: weekActivities.reduce((sum, a) => sum + (a.calories || 0), 0),
      workouts: weekActivities.filter(a => a.type === 'workout').length,
      workoutDuration: weekActivities
        .filter(a => a.type === 'workout')
        .reduce((sum, a) => sum + (a.duration || 0), 0)
    };
  };

  const getActivitiesByDate = (date) => {
    const dateString = new Date(date).toDateString();
    return activities.filter(a => 
      new Date(a.date).toDateString() === dateString
    );
  };

  const value = {
    activities,
    goals,
    addActivity,
    updateActivity,
    removeActivity,
    updateGoals,
    getTodayStats,
    getWeekStats,
    getActivitiesByDate
  };

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}
