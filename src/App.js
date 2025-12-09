import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ActivityProvider } from './context/ActivityContext';
import { MembershipProvider } from './context/MembershipContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Membership from './pages/Membership';
import AddActivity from './pages/AddActivity';
import EditActivity from './pages/EditActivity';
import History from './pages/History';
import Goals from './pages/Goals';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <ActivityProvider>
        <MembershipProvider>
          <Router>
            <div className="App min-h-screen bg-gray-50">
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/membership" element={<Membership />} />
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/add" 
                    element={
                      <ProtectedRoute>
                        <AddActivity />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/edit/:id" 
                    element={
                      <ProtectedRoute>
                        <EditActivity />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/history" 
                    element={
                      <ProtectedRoute>
                        <History />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/goals" 
                    element={
                      <ProtectedRoute>
                        <Goals />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Layout>
            </div>
          </Router>
        </MembershipProvider>
      </ActivityProvider>
    </AuthProvider>
  );
}

export default App;
