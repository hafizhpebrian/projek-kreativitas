import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const getNavLinkClass = (path) => {
    // Exact or starts with path
    const isActive = path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(path);
    
    if (isActive) {
      return "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-900 dark:text-white font-bold border-r-4 border-slate-900 dark:border-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left bg-slate-50 dark:bg-slate-800/30";
    }
    return "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left";
  };

  const getIconFill = (path) => {
    const isActive = path === '/dashboard' ? location.pathname === '/dashboard' : location.pathname.startsWith(path);
    return isActive ? { fontVariationSettings: "'FILL' 1" } : { fontVariationSettings: "'FILL' 0" };
  }

  const handleNavigate = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] bg-white dark:bg-slate-800 p-2.5 rounded-xl shadow-lg text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[45] transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <aside className={`h-screen w-64 fixed left-0 top-0 border-r border-slate-100 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="mb-10 px-4 mt-8 lg:mt-0">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="space-y-2 flex-grow overflow-y-auto pr-2 pb-4">
          <button onClick={() => handleNavigate('/dashboard')} className={getNavLinkClass('/dashboard')}>
            <span className="material-symbols-outlined" style={getIconFill('/dashboard')}>dashboard</span>
            <span className="text-sm">Dashboard</span>
          </button>
          <button onClick={() => handleNavigate('/rooms')} className={getNavLinkClass('/rooms')}>
            <span className="material-symbols-outlined" style={getIconFill('/rooms')}>meeting_room</span>
            <span className="text-sm">Rooms</span>
          </button>
          <button onClick={() => handleNavigate('/calendar')} className={getNavLinkClass('/calendar')}>
            <span className="material-symbols-outlined" style={getIconFill('/calendar')}>calendar_month</span>
            <span className="text-sm">Calendar</span>
          </button>
          <button onClick={() => handleNavigate('/bookings')} className={getNavLinkClass('/bookings')}>
            <span className="material-symbols-outlined" style={getIconFill('/bookings')}>bookmark_check</span>
            <span className="text-sm">My Bookings</span>
          </button>
          {user?.role === 'admin' && (
            <>
              <button onClick={() => handleNavigate('/admin')} className={getNavLinkClass('/admin')}>
                <span className="material-symbols-outlined" style={getIconFill('/admin')}>admin_panel_settings</span>
                <span className="text-sm">Admin Management</span>
              </button>
              <button onClick={() => handleNavigate('/reports')} className={getNavLinkClass('/reports')}>
                <span className="material-symbols-outlined" style={getIconFill('/reports')}>bar_chart</span>
                <span className="text-sm">Reports</span>
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => handleNavigate('/settings')} className={getNavLinkClass('/settings')}>
            <span className="material-symbols-outlined" style={getIconFill('/settings')}>settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={() => { setIsOpen(false); logout(); navigate('/login'); }} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-error font-medium hover:bg-error/10">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
