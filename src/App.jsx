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

// NavbarWrapper component that conditionally renders the navbar
function NavbarWrapper() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) {
    return null; // Don't show navbar on login/signup pages
  }
  
  return <Navbar />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check authentication status on initial load
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
      setIsLoading(false);
    };
    
    // Check auth immediately when app loads
    checkAuth();
    
    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth();
    };
    
    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', (e) => {
      if (e.key === 'isLoggedIn' || e.key === 'token' || e.key === 'userId') {
        checkAuth();
      }
    });
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);
  
  // Show loading indicator while checking auth
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
            {/* Root path redirects based on auth status */}
            <Route path="/" element={
              isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />
            } />
            
            {/* Public Routes */}
            <Route path="/login" element={
              isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
            } />
            
            <Route path="/signup" element={
              isAuthenticated ? <Navigate to="/" replace /> : <SignupPage />
            } />
            
            {/* Protected Routes */}
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