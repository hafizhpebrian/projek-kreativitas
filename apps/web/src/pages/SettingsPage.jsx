import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen flex">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl flex flex-col py-6 px-4 z-50 shadow-[20px_0_40px_rgba(0,27,60,0.04)]">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>

        <nav className="flex-1 space-y-1">
          {/* Dashboard */}
          <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
          {/* Rooms */}
          <button onClick={() => navigate('/rooms')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">meeting_room</span>
            Rooms
          </button>
          {/* Calendar */}
          <button onClick={() => navigate('/calendar')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">calendar_today</span>
            Calendar
          </button>
          {/* My Bookings */}
          <button onClick={() => navigate('/bookings')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">event_available</span>
            My Bookings
          </button>
          {/* Admin Management */}
          <button onClick={() => navigate('/admin')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            Admin Management
          </button>
          {/* Reports */}
          <button onClick={() => navigate('/reports')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">bar_chart</span>
            Reports
          </button>
          {/* Settings (ACTIVE) */}
          <button className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-900 dark:text-white bg-slate-200/50 dark:bg-slate-800/50 rounded-lg font-manrope font-semibold text-sm cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
            Settings
          </button>
        </nav>

        <div className="mt-auto border-t border-transparent pt-6">
          <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-3 rounded-xl font-bold text-sm shadow-xl hover:shadow-primary/20 transition-all flex items-center justify-center gap-2 mb-6">
            <span className="material-symbols-outlined text-sm">add</span>
            New Booking
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:translate-x-1 transition-transform duration-200 font-manrope font-semibold text-sm">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        {/* TopNavBar */}
        <header className="w-full h-16 sticky top-0 z-40 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </div>
            <h2 className="font-headline tracking-tight font-bold text-slate-900 dark:text-slate-50">Settings & Profile</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative flex items-center bg-surface-container rounded-full px-4 py-1.5 focus-within:bg-surface-container-lowest transition-all group font-body">
              <span className="material-symbols-outlined text-outline text-sm">search</span>
              <input className="bg-transparent border-none outline-none focus:ring-0 text-sm w-48 placeholder:text-outline-variant" placeholder="Search preferences..." type="text" />
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-slate-500 hover:bg-slate-200/50 rounded-full transition-colors">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
              <div className="h-8 w-8 rounded-full overflow-hidden ml-2 shadow-sm ring-2 ring-surface-container">
                <img alt="User avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBlvRTslMSVNy2v5s_5sEfYBIDoWOw3nf7V84qHEKbOKLMQRfSGLVt1tBHDcJAJaHbZpf3kwuAAWx-obgKlrmHnbX9DXVcfx1z56W6Sxmr17RxbanjC3kBHJ5RPGefxPM4GHAG4l_D7XwBFCJ7Onuod2EKasd9PU5bLgVEtWvF7tnageKtf_GGvx4KNVthVqtqGsGCqgDHXhu2SbtnyCmXTqaavWBpLh9Uzmf1CoFPKWu9nkMHPoXuUY0O-4EGY3RP5SetUGBaDnBY" />
              </div>
            </div>
          </div>
        </header>

        {/* Canvas Content */}
        <div className="p-10 max-w-6xl mx-auto space-y-12">
          {/* Page Header */}
          <section className="relative">
            <h1 className="text-5xl font-extrabold font-headline tracking-tighter text-primary mb-2">User Profile</h1>
            <p className="text-on-surface-variant font-body max-w-lg">Manage your digital concierge experience, personal details, and how we communicate with you.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start font-body">
            {/* Profile Left: Personal Information */}
            <div className="lg:col-span-8 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] relative overflow-hidden">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-surface-container-low shadow-xl">
                      <img alt="Profile image" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE58I5hOW_KeshN49Nj4P0otq8Ge3raRx-HD06t9vv9l4jSjNkmUJQlfIvOQb1g9Ylz5ddEBxNrjG_7LEOHzLL24LLoEplIGOeo6vhM5ftRuIld07jwYCQJHLfFCazaT3hrYd1i1mMkHx31kqgQ9_9GEPQGLPF0JPbHOUd-1Mnyyuz14NXtj7OL42saCnzVl7v1XffcAz-6g1chBpX3T_5NcXF8uMO4aTuODftU6iTXrxOMzTr0CyuL-qB3_Kk_ABcruTSkbw9b5Y" />
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-primary-container text-white p-2 rounded-xl shadow-lg hover:scale-105 transition-transform flex items-center justify-center">
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                  </div>
                  <div className="flex-1 w-full space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Full Name</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="text" defaultValue="Alexander Sterling" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Job Title</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="text" defaultValue="Chief Strategy Officer" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Email Address</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="email" defaultValue="a.sterling@si-book.digital" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Phone Number</label>
                        <input className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/10 transition-all font-medium" type="tel" defaultValue="+1 (555) 890-2344" />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-primary/20 transition-all">Save Profile</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Preferences */}
              <div className="bg-surface-container-low p-10 rounded-[2rem] space-y-8">
                <div>
                  <h3 className="text-2xl font-bold font-headline text-primary">Notification Preferences</h3>
                  <p className="text-sm text-on-surface-variant mt-1">Select how you'd like to stay informed about bookings and alerts.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Email */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-tertiary-container flex items-center justify-center text-tertiary-fixed">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div className="w-12 h-6 bg-tertiary-container rounded-full relative p-1 flex items-center justify-end transition-all">
                        <div className="w-4 h-4 bg-tertiary-fixed rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Email Alerts</p>
                      <p className="text-xs text-on-surface-variant mt-1">Confirmations, cancellations, and weekly summaries.</p>
                    </div>
                  </div>
                  {/* Push */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
                        <span className="material-symbols-outlined">send_to_mobile</span>
                      </div>
                      <div className="w-12 h-6 bg-surface-container-highest rounded-full relative p-1 flex items-center justify-start transition-all">
                        <div className="w-4 h-4 bg-on-surface-variant rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Push Notifications</p>
                      <p className="text-xs text-on-surface-variant mt-1">Real-time alerts via mobile and desktop browser.</p>
                    </div>
                  </div>
                  {/* SMS */}
                  <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm space-y-4 hover:shadow-md transition-shadow cursor-pointer group">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                        <span className="material-symbols-outlined">sms</span>
                      </div>
                      <div className="w-12 h-6 bg-surface-container-highest rounded-full relative p-1 flex items-center justify-start transition-all">
                        <div className="w-4 h-4 bg-on-surface-variant rounded-full shadow-sm"></div>
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-sm">SMS Messages</p>
                      <p className="text-xs text-on-surface-variant mt-1">Urgent room changes and emergency alerts.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Right: Account Settings */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(0,27,60,0.04)] space-y-8">
                <div>
                  <h3 className="text-xl font-bold font-headline text-primary">Account Security</h3>
                  <p className="text-xs text-on-surface-variant mt-1">Protect your executive workspace.</p>
                </div>
                <div className="space-y-6">
                  <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-surface-container hover:bg-surface-container-high transition-colors group">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary">key</span>
                      <span className="text-sm font-semibold">Change Password</span>
                    </div>
                    <span className="material-symbols-outlined text-outline-variant group-hover:translate-x-1 transition-transform">chevron_right</span>
                  </button>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant ml-1">Interface Language</label>
                    <div className="relative">
                      <select className="w-full bg-surface-container border-none outline-none rounded-xl px-4 py-3 text-sm focus:ring-0 appearance-none font-medium">
                        <option>English (US)</option>
                        <option>English (UK)</option>
                        <option>Deutsch</option>
                        <option>Français</option>
                        <option>日本語</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold">Two-Factor Auth</span>
                      <span className="text-[10px] bg-tertiary-container text-tertiary-fixed px-2 py-0.5 rounded-full font-bold">ENABLED</span>
                    </div>
                    <div className="flex items-center justify-between px-1">
                      <span className="text-xs font-semibold">Active Sessions</span>
                      <span className="text-[10px] bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full font-bold">2 DEVICES</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 border-t border-surface-container space-y-4 flex flex-col">
                  <button className="w-full text-center py-2 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors">Download Data Archive</button>
                  <button className="w-full text-center py-2 text-xs font-bold text-error hover:underline transition-colors">Request Account Deletion</button>
                </div>
              </div>

              {/* Usage Stats Card */}
              <div className="bg-primary rounded-[2rem] p-8 text-white space-y-6 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary-container rounded-full blur-3xl opacity-50 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-[0.2em] opacity-60 font-bold mb-4">Concierge Level</p>
                  <h4 className="text-2xl font-black font-headline">Executive Platinum</h4>
                  <div className="mt-6 flex items-end gap-2">
                    <span className="text-4xl font-bold">42</span>
                    <span className="text-xs opacity-60 mb-1.5 uppercase font-bold tracking-widest">Bookings this month</span>
                  </div>
                  <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-8 h-8 rounded-full border-2 border-primary overflow-hidden">
                        <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDADLKC5WkMReUnYdaMFKMNY2pxkpJpSMiVTNIorf0resUomXnWj3kqf7q5jxkbIcJO39xzaTP_n60TNPN6T-80wQn_qB1LeqPULUXe3tvPAqdSDQ0vGgAHrBvowocKbChTI6VJxHlbeUDeYELvjQPR5LeciJ-uzulm-YCo8Zm6GTgLSEm2WadIxxotFjTvNtAzqBfNPocJ4EZxajispQvICeyPHDKpg20uG0M3FeGU9qq9nC8TWCpllJOwMsjFgNyS3XjNaoW4P8g" />
                      </div>
                      <div className="w-8 h-8 rounded-full border-2 border-primary bg-primary-container flex items-center justify-center text-[10px] font-bold">
                        +5
                      </div>
                    </div>
                    <span className="text-[10px] font-bold tracking-widest uppercase py-1 px-3 bg-white/10 rounded-full">Member since 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
