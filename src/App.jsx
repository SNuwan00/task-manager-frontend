import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskPage from './pages/TaskPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProfileEditPage from './pages/ProfileEditPage';
import { authService } from './services/api';

// Component to conditionally render Navbar
function NavbarWrapper() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) {
    return null;
  }
  
  return <Navbar />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const checkAuthStatus = () => {
    const authStatus = authService.isAuthenticated();
    setIsAuthenticated(authStatus);
    setIsLoading(false);
  };
  
  useEffect(() => {
    // Check auth on initial load
    checkAuthStatus();
    
    // Setup listener for auth changes
    const handleAuthChange = () => {
      checkAuthStatus();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'isLoggedIn' || e.key === 'token') {
        checkAuthStatus();
      }
    });
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);
  
  // Loading screen while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <NavbarWrapper />
        
        <main className="container mx-auto p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            } />
            
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
            } />
            
            {/* Protected Routes */}
            <Route path="/" element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            
            <Route path="/tasks" element={
              isAuthenticated ? <TaskPage /> : <Navigate to="/login" replace />
            } />
            
            <Route path="/profile" element={
              isAuthenticated ? <ProfilePage /> : <Navigate to="/login" replace />
            } />
            
            <Route path="/profile/edit" element={
              isAuthenticated ? <ProfileEditPage /> : <Navigate to="/login" replace />
            } />
            
            {/* Catch all route - redirect to login or dashboard based on auth */}
            <Route path="*" element={
              <Navigate to={isAuthenticated ? "/" : "/login"} replace />
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;