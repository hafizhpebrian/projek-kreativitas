import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../lib/api';
import { useTranslation } from 'react-i18next';

export default function TopRightNav() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadNotifications() {
      try {
        const res = await fetchApi('/dashboard/upcoming');
        if (res.ok) {
          const data = await res.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Failed to load notifications', error);
      }
    }
    if (user) {
      loadNotifications();
    }
  }, [user]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-6 relative" ref={dropdownRef}>
      {/* Theme Toggle */}
      <button 
        onClick={() => {
          const isDark = document.documentElement.classList.toggle('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }}
        className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <span className="material-symbols-outlined dark:hidden">dark_mode</span>
        <span className="material-symbols-outlined hidden dark:block">light_mode</span>
      </button>

      {/* Notification Bell */}
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <span className="material-symbols-outlined">notifications</span>
        {notifications.length > 0 && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-white dark:border-slate-900"></span>
        )}
      </button>

      {/* Notifications Dropdown */}
      {showNotifications && (
        <div className="absolute top-full right-16 mt-2 w-80 bg-surface-container-lowest border border-surface-container-high rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-lowest">
            <h4 className="font-bold text-on-surface">{t('topNav.notifications')}</h4>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {notifications.length} {t('topNav.new')}
            </span>
          </div>
          <div className="max-h-80 overflow-y-auto no-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-on-surface-variant text-sm">
                {t('topNav.noNotifications')}
              </div>
            ) : (
              <div className="flex flex-col">
                {notifications.map(booking => (
                  <div key={booking.id} className="p-4 border-b border-surface-container hover:bg-surface-container-lowest/50 transition-colors cursor-pointer" onClick={() => {
                    setShowNotifications(false);
                    navigate('/my-bookings');
                  }}>
                    <p className="text-sm font-bold text-on-surface mb-1">{t('topNav.upcomingMeeting')}</p>
                    <p className="text-xs text-on-surface-variant line-clamp-2">
                      {t('topNav.confirmedBookingAt')} <strong>{booking.room?.name}</strong> {t('topNav.on')} {booking.date} {t('topNav.at')} {booking.startTime}.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {notifications.length > 0 && (
            <div 
              className="p-3 text-center border-t border-surface-container-high text-xs font-bold text-primary cursor-pointer hover:bg-surface-container-low transition-colors"
              onClick={() => {
                setShowNotifications(false);
                navigate('/my-bookings');
              }}
            >
              {t('topNav.viewAllBookings')}
            </div>
          )}
        </div>
      )}

      {/* User Info & Avatar */}
      <div className="flex items-center gap-3 pl-6 border-l border-slate-200 dark:border-slate-800">
        <div className="text-right">
          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user?.name || 'User'}</p>
          <p className="text-[11px] text-slate-500 font-medium capitalize">{user?.role || 'Member'}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#000a1f] text-white flex items-center justify-center text-sm font-bold shadow-sm">
          {user?.name?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    </div>
  );
}
