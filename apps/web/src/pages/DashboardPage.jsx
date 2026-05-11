import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi, API_BASE } from '../lib/api';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ totalRooms: 0, availableNow: 0, todayBookings: 0 });
  const [upcoming, setUpcoming] = useState([]);
  const [popularRooms, setPopularRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    async function loadDashboardData() {
      try {
        setLoading(true);
        const [statsRes, upcomingRes, popularRes] = await Promise.all([
          fetchApi('/dashboard/stats'),
          fetchApi('/dashboard/upcoming'),
          fetchApi('/dashboard/popular-rooms')
        ]);

        if (statsRes.ok) setStats(await statsRes.json());
        if (upcomingRes.ok) setUpcoming(await upcomingRes.json());
        if (popularRes.ok) setPopularRooms(await popularRes.json());
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const [calendarDate, setCalendarDate] = useState(new Date());

  const today = new Date();
  const calYear = calendarDate.getFullYear();
  const calMonth = calendarDate.getMonth();

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayLabels = ['S','M','T','W','T','F','S'];

  // First day of month (0=Sun) and total days
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(calYear, calMonth, 0).getDate();

  // Build calendar cells
  const calendarCells = [];
  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    calendarCells.push({ day: daysInPrevMonth - i, current: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarCells.push({ day: d, current: true });
  }
  // Next month leading days to fill remaining row
  const remaining = 7 - (calendarCells.length % 7);
  if (remaining < 7) {
    for (let i = 1; i <= remaining; i++) {
      calendarCells.push({ day: i, current: false });
    }
  }

  const isToday = (day) =>
    day === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear();

  const prevMonth = () => setCalendarDate(new Date(calYear, calMonth - 1, 1));
  const nextMonth = () => setCalendarDate(new Date(calYear, calMonth + 1, 1));

  const formatTime = (timeStr) => {
    if (!timeStr) return '';
    return new Date(`1970-01-01T${timeStr}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDayAndMonth = (dateStr) => {
    if (!dateStr) return { day: '', month: '' };
    const date = new Date(dateStr);
    return {
      day: date.getDate(),
      month: date.toLocaleString('default', { month: 'short' })
    };
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-y-auto">
      {/* SideNavBar Anchor */}
      <Sidebar />

      {/* TopNavBar Anchor */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8 z-40 transition-shadow focus-within:shadow-lg">
        <div className="flex items-center bg-surface-container rounded-full px-4 py-1.5 w-96">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-['Inter'] outline-none" placeholder={t('dashboard.searchPlaceholder')} type="text" />
        </div>
        <TopRightNav />
      </header>

      {/* Main Content Canvas */}
      <main className="ml-0 lg:ml-64 pt-16 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Welcome Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary mb-2">{t('dashboard.welcomeBack')} {user?.name?.split(' ')[0] || 'User'}</h2>
            <p className="text-on-surface-variant font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">event</span>
              {today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Stats Row */}
          {loading ? (
             <div className="animate-pulse flex gap-6 mb-12">
                {[1,2,3].map(i => <div key={i} className="h-24 bg-surface-container-highest rounded-xl flex-1"></div>)}
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
                <div className="w-14 h-14 bg-primary-container rounded-xl flex items-center justify-center text-white">
                  <span className="material-symbols-outlined text-3xl">domain</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.totalRooms')}</p>
                  <h3 className="text-3xl font-extrabold text-primary">{stats.totalRooms || 0}</h3>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
                <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center text-tertiary-fixed">
                  <span className="material-symbols-outlined text-3xl">event_available</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.activeRooms')}</p>
                  <h3 className="text-3xl font-extrabold text-primary">{stats.availableNow || 0}</h3>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
                <div className="w-14 h-14 bg-secondary-container rounded-xl flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-3xl">book_online</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">{t('dashboard.todaysBookings')}</p>
                  <h3 className="text-3xl font-extrabold text-primary">{stats.todayBookings || 0}</h3>
                </div>
              </div>
            </div>
          )}

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Upcoming Bookings (Wide) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-primary">{t('dashboard.yourUpcoming')}</h4>
                <button onClick={() => navigate('/bookings')} className="text-sm font-semibold text-secondary hover:underline">{t('dashboard.viewAll')}</button>
              </div>

              {/* Booking Cards */}
              <div className="space-y-4">
               {loading ? (
                    <p className="text-slate-500 animate-pulse">{t('dashboard.loadingBookings')}</p>
                ) : upcoming.length === 0 ? (
                   <div className="bg-surface-container-lowest p-8 rounded-xl border border-dashed border-slate-200 text-center">
                     <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">event_busy</span>
                      <p className="text-slate-500 font-medium">{t('dashboard.noUpcoming')}</p>
                      <button onClick={() => navigate('/rooms')} className="mt-4 text-primary font-bold hover:underline">{t('dashboard.bookRoom')}</button>
                   </div>
                ) : upcoming.map((booking) => {
                  const roomImage = booking.room?.images?.[0]?.filePath;
                  const dateObj = booking.date ? new Date(booking.date) : null;
                  const dateStr = dateObj ? dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '';
                  const startStr = booking.startTime ? booking.startTime.substring(0, 5) : '';
                  const endStr = booking.endTime ? booking.endTime.substring(0, 5) : '';

                  const statusColors = {
                    confirmed: 'bg-tertiary-container text-tertiary-fixed',
                    pending: 'bg-amber-100 text-amber-700',
                    reserved: 'bg-blue-100 text-blue-700',
                    awaiting_verification: 'bg-purple-100 text-purple-700',
                    waiting_checkout: 'bg-orange-100 text-orange-700',
                    overdue: 'bg-orange-100 text-orange-700',
                    cancelled: 'bg-red-100 text-red-700',
                    completed: 'bg-slate-100 text-slate-500',
                  };

                  return (
                    <div key={booking.id} className="bg-surface-container-lowest rounded-xl shadow-[0_10px_20px_rgba(0,27,60,0.05)] hover:shadow-[0_15px_30px_rgba(0,27,60,0.1)] transition-all overflow-hidden flex group">
                      {/* Room Image */}
                      <div className="w-24 flex-shrink-0 relative overflow-hidden">
                        {roomImage ? (
                          <img
                            alt={booking.room?.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            src={`${API_BASE}/${roomImage.replace(/\\/g, '/')}`}
                          />
                        ) : (
                          <div className="w-full h-full bg-surface-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl text-slate-300">meeting_room</span>
                          </div>
                        )}
                      </div>

                      {/* Booking Info */}
                      <div className="flex-1 px-4 py-3 flex items-center justify-between min-w-0 gap-3">
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-bold text-sm text-primary font-headline tracking-tight truncate">{booking.title}</h5>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase flex-shrink-0 ${statusColors[booking.status] || 'bg-slate-100 text-slate-500'}`}>{booking.status?.replace('_', ' ')}</span>
                          </div>
                          <div className="flex items-center gap-3 text-xs text-on-surface-variant flex-wrap">
                            {booking.user && (
                              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">person</span>{booking.user.name}</span>
                            )}
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">meeting_room</span>{booking.room?.name || '—'}</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">schedule</span>{startStr} — {endStr}</span>
                            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">calendar_today</span>{dateObj ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
                            {booking.totalPrice && (
                              <span className="flex items-center gap-1 font-bold text-primary"><span className="material-symbols-outlined text-xs">payments</span>Rp{Number(booking.totalPrice).toLocaleString('id-ID')}</span>
                            )}
                          </div>
                        </div>
                        <button onClick={() => navigate('/bookings')} className="material-symbols-outlined text-lg text-slate-400 hover:text-primary transition-colors flex-shrink-0">chevron_right</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column Widget */}
            <div className="space-y-8">
              {/* Mini Calendar */}
              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                <div className="flex items-center justify-between mb-6">
                  <h5 className="font-bold text-primary">{monthNames[calMonth]} {calYear}</h5>
                  <div className="flex gap-2">
                    <button onClick={prevMonth} className="material-symbols-outlined text-sm hover:text-primary transition-colors">chevron_left</button>
                    <button onClick={nextMonth} className="material-symbols-outlined text-sm hover:text-primary transition-colors">chevron_right</button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold text-on-surface-variant mb-2">
                  {dayLabels.map((d, i) => <span key={i}>{d}</span>)}
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {calendarCells.map((cell, i) => (
                    <span
                      key={i}
                      className={
                        !cell.current
                          ? 'text-outline-variant'
                          : isToday(cell.day)
                            ? 'bg-primary text-white rounded-lg w-7 h-7 flex items-center justify-center mx-auto font-bold'
                            : 'text-on-surface'
                      }
                    >
                      {cell.day}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Book Action */}
              <button onClick={() => navigate('/bookings/new')} className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl shadow-[0_15px_30px_rgba(0,9,27,0.2)] flex items-center justify-center gap-3 font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                Quick Book Room
              </button>
            </div>
          </div>

          {/* Bottom Section: Popular Rooms */}
          <div>
            <h4 className="text-xl font-bold text-primary mb-6">{t('dashboard.popularRooms')}</h4>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
              {loading ? (
                 <div className="flex gap-6">
                    {[1,2,3,4].map(i => <div key={i} className="min-w-[280px] h-64 bg-surface-container-highest rounded-xl animate-pulse"></div>)}
                 </div>
              ) : popularRooms.length === 0 ? (
                 <p className="text-slate-500">No rooms available.</p>
              ) : popularRooms.map(room => (
                <div key={room.id} onClick={() => navigate(`/rooms/${room.id}`)} className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all flex flex-col">
                  <div className="h-32 overflow-hidden bg-slate-100 flex-shrink-0">
                    {room.images && room.images.length > 0 ? (
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={room.name} src={room.images[0].filePath.startsWith('http') ? room.images[0].filePath : `${API_BASE}/${room.images[0].filePath}`} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-4xl">meeting_room</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h6 className="font-bold text-primary truncate max-w-[180px]">{room.name}</h6>
                        <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                          <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> {room.rating ? Number(room.rating).toFixed(1) : 'New'}
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2">{room.description || 'No description available.'}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                        <span className="material-symbols-outlined text-base">groups</span> {room.capacity}
                      </div>
                      <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{room.floor_level || 'General'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Contextual FAB */}
      <div className="fixed bottom-10 right-10 z-50 group flex items-center gap-4">
        <div className="bg-surface-container-highest text-on-surface-variant text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-all pointer-events-none translate-x-4 group-hover:translate-x-0 duration-300">
          Hubungi CS
        </div>
        <button 
          onClick={() => window.location.href = 'mailto:support@si-book.com'}
          className="w-16 h-16 bg-primary text-white rounded-full shadow-[0_20px_40px_rgba(0,9,27,0.3)] flex items-center justify-center hover:scale-110 active:scale-90 transition-all hover:bg-secondary"
        >
          <span className="material-symbols-outlined text-3xl">support_agent</span>
        </button>
      </div>
    </div>
  );
}

