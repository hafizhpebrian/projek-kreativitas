import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../lib/api';
import TopRightNav from '../components/TopRightNav';

export default function CalendarPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [timeline, setTimeline] = useState({ resources: [], events: [] });
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('day');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  
  const getDateRange = () => {
    const curr = new Date(currentDate);
    if (view === 'day') {
      return { start: currentDate, end: currentDate };
    } else if (view === 'week') {
      const first = curr.getDate() - curr.getDay() + (curr.getDay() === 0 ? -6 : 1);
      const startObj = new Date(curr);
      startObj.setDate(first);
      const endObj = new Date(startObj);
      endObj.setDate(startObj.getDate() + 6);
      return { start: startObj.toISOString().split('T')[0], end: endObj.toISOString().split('T')[0] };
    } else {
      const startObj = new Date(curr.getFullYear(), curr.getMonth(), 1);
      const endObj = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
      return { start: startObj.toISOString().split('T')[0], end: endObj.toISOString().split('T')[0] };
    }
  };

  const { start, end } = getDateRange();

  useEffect(() => {
    async function loadCalendar() {
      try {
        setLoading(true);
        const res = await fetchApi(`/calendar?date=${start}&endDate=${end}&view=${view}`);
        if (res.ok) {
          const data = await res.json();
          setTimeline(data);
        }
      } catch (error) {
        console.error('Failed to load calendar:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCalendar();
  }, [start, end, view]);

  const getColumns = () => {
    if (view === 'day') {
      return [...Array(13)].map((_, i) => ({
        label: `${String(i + 8).padStart(2, '0')}:00`,
        width: 128
      }));
    } else {
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);
      const daysDiff = Math.round((endDateObj - startDateObj) / (1000 * 60 * 60 * 24)) + 1;
      return [...Array(daysDiff)].map((_, i) => {
        const d = new Date(startDateObj);
        d.setDate(d.getDate() + i);
        return { 
          label: view === 'week' ? d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' }) : d.getDate().toString(), 
          width: view === 'week' ? 128 : 64 
        };
      });
    }
  };

  const columns = getColumns();
  const totalWidth = columns.reduce((acc, col) => acc + col.width, 0);

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col py-8 px-4 shadow-[0_20px_40px_rgba(0,27,60,0.06)] z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm">Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
            <span className="material-symbols-outlined">meeting_room</span>
            <span className="text-sm">Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-900 dark:text-white font-bold border-r-4 border-slate-900 dark:border-white bg-slate-100/50 text-left">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            <span className="text-sm">Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
            <span className="material-symbols-outlined">bookmark_check</span>
            <span className="text-sm">My Bookings</span>
          </button>
          {user?.role === 'admin' && (
            <>
              <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
                <span className="material-symbols-outlined">admin_panel_settings</span>
                <span className="text-sm">Admin Management</span>
              </button>
              <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
                <span className="material-symbols-outlined">bar_chart</span>
                <span className="text-sm">Reports</span>
              </button>
            </>
          )}
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={async () => { await logout(); navigate('/login'); }} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-error-container/20 transition-all text-error font-medium">
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest focus:shadow-lg transition-all font-body outline-none" placeholder="Search for rooms or colleagues" type="text" />
          </div>
        </div>
        <TopRightNav />
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-8 max-w-[1600px] mx-auto">
          {/* Calendar Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-bold tracking-tight text-sm uppercase opacity-60">
                <span className="material-symbols-outlined text-sm">event</span>
                Resource Timeline
              </div>
              <div className="flex items-center gap-4">
                <h2 className="text-5xl font-extrabold tracking-tighter text-primary font-headline">
                  {new Date(currentDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' })}
                </h2>
                <div className="flex gap-1 ml-4">
                  <button 
                    onClick={() => {
                      const d = new Date(currentDate);
                      d.setDate(d.getDate() - 1);
                      setCurrentDate(d.toISOString().split('T')[0]);
                    }}
                    className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button 
                    onClick={() => {
                      const d = new Date(currentDate);
                      d.setDate(d.getDate() + 1);
                      setCurrentDate(d.toISOString().split('T')[0]);
                    }}
                    className="p-2 hover:bg-surface-container-high rounded-full transition-colors"
                  >
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
              <button onClick={() => setView('day')} className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${view === 'day' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-slate-500 hover:text-slate-900'}`}>Day</button>
              <button onClick={() => setView('week')} className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${view === 'week' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-slate-500 hover:text-slate-900'}`}>Week</button>
              <button onClick={() => setView('month')} className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${view === 'month' ? 'bg-surface-container-lowest shadow-sm text-primary' : 'text-slate-500 hover:text-slate-900'}`}>Month</button>
            </div>
          </div>

          {/* Resource Timeline Calendar */}
          <div className="bg-surface-container-low rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            {/* Time Header */}
            <div className="flex border-b-0 bg-surface-container-high/50">
              <div className="w-48 p-6 flex-shrink-0 bg-surface-container-high font-headline font-bold text-xs tracking-widest text-primary/40 uppercase">
                Resources
              </div>
              <div className="flex flex-1 overflow-x-auto no-scrollbar relative" id="timeline-scroll-container">
                {columns.map((col, i) => (
                  <div key={i} className="flex-shrink-0 p-6 text-center text-xs font-bold text-slate-500 border-l-0" style={{ width: `${col.width}px` }}>
                    {col.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto max-h-[600px] no-scrollbar">
              {loading ? (
                <div className="p-12 text-center text-slate-500">Loading schedule...</div>
              ) : timeline.resources.length === 0 ? (
                <div className="p-12 text-center text-slate-500">No resources available.</div>
              ) : (
                timeline.resources.map((resource, rowIdx) => {
                  const events = timeline.events.filter(e => e.resourceId === resource.id);
                  return (
                    <div key={resource.id} className={`flex group ${rowIdx % 2 !== 0 ? 'bg-surface-container/20' : ''} hover:bg-surface-container-lowest/30 transition-colors border-t border-slate-200/50`}>
                      <div className="w-48 p-6 flex-shrink-0 flex flex-col gap-1 justify-center relative bg-white/50 backdrop-blur-sm z-10">
                        <span className="text-sm font-bold text-primary truncate" title={resource.title}>{resource.title}</span>
                        <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">groups</span> {resource.capacity} Seats
                        </span>
                      </div>
                      <div className="flex flex-1 relative py-4 bg-[linear-gradient(90deg,transparent_127px,#ebeef0_128px)] bg-[length:128px_100%]" style={{ minWidth: `${totalWidth}px`, backgroundSize: `${columns[0]?.width || 128}px 100%` }}>
                        {events.map((event) => {
                          let leftPx = 0;
                          let widthPx = 0;
                          
                          const startTimeStr = event.start.split('T')[1];
                          const endTimeStr = event.end.split('T')[1];
                          const eventStart = new Date(event.start);
                          const eventEnd = new Date(event.end);

                          if (view === 'day') {
                            const [sh, sm] = startTimeStr.split(':').map(Number);
                            const [eh, em] = endTimeStr.split(':').map(Number);
                            
                            const startHours = sh + (sm / 60);
                            const endHours = eh + (em / 60);
                            
                            if (endHours <= 8 || startHours >= 20) return null;
                            
                            const clampedStart = Math.max(8, startHours);
                            const clampedEnd = Math.min(20, endHours);
                            
                            leftPx = (clampedStart - 8) * 128;
                            widthPx = (clampedEnd - clampedStart) * 128;
                          } else {
                            const startOfDay = new Date(start);
                            startOfDay.setHours(0, 0, 0, 0);
                            
                            const startOffsetMs = eventStart - startOfDay;
                            const endOffsetMs = eventEnd - startOfDay;
                            
                            const startDay = startOffsetMs / (1000 * 60 * 60 * 24);
                            const endDay = endOffsetMs / (1000 * 60 * 60 * 24);
                            
                            const colWidth = view === 'week' ? 128 : 64;
                            leftPx = Math.max(0, startDay * colWidth);
                            widthPx = Math.max(view === 'week' ? 64 : 32, (endDay - startDay) * colWidth);
                          }

                          return (
                            <div
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`absolute h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group overflow-hidden ${selectedEvent?.id === event.id ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02] z-20' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02] z-10'}`}
                              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
                            >
                              <div className="flex justify-between items-start">
                                <span className={`text-xs font-bold leading-tight truncate transition-colors ${selectedEvent?.id === event.id ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>{event.title}</span>
                              </div>
                              <div className={`text-[10px] font-medium truncate transition-colors ${selectedEvent?.id === event.id ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>
                                {view === 'day' ? `${startTimeStr.substring(0, 5)} - ${endTimeStr.substring(0, 5)}` : `${eventStart.getDate()} - ${eventEnd.getDate()}`} • {event.extendedProps?.organizer?.split(' ')[0] || 'User'}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Dashboard Style Metrics */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] border border-white/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Total Bookings</p>
              <h3 className="text-4xl font-extrabold text-primary">24</h3>
              <div className="mt-4 flex items-center gap-2 text-tertiary-fixed-dim text-xs font-bold">
                <span className="material-symbols-outlined text-sm">trending_up</span> +12% from last week
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] border border-white/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Room Utilization</p>
              <h3 className="text-4xl font-extrabold text-primary">82%</h3>
              <div className="mt-4 w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="w-[82%] h-full bg-primary-container rounded-full"></div>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] border border-white/40">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Your Hours</p>
              <h3 className="text-4xl font-extrabold text-primary">12.5</h3>
              <p className="text-[10px] text-slate-500 mt-2 font-medium">Remaining balance: 27.5h</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] border border-white/40 flex flex-col justify-center">
              <button onClick={() => navigate('/rooms')} className="w-full h-full bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                New Reservation
              </button>
            </div>
          </div>

          {/* Conditionally Rendered Popover Detail */}
          {selectedEvent && (
            <div className="fixed bottom-12 right-12 w-80 bg-white p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,27,60,0.12)] border border-slate-100 z-50 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-container rounded-lg">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-900">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h4 className="text-lg font-bold text-primary mb-1">{selectedEvent.title}</h4>
              <p className="text-xs text-slate-500 mb-4">
                {new Date(selectedEvent.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })},{' '}
                {selectedEvent.start.split('T')[1].substring(0, 5)} — {selectedEvent.end.split('T')[1].substring(0, 5)}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-primary font-bold text-xs">
                    {selectedEvent.extendedProps?.organizer?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Organizer</span>
                    <span className="text-sm font-medium text-slate-900 leading-none">{selectedEvent.extendedProps?.organizer || 'User'}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Attendees</span>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">groups</span>
                    <span className="text-sm text-slate-700">{selectedEvent.extendedProps?.attendees || 1} people</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                {(user?.id === selectedEvent.extendedProps?.organizerId || user?.role === 'admin') ? (
                  <>
                    <button className="flex-1 py-3 text-xs font-bold text-primary bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">Edit</button>
                    <button 
                      onClick={async () => {
                        if (window.confirm("Are you sure you want to cancel this booking?")) {
                          try {
                            const res = await fetchApi(`/bookings/${selectedEvent.id}/cancel`, { method: 'PATCH' });
                            if (res.ok) {
                              setSelectedEvent(null);
                              // Refresh page data
                              const reloadRes = await fetchApi(`/calendar?date=${currentDate}`);
                              if (reloadRes.ok) setTimeline(await reloadRes.json());
                            } else {
                              alert("Failed to cancel booking.");
                            }
                          } catch(e) {
                            alert("Network error.");
                          }
                        }
                      }} 
                      className="flex-1 py-3 text-xs font-bold text-white bg-error rounded-xl hover:bg-error/90 transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <div className="w-full text-center py-3 text-xs font-medium text-slate-400 bg-surface-container-low rounded-xl">
                    <span className="material-symbols-outlined text-sm align-middle mr-1">lock</span>
                    Only the organizer can edit this booking
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button className="md:hidden fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-full shadow-2xl flex items-center justify-center z-50 border-0">
        <span className="material-symbols-outlined">add</span>
      </button>
    </div>
  );
}
