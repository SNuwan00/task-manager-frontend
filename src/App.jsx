import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import { authService } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status on component mount
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    
    checkAuth();
    
    // Listen for storage events (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);
  
  // Protected route component
  const ProtectedRoute = ({ children }) => {
    if (isLoading) {
      return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    
    return children;
  };
  
  // Public route - redirects to dashboard if already authenticated
  const PublicRoute = ({ children }) => {
    if (isLoading) {
      return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    }
    
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
    
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        {/* Only show Navbar when authenticated */}
        {isAuthenticated && <Navbar />}
        
        {/* Adjust padding when no navbar is shown */}
        <main className={`container mx-auto ${isAuthenticated ? 'p-6' : 'p-0'}`}>
          <Routes>
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/edit" 
              element={
                <ProtectedRoute>
                  <ProfileEditPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <TaskPage />
                </ProtectedRoute>
              } 
            />
            
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <LoginPage />
                </PublicRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <PublicRoute>
                  <SignupPage />
                </PublicRoute>
              } 
            />
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
