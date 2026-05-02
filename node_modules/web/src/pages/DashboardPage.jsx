import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../lib/api';
import TopRightNav from '../components/TopRightNav';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [stats, setStats] = useState({ totalRooms: 0, availableNow: 0, todayBookings: 0 });
  const [upcoming, setUpcoming] = useState([]);
  const [popularRooms, setPopularRooms] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="space-y-2 flex-grow">
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-900 dark:text-white font-bold border-r-4 border-slate-900 dark:border-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">meeting_room</span>
            <span className="text-sm">Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="text-sm">Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">bookmark_check</span>
            <span className="text-sm">My Bookings</span>
          </button>
          {user?.role === 'admin' && (
            <>
              <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="text-sm">Admin Management</span>
              </button>
              <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
                <span className="material-symbols-outlined">bar_chart</span>
                <span className="text-sm">Reports</span>
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={() => { logout(); navigate('/login'); }} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-error font-medium hover:bg-error/10 text-left">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar Anchor */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-40 transition-shadow focus-within:shadow-lg">
        <div className="flex items-center bg-surface-container rounded-full px-4 py-1.5 w-96">
          <span className="material-symbols-outlined text-on-surface-variant text-lg">search</span>
          <input className="bg-transparent border-none focus:ring-0 text-sm w-full font-['Inter'] outline-none" placeholder="Search for rooms or meetings..." type="text" />
        </div>
        <TopRightNav />
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-16 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Welcome Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary mb-2">Welcome back, {user?.name?.split(' ')[0] || 'User'}</h2>
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
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Rooms</p>
                  <h3 className="text-3xl font-extrabold text-primary">{stats.totalRooms || 0}</h3>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
                <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center text-tertiary-fixed">
                  <span className="material-symbols-outlined text-3xl">event_available</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Available Now</p>
                  <h3 className="text-3xl font-extrabold text-primary">{stats.availableNow || 0}</h3>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
                <div className="w-14 h-14 bg-secondary-container rounded-xl flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-3xl">book_online</span>
                </div>
                <div>
                  <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Today's Bookings</p>
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
                <h4 className="text-xl font-bold text-primary">Your Upcoming Bookings</h4>
                <button onClick={() => navigate('/bookings')} className="text-sm font-semibold text-secondary hover:underline">View All</button>
              </div>

              {/* Booking Cards */}
              <div className="space-y-4">
                {loading ? (
                   <p className="text-slate-500 animate-pulse">Loading upcoming bookings...</p>
                ) : upcoming.length === 0 ? (
                   <div className="bg-surface-container-lowest p-8 rounded-xl border border-dashed border-slate-200 text-center">
                     <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">event_busy</span>
                     <p className="text-slate-500 font-medium">No upcoming bookings found.</p>
                     <button onClick={() => navigate('/rooms')} className="mt-4 text-primary font-bold hover:underline">Book a room</button>
                   </div>
                ) : upcoming.map((booking) => {
                  const { month, day } = getDayAndMonth(booking.booking_date);
                  return (
                    <div key={booking.id} className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center justify-between group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                      <div className="flex items-center gap-5">
                        <div className="bg-surface-container w-12 h-12 rounded-lg flex flex-col items-center justify-center">
                          <span className="text-[10px] font-bold uppercase text-on-surface-variant">{month}</span>
                          <span className="text-lg font-extrabold text-primary">{day}</span>
                        </div>
                        <div>
                          <h5 className="font-bold text-primary">{booking.title}</h5>
                          <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                            <span className="material-symbols-outlined text-[14px]">meeting_room</span> {booking.room?.name || 'Unknown Room'} • {formatTime(booking.start_time)} - {formatTime(booking.end_time)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase ${booking.status === 'confirmed' ? 'bg-tertiary-container text-tertiary-fixed' : 'bg-surface-container-highest text-slate-500'}`}>{booking.status}</span>
                        <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
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
            <h4 className="text-xl font-bold text-primary mb-6">Popular Rooms</h4>
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
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={room.name} src={room.images[0].filePath.startsWith('http') ? room.images[0].filePath : `http://localhost:3001/${room.images[0].filePath}`} />
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

