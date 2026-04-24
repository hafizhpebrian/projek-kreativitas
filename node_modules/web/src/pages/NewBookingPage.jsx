import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewBookingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface flex min-h-screen font-body">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center text-white">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>meeting_room</span>
            </div>
            <div>
              <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-headline">SI-BOOK</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-on-primary-container font-bold">Digital Concierge</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">meeting_room</span>
            <span>Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Calendar</span>
          </button>
          {/* Active Navigation (My Bookings) */}
          <button onClick={() => navigate('/bookings')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-900 dark:text-white font-bold border-r-4 border-slate-900 dark:border-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-l-xl text-left">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark_check</span>
            <span>My Bookings</span>
          </button>
          <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span>Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reports</span>
          </button>
          <button onClick={() => navigate('/settings')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 transition-all rounded-xl text-left">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </button>
        </nav>
        <div className="mt-auto px-4">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-error transition-colors font-medium text-left">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md z-40 flex items-center justify-between px-8 text-on-surface">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest transition-all group-focus-within:shadow-lg outline-none text-on-surface" placeholder="Search rooms or reservations..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-500 hover:text-slate-900 transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full border-2 border-slate-50"></span>
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant/30">
              <div className="text-right">
                <div className="text-sm font-bold text-slate-900">John Doe</div>
                <div className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Premium Member</div>
              </div>
              <img alt="User Avatar" className="w-10 h-10 rounded-xl object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8Z5COs6Dsv5zoFh3u5RSeZ0yY4R0nPdvbeiPhK8wdCM5jzXo8R__rV5yBjIju4-4CR2OAnfg9OY5yVhx3enhe9rSX1XRVEzU39MtPZ3upqnXJItCQeBgvg_BytTFRUPjazRc7gQSDLnIrCOCt8y67eb1KKbEEjmfRfvecWUzGhkid7769uly6SZ9-ZxuSqhiRFUoisOI7gjDViBlSQcenEwlU1tAy7nTCuWfKS1Gz6zy2AQkCbHlDPIYP4hqHdIbJMTQ6dWHzVjk"/>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="mt-16 p-8 flex-1 flex flex-col">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex items-center gap-2 text-on-primary-container font-medium text-sm mb-2">
              <span className="cursor-pointer hover:underline" onClick={() => navigate('/bookings')}>Reservations</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-on-surface">New Booking</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary">Create New Reservation</h1>
            <p className="text-on-surface-variant mt-2 text-lg">Secure your workspace in just a few clicks.</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Panel: Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] p-8">
              <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); navigate('/bookings'); }}>
                {/* Meeting Title */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Meeting Title</label>
                  <input className="w-full bg-surface-container border-none rounded-xl py-4 px-5 text-on-surface focus:ring-0 focus:bg-white focus:shadow-md transition-all placeholder:text-outline/50 outline-none text-sm" placeholder="e.g. Quarterly Strategic Planning" type="text"/>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Room Selector */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Select Room</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">meeting_room</span>
                      <select className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-10 text-on-surface focus:ring-0 appearance-none cursor-pointer outline-none text-sm">
                        <option>The Glass Pavilion</option>
                        <option>Boardroom Alpha</option>
                        <option>Quiet Pod 4</option>
                        <option>Creative Loft</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  {/* Capacity Indicator */}
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Attendance</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">groups</span>
                      <input className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm" placeholder="8 People" type="number"/>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-tertiary-container/10 rounded-md">
                        <span className="text-[10px] font-bold text-on-tertiary-container uppercase tracking-tight">Max 12</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Date</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">calendar_today</span>
                      <input className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm" type="date"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Start Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">schedule</span>
                      <input className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm" type="time" defaultValue="09:00"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">End Time</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">schedule</span>
                      <input className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm" type="time" defaultValue="11:30"/>
                    </div>
                  </div>
                </div>

                {/* Notes Area */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">Additional Notes</label>
                  <textarea className="w-full bg-surface-container border-none rounded-xl py-4 px-5 text-on-surface focus:ring-0 focus:bg-white transition-all placeholder:text-outline/50 resize-none outline-none text-sm" placeholder="Catering requirements, AV setup, etc." rows="4"></textarea>
                </div>

                {/* Privacy Mode */}
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Privacy Mode</div>
                      <div className="text-xs text-on-surface-variant">Hide meeting title from public dashboards</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox"/>
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>
              </form>
            </div>

            {/* Right Panel: Preview & Timeline */}
            <div className="lg:col-span-5 space-y-6 flex flex-col">
              {/* Room Preview Card */}
              <div className="bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden">
                <div className="relative h-56 group">
                  <img alt="Room Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtW-a4B8AWinhgNVhKGOI0rogdt8_IoVTi0cOVqJw-oyal9dMvJ_kth8TB428Q6WJ5powRx0cMW9q2GpJOnU91o3GEGua3kfrNLdwjplQAO7HCv57EKR7SIk30FPttM7lezn5sqLhrDd7Hw8PVmGDp4PV_6Hv5Aa6UpXVVQc6zZtBRk2u5Q0SLfMFd4KYc9idle8dfjGV58z5EvMCtf3M8qFzkLJPlW1_yppb4Ao9xItr2fb85O-Sox_yQ5UFiCmFrQ0poYbakPpA"/>
                  <div className="absolute top-4 right-4 bg-tertiary-container text-tertiary-fixed text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                    Available
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold font-headline">The Glass Pavilion</h3>
                    <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">groups</span> 12 Max</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">tv</span> 4K Display</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">wifi</span> Gig-Speed</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-on-surface-variant font-medium">Daily Rate</span>
                    <span className="text-primary font-extrabold text-lg">$120.00 / hr</span>
                  </div>
                  <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-on-surface-variant">Estimated Total (2.5h)</span>
                      <span className="text-primary font-bold">$300.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Timeline */}
              <div className="bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] p-6 flex-1">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-primary font-headline">Availability Timeline</h3>
                  <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2 py-1 rounded">Today</span>
                </div>
                <div className="space-y-4">
                  {/* Timeline Header */}
                  <div className="flex justify-between text-[10px] text-outline font-bold tracking-tighter uppercase px-1">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                  </div>
                  {/* Timeline Bar */}
                  <div className="h-8 w-full bg-surface-container rounded-full relative overflow-hidden flex">
                    {/* Slot 8-9 (Occupied) */}
                    <div className="h-full bg-outline-variant/30 w-[10%] relative group">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-bold text-outline">OCCUPIED</span>
                      </div>
                    </div>
                    {/* Slot 9-11:30 (Selected) */}
                    <div className="h-full bg-primary-container w-[25%] relative group shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white tracking-widest">SELECTED</span>
                      </div>
                    </div>
                    {/* Slot 14-15 (Occupied) */}
                    <div className="h-full ml-[25%] bg-outline-variant/30 w-[10%] relative group">
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-[8px] font-bold text-outline">OCCUPIED</span>
                      </div>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex gap-4 text-xs font-medium text-on-surface-variant pt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                      <span>Your Slot</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-outline-variant/30"></div>
                      <span>Unavailable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions Bar */}
          <div className="mt-10 mb-8 pt-8 border-t border-outline-variant/10 flex flex-col sm:flex-row items-center justify-end gap-4">
            <button onClick={() => navigate('/bookings')} className="w-full sm:w-auto px-10 py-4 text-on-surface font-bold hover:bg-surface-container-high transition-all rounded-xl">
              Cancel
            </button>
            <button onClick={() => navigate('/bookings')} className="w-full sm:w-auto px-12 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(0,9,27,0.2)] hover:shadow-[0_15px_30px_rgba(0,9,27,0.3)] transition-all transform active:scale-95 flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
              Book Room
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
