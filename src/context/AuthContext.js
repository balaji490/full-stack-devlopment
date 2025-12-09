import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

const API_URL = 'http://localhost:3001';
const STORAGE_KEY = 'fitflex_current_user';

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(true);

  // Load users from JSON server on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${API_URL}/users`);
        if (response.ok) {
          const usersData = await response.json();
          setUsers(usersData);
        } else {
          // If server error, load from localStorage fallback
          const fallbackUsers = JSON.parse(localStorage.getItem('fitflex_users_fallback') || '[]');
          if (fallbackUsers.length > 0) {
            setUsers(fallbackUsers);
          }
        }
      } catch (error) {
        console.warn('JSON server not available, using localStorage fallback:', error);
        // Load from localStorage fallback if server is not running
        const fallbackUsers = JSON.parse(localStorage.getItem('fitflex_users_fallback') || '[]');
        if (fallbackUsers.length > 0) {
          setUsers(fallbackUsers);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    try {
      // First check users from state (JSON server)
      let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      // If not found, check localStorage fallback
      if (!user) {
        const fallbackUsers = JSON.parse(localStorage.getItem('fitflex_users_fallback') || '[]');
        user = fallbackUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      }
      
      if (user && user.password === password) {
        const userSession = {
          id: user.id,
          email: user.email,
          name: user.name,
          loginTime: new Date().toISOString()
        };
        setCurrentUser(userSession);
        return { success: true, user: userSession };
      }
      return { success: false, error: 'Invalid Email or Password' };
    } catch (error) {
      console.error('Error during login:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Fallback registration to localStorage
  const registerToLocalStorage = async (name, email, password) => {
    try {
      const fallbackUsers = JSON.parse(localStorage.getItem('fitflex_users_fallback') || '[]');
      const emailExists = fallbackUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (emailExists) {
        return { success: false, error: 'Email already registered. Please login instead.' };
      }
      
      const maxId = fallbackUsers.length > 0 
        ? Math.max(...fallbackUsers.map(u => u.id || 0)) 
        : 0;
      const newId = maxId + 1;
      const fallbackUser = {
        id: newId,
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
      };
      
      fallbackUsers.push(fallbackUser);
      localStorage.setItem('fitflex_users_fallback', JSON.stringify(fallbackUsers));
      setUsers(prev => [...prev, fallbackUser]);
      
      // Auto-login after registration
      const userSession = {
        id: fallbackUser.id,
        email: fallbackUser.email,
        name: fallbackUser.name,
        loginTime: new Date().toISOString()
      };
      setCurrentUser(userSession);
      
      return { success: true, user: userSession };
    } catch (error) {
      console.error('Error in localStorage fallback:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    }
  };

  const register = async (name, email, password) => {
    try {
      // Check if email already exists in current users list or localStorage fallback
      const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (existingUser) {
        return { success: false, error: 'Email already registered. Please login instead.' };
      }
      
      // Also check localStorage fallback
      const fallbackUsers = JSON.parse(localStorage.getItem('fitflex_users_fallback') || '[]');
      const emailExistsInFallback = fallbackUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExistsInFallback) {
        return { success: false, error: 'Email already registered. Please login instead.' };
      }
      
      // Create new user
      const newUser = {
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: password
      };
      
      try {
        const response = await fetch(`${API_URL}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
        
        if (response.ok) {
          const createdUser = await response.json();
          setUsers(prev => [...prev, createdUser]);
          
          // Auto-login after registration
          const userSession = {
            id: createdUser.id,
            email: createdUser.email,
            name: createdUser.name,
            loginTime: new Date().toISOString()
          };
          setCurrentUser(userSession);
          
          return { success: true, user: userSession };
        } else {
          // If server returns error, try to get error message
          let errorMessage = `Registration failed (${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // If can't parse error, use default message
          }
          
          // If server error, try localStorage fallback
          console.warn('JSON server returned error, trying localStorage fallback');
          return await registerToLocalStorage(name, email, password);
        }
      } catch (fetchError) {
        // If fetch fails (server not running), use localStorage fallback
        console.warn('JSON server not available, using localStorage fallback:', fetchError);
        return await registerToLocalStorage(name, email, password);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      return { success: false, error: `Registration failed: ${error.message}` };
    }
  };

  const getUserData = (userId) => {
    // This is now handled by ActivityContext and MembershipContext per user
    return {
      activities: [],
      goals: {
        dailySteps: 10000,
        dailyCalories: 2000,
        weeklyWorkouts: 5,
        dailyWorkoutDuration: 60
      },
      membership: { tier: 'none', joinDate: null, expiryDate: null },
      payments: []
    };
  };

  const saveUserData = (userId, data) => {
    // This is now handled by ActivityContext and MembershipContext per user
    console.log('User data saved for user:', userId);
  };

  const isAuthenticated = !!currentUser;

  const value = {
    currentUser,
    users,
    login,
    logout,
    register,
    getUserData,
    saveUserData,
    isAuthenticated
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};


