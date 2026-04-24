import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
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
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen overflow-y-auto">
      {/* SideNavBar Anchor */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="space-y-2 flex-grow">
          {/* Active: Dashboard */}
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
          <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="text-sm">Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-sm">Reports</span>
          </button>
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
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
        <div className="flex items-center gap-6">
          <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-900">John Doe</p>
              <p className="text-[10px] text-slate-500">Premium Member</p>
            </div>
            <img alt="User Avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-white" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAae_PPe5uO0wO5MkUprYmf4oMYorDMUNru8K0dWLSBEP0jDf4R2Nz2_RWfPI4VrbVRJgkwHbq8y93lXxM80TbnxfA3i9Z1uM3Q9vFUjmBpMkkyf5MwTOljsM0cif58WPtp-IJkX6xoUh9yqas4AQ5IckSAVvoiWKMGWo4XaG0rl_0Dm4uPYPAtCsg-LEcyh94zhHDNoBkld5m9oFjr_ym02-Lk8DVuanyewQdwQ_O6IwFr0HEcvWPsPwj9-A6BPKEAofU37TKMWCs" />
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-16 min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-8 py-10">
          {/* Welcome Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-extrabold tracking-tight text-primary mb-2">Welcome back, John Doe</h2>
            <p className="text-on-surface-variant font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">event</span>
              Monday, October 24, 2023
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
              <div className="w-14 h-14 bg-primary-container rounded-xl flex items-center justify-center text-white">
                <span className="material-symbols-outlined text-3xl">domain</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Total Rooms</p>
                <h3 className="text-3xl font-extrabold text-primary">12</h3>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
              <div className="w-14 h-14 bg-tertiary-container rounded-xl flex items-center justify-center text-tertiary-fixed">
                <span className="material-symbols-outlined text-3xl">event_available</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Available Now</p>
                <h3 className="text-3xl font-extrabold text-primary">5</h3>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center gap-6">
              <div className="w-14 h-14 bg-secondary-container rounded-xl flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-3xl">book_online</span>
              </div>
              <div>
                <p className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-1">Today's Bookings</p>
                <h3 className="text-3xl font-extrabold text-primary">3</h3>
              </div>
            </div>
          </div>

          {/* Main Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Upcoming Bookings (Wide) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-xl font-bold text-primary">Upcoming Bookings</h4>
                <button className="text-sm font-semibold text-secondary hover:underline">View All</button>
              </div>

              {/* Booking Cards */}
              <div className="space-y-4">
                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center justify-between group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                  <div className="flex items-center gap-5">
                    <div className="bg-surface-container w-12 h-12 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Oct</span>
                      <span className="text-lg font-extrabold text-primary">24</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-primary">Sprint Planning</h5>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">meeting_room</span> Room A • 10:00 AM - 11:00 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-tertiary-container text-tertiary-fixed text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">Confirmed</span>
                    <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest p-5 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex items-center justify-between group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                  <div className="flex items-center gap-5">
                    <div className="bg-surface-container w-12 h-12 rounded-lg flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold uppercase text-on-surface-variant">Oct</span>
                      <span className="text-lg font-extrabold text-primary">25</span>
                    </div>
                    <div>
                      <h5 className="font-bold text-primary">Client Demo</h5>
                      <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                        <span className="material-symbols-outlined text-[14px]">meeting_room</span> Boardroom • 02:30 PM - 03:30 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="bg-tertiary-container text-tertiary-fixed text-[10px] font-bold px-3 py-1 rounded-full tracking-wider uppercase">Confirmed</span>
                    <button className="material-symbols-outlined text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity">more_vert</button>
                  </div>
                </div>
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
              <button onClick={() => navigate('/rooms')} className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-xl shadow-[0_15px_30px_rgba(0,9,27,0.2)] flex items-center justify-center gap-3 font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all">
                <span className="material-symbols-outlined">add_circle</span>
                Quick Book Room
              </button>
            </div>
          </div>

          {/* Bottom Section: Popular Rooms */}
          <div>
            <h4 className="text-xl font-bold text-primary mb-6">Popular Rooms</h4>
            <div className="flex gap-6 overflow-x-auto no-scrollbar pb-8">
              {/* Room Card 1 */}
              <div onClick={() => navigate('/rooms/executive-lounge')} className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                <div className="h-32 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Executive Lounge room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnkWdtRT7r7BesdYvtXgpRwZeFMQKttRvWPspRuu3V_xZF62mff4wtN7QAzAvzO2daUoCbuiO_SS1b4J7qJloOtH2DBPZijSdOkEL0BEkAwCFsz9-LtNByFvQcAuBTASUicHzJMXau-u4vohfCi0vLSfHOHefb75ZNzlarhUj2_NE9AeAupnx7ub5UIk_TuMAVid-E4hZy_fhZnLhoBOG4c5WAjF_nnP22IT6Ku3PFeG8izlnzkThImDJQYvTqnj8NCx6lctIqnqE" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-bold text-primary">Executive Lounge</h6>
                    <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                      <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.9
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                      <span className="material-symbols-outlined text-base">groups</span> Up to 8
                    </div>
                    <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Premium</span>
                  </div>
                </div>
              </div>

              {/* Room Card 2 */}
              <div onClick={() => navigate('/rooms/skyline-suite')} className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                <div className="h-32 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Skyline Suite room" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1dFp4cjDro7b4ft9Nhg6XgDBJ635Sxu1Qm_L9o3Nsyn2g3NDzMEjkQezg0NhAKbrQAliWy7wY4ix-WCevtFCbV8PxmxuSHZdcOjzxbAcf4ysIOe89xpdmy_qIRndKlPXM_Fv3QvHxTfwgj8gueD9eTZTHTc9YuhVSAnUAITuYvsMffcRJKVYPuqdBOSy2zJ-AWvusrUQajm37nJIL6rJIQApFaK3mm0zlFYay_mJ0G8KU1v7mbvkzZI_xftXzQ9161rrXUHYLqfY" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-bold text-primary">Skyline Suite</h6>
                    <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                      <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.8
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                      <span className="material-symbols-outlined text-base">groups</span> Up to 12
                    </div>
                    <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Standard</span>
                  </div>
                </div>
              </div>

              {/* Room Card 3 */}
              <div onClick={() => navigate('/rooms/focus-pod-b')} className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                <div className="h-32 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Focus Pod B" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrQUt5iQL1U3WMckHcJX8O9hPM0skDnP3v7S1ahUDeWPKeeVRioHVT9RlxWFu9-YjBOX0alZ2nfDtlCrnloUYzEBV51fncjq0LE277KNXXQx85MNI61emgVML0GcZNlDXA2e1qwxvwi5HfYUPFfprJFFc5J8b1tEhEel99lEUVM4AOBOX-aTL3PkpvBP0gF2KL9S9SmRgaW7xttHbagrgPrNIyctNVQEkwQ3M8Cz8k7_Zs0igolaoGwd7V4KycJgp8HGz5a-r1P5E" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-bold text-primary">Focus Pod B</h6>
                    <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                      <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.7
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                      <span className="material-symbols-outlined text-base">groups</span> 1-2 Persons
                    </div>
                    <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Private</span>
                  </div>
                </div>
              </div>

              {/* Room Card 4 */}
              <div onClick={() => navigate('/rooms/the-library')} className="min-w-[280px] bg-surface-container-lowest rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden group cursor-pointer hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all">
                <div className="h-32 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="The Library" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfb9vKeWdUM_CZa2a4vduf0MTsw-viJkx-ZX_GDke7JIYcXw9ZO1Sb6g-WIB_q2F_ME04c7v29zJyFF6GbHhuAhfbjEkf7l9_syZF3vtd67P3w8iamI9iNQITToDKAFH2yc723cy6ZbysODoOFgM36BuYsI9k-l0urO86nJE7AlPmYXwJl6iJApUG0YlriReJGQkSbG2dXx8Ga87XtCRDxPh-GqXO4S7OWDmPQ58dn4NLE5-gdfpoc0dRL0DvMf_QX-FMvJP7EF-8" />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h6 className="font-bold text-primary">The Library</h6>
                    <div className="flex items-center gap-1 text-xs font-bold text-secondary">
                      <span className="material-symbols-outlined text-[14px] fill-current" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> 4.5
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2 text-on-surface-variant text-xs font-medium">
                      <span className="material-symbols-outlined text-base">groups</span> Up to 20
                    </div>
                    <span className="bg-surface-container px-2 py-1 rounded text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Public</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Contextual FAB */}
      <div className="fixed bottom-10 right-10 z-50">
        <button className="w-16 h-16 bg-primary text-white rounded-full shadow-[0_20px_40px_rgba(0,9,27,0.3)] flex items-center justify-center hover:scale-110 active:scale-90 transition-transform">
          <span className="material-symbols-outlined text-3xl">bolt</span>
        </button>
      </div>
    </div>
  );
}
