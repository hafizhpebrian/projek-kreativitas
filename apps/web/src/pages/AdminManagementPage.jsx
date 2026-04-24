import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed min-h-screen">
      {/* SideNavBar Anchor */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-headline">Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">meeting_room</span>
            <span className="font-headline">Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-headline">Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">bookmark_check</span>
            <span className="font-headline">My Bookings</span>
          </button>

          {/* Active State: Admin Management */}
          <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-900 font-bold border-r-4 border-slate-900 bg-slate-100/30">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span className="font-headline">Admin Management</span>
          </button>

          <button onClick={() => navigate('/reports')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">bar_chart</span>
            <span className="font-headline">Reports</span>
          </button>
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-slate-100/50">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-headline">Settings</span>
          </button>
        </nav>
        <div className="mt-auto">
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 font-medium hover:bg-red-50 hover:text-red-600">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-headline">Logout</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar Anchor */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 w-full h-full">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="font-body w-full pl-10 pr-4 py-2 bg-surface-container border-none outline-none rounded-lg text-sm focus:bg-surface-container-lowest focus:ring-0 transition-all" placeholder="Search analytics, rooms, or users..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-all">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900 font-body">Alex Thornton</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-body">Executive Admin</p>
              </div>
              <img alt="User avatar" className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-high shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKmwRcF58VrJO-6dyjvLynIcCPH8fIPa8kMDeArtIAJET_oE0-gJEFacTZuxNN3hxR-6XKbDqwqPMZcFjkgDz6FwhjEp0pPGBRM6p04h1U0sQRt4uXOEwc8Svfu5Ji-wSTPihn4WotX43RCAnSWfv2mHE-HZ4EYrSIX4peVYI1trSmsUzal2C4wosnOudwGRlCqzJ-3GhegrYEgMib8leVOVZ6Hu53EbyBVHjLxc7o6ckBb4ME1sjwxLwczDbfOUQ76PcyVyp1GVQ" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="ml-64 pt-24 p-8 min-h-screen bg-surface">
        {/* Header Section */}
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-primary font-headline mb-2">Executive Overview</h2>
            <p className="text-on-surface-variant font-medium">Welcome back, Administrator. Here's your concierge status.</p>
          </div>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 rounded-xl bg-surface-container-lowest text-on-surface font-semibold text-sm shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-lg transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">file_download</span>
              Export Report
            </button>
            <button onClick={() => navigate('/rooms')} className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white font-semibold text-sm shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">add</span>
              Quick Booking
            </button>
          </div>
        </div>

        {/* Stat Row: High-Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
            <div className="flex justify-between items-start">
              <div className="p-2 bg-primary-fixed rounded-lg text-on-primary-fixed">
                <span className="material-symbols-outlined">event_available</span>
              </div>
              <span className="text-xs font-bold text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full uppercase tracking-wider">+12%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">Total Bookings Today</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">24</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-secondary-container rounded-lg text-on-secondary-container">
                <span className="material-symbols-outlined">analytics</span>
              </div>
              <span className="text-xs font-bold text-secondary-fixed-dim bg-primary-container px-2 py-1 rounded-full uppercase tracking-wider">Steady</span>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">Occupancy Rate</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">85%</h3>
            </div>
            <div className="w-full bg-surface-container rounded-full h-1.5 mt-1">
              <div className="bg-primary h-1.5 rounded-full w-[85%]"></div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-tertiary-fixed rounded-lg text-on-tertiary-fixed-variant">
                <span className="material-symbols-outlined">meeting_room</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">Active Rooms</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">12 <span className="text-sm font-medium text-slate-400">/ 14</span></h3>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col gap-4 relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="p-2 bg-error-container rounded-lg text-on-error-container">
                <span className="material-symbols-outlined">warning</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-on-surface-variant mb-1">Conflicts / Issues</p>
              <h3 className="text-3xl font-extrabold text-primary tracking-tighter">0</h3>
            </div>
          </div>
        </div>

        {/* Charts Section: Bento Grid */}
        <div className="grid grid-cols-12 gap-8 mb-10">
          {/* Line Chart: Booking Trends */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h4 className="text-xl font-bold text-primary">Booking Trends</h4>
                <p className="text-sm text-on-surface-variant">Daily volume for the last 7 days</p>
              </div>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-fixed text-on-primary-fixed">Weekly</span>
              </div>
            </div>
            {/* Mock Chart Visual */}
            <div className="h-64 w-full relative flex items-end justify-between px-2">
              <div className="absolute inset-0 flex flex-col justify-between py-2 border-l border-b border-outline-variant/10">
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
                <div className="w-full border-t border-outline-variant/5"></div>
              </div>
              {/* Data points mock-up with SVG path */}
              <svg className="absolute inset-0 w-full h-full px-2" preserveAspectRatio="none" viewBox="0 0 700 200">
                <path d="M0,160 Q100,140 116,100 T232,80 T348,120 T464,40 T580,60 T700,20" fill="none" stroke="url(#gradient)" strokeLinecap="round" strokeWidth="4"></path>
                <defs>
                  <linearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#00091b"></stop>
                    <stop offset="100%" stopColor="#7089b3"></stop>
                  </linearGradient>
                </defs>
              </svg>
              {/* Day Labels */}
              <div className="flex justify-between w-full mt-4 translate-y-8 px-2 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Bar Chart: Room Utilization */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <h4 className="text-xl font-bold text-primary mb-1">Room Utilization</h4>
            <p className="text-sm text-on-surface-variant mb-8">Ranked by usage %</p>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                  <span>Boardroom A</span>
                  <span className="text-primary">98%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full w-[98%] shadow-sm"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                  <span>Creative Loft</span>
                  <span className="text-primary">82%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-3">
                  <div className="bg-secondary-container h-3 rounded-full w-[82%] shadow-sm"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                  <span>The Vault</span>
                  <span className="text-primary">65%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-3">
                  <div className="bg-outline-variant h-3 rounded-full w-[65%] shadow-sm"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wide">
                  <span>Focus Pod 1</span>
                  <span className="text-primary">45%</span>
                </div>
                <div className="w-full bg-surface-container rounded-full h-3">
                  <div className="bg-surface-container-highest h-3 rounded-full w-[45%] shadow-sm"></div>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-3 text-xs font-bold uppercase tracking-widest text-primary border-t border-outline-variant/10 hover:text-on-primary-container transition-colors">
              View All Assets
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-surface-container-lowest rounded-3xl p-8 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
          <div className="flex justify-between items-center mb-8">
            <h4 className="text-xl font-bold text-primary">Recent Activity Feed</h4>
            <button className="text-sm font-semibold text-secondary hover:underline transition-all">View Full Logs</button>
          </div>
          <div className="space-y-1">
            {/* Activity Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/30 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">book_online</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Sarah Jenkins booked <span className="text-primary">Executive Suite</span></p>
                  <p className="text-xs text-on-surface-variant">Scheduled for: Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 group-hover:text-slate-500">2 mins ago</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-tertiary-container text-tertiary-fixed mt-1">Confirmed</span>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-error-container/30 flex items-center justify-center text-error">
                  <span className="material-symbols-outlined">cancel</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Marcus Thorne cancelled booking <span className="text-primary">Focus Pod 4</span></p>
                  <p className="text-xs text-on-surface-variant">Reason: Schedule conflict</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 group-hover:text-slate-500">14 mins ago</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-surface-container-highest text-on-surface-variant mt-1">Processed</span>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined">person_add</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">New User Account Registered: <span className="text-primary">Elena Rodriguez</span></p>
                  <p className="text-xs text-on-surface-variant">Role: Department Lead</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 group-hover:text-slate-500">45 mins ago</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-secondary-container text-on-secondary-container mt-1">Verified</span>
              </div>
            </div>

            {/* Activity Item */}
            <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-surface-container-low transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/30 flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined">settings_suggest</span>
                </div>
                <div>
                  <p className="font-semibold text-slate-900">System Update: <span className="text-primary">Auto-release timers active</span></p>
                  <p className="text-xs text-on-surface-variant">Global policy updated across all nodes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-400 group-hover:text-slate-500">1 hr ago</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary-container text-primary-fixed mt-1">System</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
