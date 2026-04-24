import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ReportsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* SideNavBar Component */}
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl z-50 flex flex-col py-8 px-4 space-y-2 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50 font-headline">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mt-1">Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1 font-body">
          <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">meeting_room</span>
            <span>Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">event_available</span>
            <span>My Bookings</span>
          </button>
          <button onClick={() => navigate('/admin')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span>Admin Management</span>
          </button>

          {/* Active Navigation */}
          <button className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-900 dark:text-white font-semibold border-r-4 border-slate-900 dark:border-slate-50 bg-slate-200/50 dark:bg-slate-800/50 transition-all duration-200 active:scale-95">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reports</span>
          </button>

          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </button>
        </nav>
        <div className="pt-6 mt-auto">
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-colors duration-300">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar Component */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 w-full h-full">
          <div className="flex items-center flex-1">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="font-body w-full pl-10 pr-4 py-2 bg-surface-container border-none outline-none rounded-lg text-sm focus:bg-surface-container-lowest focus:ring-0 transition-all" placeholder="Search analytics..." type="text" />
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
      <main className="ml-64 pt-24 pb-12 px-10 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <h2 className="text-4xl font-bold tracking-tight text-primary mb-2 font-headline">Laporan & Analitik</h2>
            <p className="font-body text-on-surface-variant max-w-lg">Comprehensive overview of meeting room efficiency and resource utilization across the organization.</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Date Range Picker */}
            <div className="font-body flex items-center bg-surface-container-lowest rounded-xl px-4 py-2.5 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
              <span className="material-symbols-outlined text-secondary text-lg mr-3">calendar_today</span>
              <span className="text-sm font-medium text-on-surface">Oct 01, 2023 - Oct 31, 2023</span>
              <span className="material-symbols-outlined text-outline-variant text-lg ml-3">expand_more</span>
            </div>
            {/* Export Dropdown */}
            <button className="flex items-center gap-2 bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95">
              <span className="material-symbols-outlined text-lg">download</span>
              <span className="font-body">Export</span>
              <span className="material-symbols-outlined text-lg ml-1">expand_more</span>
            </button>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 font-body">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-primary">query_stats</span>
              </div>
              <span className="text-xs font-bold text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full">+4.2%</span>
            </div>
            <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">Utilization</p>
            <p className="text-3xl font-bold text-primary">78%</p>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary">schedule</span>
              </div>
              <span className="text-xs font-bold text-error bg-error-container px-2 py-1 rounded-full">-0.2h</span>
            </div>
            <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">Avg Duration</p>
            <p className="text-3xl font-bold text-primary">1.5h</p>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-on-tertiary-fixed-variant">calendar_month</span>
              </div>
              <span className="text-xs font-bold text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full">+12</span>
            </div>
            <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">Total Bookings</p>
            <p className="text-3xl font-bold text-primary">156</p>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center">
                <span className="material-symbols-outlined text-on-surface">group</span>
              </div>
              <span className="text-xs font-bold text-tertiary-fixed-dim bg-tertiary-container px-2 py-1 rounded-full">+8%</span>
            </div>
            <p className="text-label-sm uppercase tracking-widest text-outline text-[10px] font-bold mb-1">Unique Users</p>
            <p className="text-3xl font-bold text-primary">89</p>
          </div>
        </div>

        {/* Bento Grid Charts */}
        <div className="grid grid-cols-12 gap-8 font-body">
          {/* 30-day Usage Trend (Area Chart) - Spans 8 cols */}
          <div className="col-span-12 lg:col-span-8 bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-bold text-primary font-headline">30-day Usage Trend</h3>
                <p className="text-sm text-on-surface-variant">Daily meeting frequency and duration volume</p>
              </div>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary hover:bg-secondary-container transition-colors">
                  <span className="material-symbols-outlined text-sm">more_horiz</span>
                </button>
              </div>
            </div>
            {/* Visualization Placeholder: Simulated Area Chart */}
            <div className="relative h-64 w-full flex items-end justify-between px-2 overflow-hidden">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between py-2">
                <div className="border-b border-surface-container-high w-full"></div>
                <div className="border-b border-surface-container-high w-full"></div>
                <div className="border-b border-surface-container-high w-full"></div>
                <div className="border-b border-surface-container-high w-full"></div>
              </div>
              {/* Simulated Gradient Fill */}
              <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none"></div>
              {/* Simulated SVG Path for Area */}
              <svg className="absolute bottom-0 left-0 w-full h-40 overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 100">
                <path d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,50 L1000,100 L0,100 Z" fill="rgba(0, 9, 27, 0.08)"></path>
                <path className="text-primary" d="M0,80 Q100,20 200,60 T400,30 T600,70 T800,20 T1000,50" fill="none" stroke="currentColor" strokeWidth="3"></path>
              </svg>
              {/* Points */}
              <div className="z-10 group relative h-full flex flex-col justify-end pb-8">
                <div className="w-3 h-3 bg-primary border-2 border-surface-container-lowest rounded-full -mb-1.5 shadow-md group-hover:scale-150 transition-transform"></div>
              </div>
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-outline uppercase tracking-widest">
              <span>Oct 01</span>
              <span>Oct 10</span>
              <span>Oct 20</span>
              <span>Oct 31</span>
            </div>
          </div>

          {/* Booking by Department (Donut Chart) - Spans 4 cols */}
          <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
            <h3 className="text-xl font-bold text-primary mb-2 font-headline">By Department</h3>
            <p className="text-sm text-on-surface-variant mb-10">Resource allocation by team</p>
            <div className="relative w-48 h-48 mx-auto mb-10">
              {/* Donut SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle className="stroke-surface-container-low" cx="18" cy="18" fill="none" r="16" strokeWidth="3.5"></circle>
                <circle className="stroke-primary" cx="18" cy="18" fill="none" r="16" strokeDasharray="45, 100" strokeWidth="4"></circle>
                <circle className="stroke-secondary" cx="18" cy="18" fill="none" r="16" strokeDasharray="25, 100" strokeDashoffset="-45" strokeWidth="4"></circle>
                <circle className="stroke-on-primary-container" cx="18" cy="18" fill="none" r="16" strokeDasharray="30, 100" strokeDashoffset="-70" strokeWidth="4"></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">156</span>
                <span className="text-[10px] uppercase tracking-widest text-outline font-bold">Total</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="text-sm font-medium text-on-surface">Engineering</span>
                </div>
                <span className="text-sm font-bold text-primary">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="text-sm font-medium text-on-surface">Product</span>
                </div>
                <span className="text-sm font-bold text-primary">25%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-on-primary-container"></div>
                  <span className="text-sm font-medium text-on-surface">Marketing</span>
                </div>
                <span className="text-sm font-bold text-primary">30%</span>
              </div>
            </div>
          </div>

          {/* Utilization per Room (Horizontal Bar Chart) - Spans 12 cols */}
          <div className="col-span-12 bg-surface-container-low p-10 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-bold text-primary font-headline">Utilization per Room</h3>
                <p className="text-on-surface-variant">Comparative performance of specific meeting zones</p>
              </div>
              <div className="bg-surface-container-lowest p-1 rounded-lg flex shadow-sm">
                <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-primary text-white rounded-md">Top Performing</button>
                <button className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-outline hover:text-primary transition-colors">Under-utilized</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-8">
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">The Boardroom</span>
                    <span className="text-sm font-bold text-primary">94%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '94%' }}></div>
                  </div>
                </div>
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">Idea Studio 01</span>
                    <span className="text-sm font-bold text-primary">82%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '82%' }}></div>
                  </div>
                </div>
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">Glass Pod A</span>
                    <span className="text-sm font-bold text-primary">76%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">The Library</span>
                    <span className="text-sm font-bold text-primary">68%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '68%' }}></div>
                  </div>
                </div>
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">Zen Corner</span>
                    <span className="text-sm font-bold text-primary">55%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
                {/* Bar Item */}
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-bold text-primary">War Room 04</span>
                    <span className="text-sm font-bold text-primary">42%</span>
                  </div>
                  <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Action Bar */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 px-8 py-4 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl z-50 text-white font-body">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium opacity-80">Last synced 2 minutes ago</span>
            <div className="w-px h-4 bg-white/20"></div>
            <button className="flex items-center gap-2 hover:text-secondary-fixed transition-colors">
              <span className="material-symbols-outlined text-lg">refresh</span>
              <span className="text-sm font-bold">Refresh Data</span>
            </button>
          </div>
          <button className="bg-primary-container text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-primary transition-all active:scale-95">
            Generate Custom Insight
          </button>
        </div>
      </main>
    </div>
  );
}
