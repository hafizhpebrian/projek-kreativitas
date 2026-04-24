import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CalendarPage() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="text-sm">Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium text-left">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="text-sm">Reports</span>
          </button>
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-slate-500 dark:text-slate-400 font-medium">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm">Settings</span>
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-100/50 transition-all text-error font-medium">
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
                <h2 className="text-5xl font-extrabold tracking-tighter text-primary font-headline">October 2024</h2>
                <div className="flex gap-1 ml-4">
                  <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                    <span className="material-symbols-outlined">chevron_left</span>
                  </button>
                  <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors">
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl">
              <button className="px-6 py-2 text-sm font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-all">Day</button>
              <button className="px-6 py-2 text-sm font-bold rounded-lg bg-surface-container-lowest shadow-sm text-primary transition-all">Week</button>
              <button className="px-6 py-2 text-sm font-bold rounded-lg text-slate-500 hover:text-slate-900 transition-all">Month</button>
            </div>
          </div>

          {/* Resource Timeline Calendar */}
          <div className="bg-surface-container-low rounded-[2rem] overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            {/* Time Header */}
            <div className="flex border-b-0 bg-surface-container-high/50">
              <div className="w-48 p-6 flex-shrink-0 bg-surface-container-high font-headline font-bold text-xs tracking-widest text-primary/40 uppercase">
                Resources
              </div>
              <div className="flex flex-1 overflow-x-auto no-scrollbar">
                {/* Hours */}
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">08:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">09:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">10:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">11:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">12:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">13:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">14:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">15:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">16:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">17:00</div>
                <div className="flex-shrink-0 w-32 p-6 text-center text-xs font-bold text-slate-500 border-l-0">18:00</div>
              </div>
            </div>

            {/* Grid Content */}
            <div className="flex-1 overflow-y-auto max-h-[600px] no-scrollbar">
              {/* Resource Row 1 */}
              <div className="flex group hover:bg-surface-container-lowest/30 transition-colors">
                <div className="w-48 p-6 flex-shrink-0 flex flex-col gap-1 justify-center">
                  <span className="text-sm font-bold text-primary">Boardroom Alpha</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">groups</span> 12 Seats
                  </span>
                </div>
                <div className="flex flex-1 relative py-4 bg-[linear-gradient(90deg,transparent_127px,#ebeef0_128px)] bg-[length:128px_100%]">
                  {/* Booking: Own (Navy) */}
                  <div
                    onClick={() => setSelectedEvent('q4-strategy')}
                    className={`absolute left-64 w-64 h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group ${selectedEvent === 'q4-strategy' ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02]' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02]'}`}
                  >
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-bold leading-tight transition-colors ${selectedEvent === 'q4-strategy' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>Q4 Strategy Review</span>
                      <span className={`material-symbols-outlined text-sm transition-colors ${selectedEvent === 'q4-strategy' ? 'text-white/50' : 'text-slate-400 group-hover:text-white/50'}`}>lock</span>
                    </div>
                    <div className={`text-[10px] font-medium transition-colors ${selectedEvent === 'q4-strategy' ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>10:00 - 12:00 • John Doe</div>
                  </div>
                </div>
              </div>

              {/* Resource Row 2 (Zebra stripe) */}
              <div className="flex group bg-surface-container/20 hover:bg-surface-container-lowest/30 transition-colors">
                <div className="w-48 p-6 flex-shrink-0 flex flex-col gap-1 justify-center">
                  <span className="text-sm font-bold text-primary">Studio 404</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">groups</span> 4 Seats
                  </span>
                </div>
                <div className="flex flex-1 relative py-4 bg-[linear-gradient(90deg,transparent_127px,#ebeef0_128px)] bg-[length:128px_100%]">
                  {/* Booking: Others (Light Gray) */}
                  <div
                    onClick={() => setSelectedEvent('product-sync')}
                    className={`absolute left-[384px] w-32 h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group ${selectedEvent === 'product-sync' ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02]' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02]'}`}
                  >
                    <span className={`text-xs font-bold leading-tight transition-colors ${selectedEvent === 'product-sync' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>Product Sync</span>
                    <div className={`text-[10px] font-medium transition-colors ${selectedEvent === 'product-sync' ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>11:00 - 12:00 • Sarah K.</div>
                  </div>
                  {/* Booking: Others */}
                  <div
                    onClick={() => setSelectedEvent('client-interview')}
                    className={`absolute left-[768px] w-48 h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group ${selectedEvent === 'client-interview' ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02]' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02]'}`}
                  >
                    <span className={`text-xs font-bold leading-tight transition-colors ${selectedEvent === 'client-interview' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>Client Interview</span>
                    <div className={`text-[10px] font-medium transition-colors ${selectedEvent === 'client-interview' ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>14:00 - 15:30 • HR Team</div>
                  </div>
                </div>
              </div>

              {/* Resource Row 3 */}
              <div className="flex group hover:bg-surface-container-lowest/30 transition-colors">
                <div className="w-48 p-6 flex-shrink-0 flex flex-col gap-1 justify-center">
                  <span className="text-sm font-bold text-primary">Conference C</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">groups</span> 20 Seats
                  </span>
                </div>
                <div className="flex flex-1 relative py-4 bg-[linear-gradient(90deg,transparent_127px,#ebeef0_128px)] bg-[length:128px_100%]">
                  <div
                    onClick={() => setSelectedEvent('standup')}
                    className={`absolute left-0 w-32 h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group ${selectedEvent === 'standup' ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02]' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02]'}`}
                  >
                    <span className={`text-xs font-bold leading-tight transition-colors ${selectedEvent === 'standup' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>Standup</span>
                    <div className={`text-[10px] font-medium transition-colors ${selectedEvent === 'standup' ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>08:00 - 09:00 • Eng.</div>
                  </div>
                  {/* Interaction: Click empty slot */}
                  <div className="absolute left-[512px] right-0 h-full flex items-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-32 h-16 border-dashed border-2 border-primary/10 rounded-xl flex items-center justify-center pointer-events-auto cursor-pointer hover:bg-primary/5 transition-colors group/inner">
                      <span className="material-symbols-outlined text-primary/30 group-hover/inner:text-primary transition-colors">add</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Row 4 (Zebra stripe) */}
              <div className="flex group bg-surface-container/20 hover:bg-surface-container-lowest/30 transition-colors">
                <div className="w-48 p-6 flex-shrink-0 flex flex-col gap-1 justify-center">
                  <span className="text-sm font-bold text-primary">Focus Pod 1</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[12px]">groups</span> 1 Seat
                  </span>
                </div>
                <div className="flex flex-1 relative py-4 bg-[linear-gradient(90deg,transparent_127px,#ebeef0_128px)] bg-[length:128px_100%]">
                  {/* Booking: Own */}
                  <div
                    onClick={() => setSelectedEvent('deep-work')}
                    className={`absolute left-[896px] w-32 h-16 top-1/2 -translate-y-1/2 p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex flex-col justify-between group ${selectedEvent === 'deep-work' ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg scale-[1.02]' : 'bg-surface-container-highest hover:bg-gradient-to-br hover:from-primary hover:to-primary-container hover:shadow-lg hover:scale-[1.02]'}`}
                  >
                    <span className={`text-xs font-bold leading-tight transition-colors ${selectedEvent === 'deep-work' ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>Deep Work</span>
                    <div className={`text-[10px] font-medium transition-colors ${selectedEvent === 'deep-work' ? 'text-on-primary-container/80' : 'text-slate-500 group-hover:text-on-primary-container/80'}`}>15:00 - 16:00 • John Doe</div>
                  </div>
                </div>
              </div>
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
          {selectedEvent === 'q4-strategy' && (
            <div className="fixed bottom-12 right-12 w-80 bg-white p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,27,60,0.12)] border border-slate-100 z-50 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-container rounded-lg">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-900">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h4 className="text-lg font-bold text-primary mb-1">Q4 Strategy Review</h4>
              <p className="text-xs text-slate-500 mb-4">Oct 24, 10:00 AM — 12:00 PM</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img alt="Organizer" className="w-6 h-6 rounded-full grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsjrb_Fh5atvys2-cdej5z9lwTCKiT8J0hhHNP93EcYL7EYPIhRuOXzgwSRCKhNTyRyzcvMa5Hj29Zuhp_e030d5rZgRGE6uPu2bFEzb7RJUSFLolDb1OYk_QPl_RYGJLpXqtlXu9jBlHZuXSLGR-L2NkL1e2BkOfH01-hND35epMHiFtO7bjuZfmHLM1xk1_feH8TL1KteAVtqHIzUQu4FN9xM4FVQD1fUDrkPmOZ9KY4dSOKig6rW-t0_1xIk75PP9_0ZuEv45A" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Organizer</span>
                    <span className="text-sm font-medium text-slate-900 leading-none">John Doe</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Participants</span>
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">JD</div>
                    <div className="w-8 h-8 rounded-full bg-secondary-container border-2 border-white flex items-center justify-center text-[10px] font-bold text-primary">AK</div>
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">+5</div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-3 text-xs font-bold text-primary bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">Edit</button>
                <button className="flex-1 py-3 text-xs font-bold text-white bg-error rounded-xl hover:bg-error/90 transition-colors">Cancel</button>
              </div>
            </div>
          )}

          {selectedEvent === 'standup' && (
            <div className="fixed bottom-12 right-12 w-80 bg-white p-6 rounded-3xl shadow-[0_30px_60px_rgba(0,27,60,0.12)] border border-slate-100 z-50 animate-in fade-in slide-in-from-bottom-4">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-tertiary-container rounded-lg">
                  <span className="material-symbols-outlined text-tertiary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                </div>
                <button onClick={() => setSelectedEvent(null)} className="text-slate-400 hover:text-slate-900">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <h4 className="text-lg font-bold text-primary mb-1">Standup</h4>
              <p className="text-xs text-slate-500 mb-4">Oct 24, 08:00 AM — 09:00 AM</p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <img alt="Organizer" className="w-6 h-6 rounded-full grayscale opacity-50" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsjrb_Fh5atvys2-cdej5z9lwTCKiT8J0hhHNP93EcYL7EYPIhRuOXzgwSRCKhNTyRyzcvMa5Hj29Zuhp_e030d5rZgRGE6uPu2bFEzb7RJUSFLolDb1OYk_QPl_RYGJLpXqtlXu9jBlHZuXSLGR-L2NkL1e2BkOfH01-hND35epMHiFtO7bjuZfmHLM1xk1_feH8TL1KteAVtqHIzUQu4FN9xM4FVQD1fUDrkPmOZ9KY4dSOKig6rW-t0_1xIk75PP9_0ZuEv45A" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Organizer</span>
                    <span className="text-sm font-medium text-slate-900 leading-none">Engineering</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button className="flex-1 py-3 text-xs font-bold text-primary bg-surface-container-low rounded-xl hover:bg-surface-container-high transition-colors">Edit</button>
                <button className="flex-1 py-3 text-xs font-bold text-white bg-error rounded-xl hover:bg-error/90 transition-colors">Cancel</button>
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
