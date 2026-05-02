import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import RoomExplorerPage from './pages/RoomExplorerPage';
import RoomDetailPage from './pages/RoomDetailPage';
import RoomManagementPage from './pages/RoomManagementPage';
import MyBookingsPage from './pages/MyBookingsPage';
import NewBookingPage from './pages/NewBookingPage';
import AdminManagementPage from './pages/AdminManagementPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import CalendarPage from './pages/CalendarPage';

// A wrapper for protected routes
function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-surface"><p className="text-slate-500 font-medium">Loading session...</p></div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

// A wrapper to redirect logged-in users away from auth pages
function AuthRoute({ children }) {
  const { user, loading } = useAuth();
  
  if (loading) return null; // or loading spinner
  
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          <Route path="/signup" element={<AuthRoute><SignUpPage /></AuthRoute>} />
          
          {/* Protected User Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/rooms" element={<ProtectedRoute><RoomExplorerPage /></ProtectedRoute>} />
          <Route path="/rooms/:id" element={<ProtectedRoute><RoomDetailPage /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />
          <Route path="/bookings/new" element={<ProtectedRoute><NewBookingPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

          {/* Protected Admin Routes */}
          <Route path="/rooms/manage" element={<ProtectedRoute requireAdmin><RoomManagementPage /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><AdminManagementPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute requireAdmin><ReportsPage /></ProtectedRoute>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;
