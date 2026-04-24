import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/rooms" element={<RoomExplorerPage />} />
        <Route path="/rooms/manage" element={<RoomManagementPage />} />
        <Route path="/rooms/:id" element={<RoomDetailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/bookings" element={<MyBookingsPage />} />
        <Route path="/bookings/new" element={<NewBookingPage />} />
        <Route path="/admin" element={<AdminManagementPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        {/* Redirect any unknown route or root to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App;
