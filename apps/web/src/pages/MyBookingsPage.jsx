import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyBookingsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] dark:shadow-none flex flex-col py-8 px-4 space-y-2 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined mr-3">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined mr-3">meeting_room</span>
            <span>Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined mr-3">calendar_month</span>
            <span>Calendar</span>
          </button>
          <button className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-900 dark:text-white font-semibold border-r-4 border-slate-900 dark:border-slate-50 bg-slate-200/50 dark:bg-slate-800/50 scale-95 duration-200 ease-in-out">
            <span className="material-symbols-outlined mr-3">event_available</span>
            <span>My Bookings</span>
          </button>
          <button onClick={() => navigate('/admin')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined mr-3">admin_panel_settings</span>
            <span>Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30 transition-colors duration-300">
            <span className="material-symbols-outlined mr-3">bar_chart</span>
            <span>Reports</span>
          </button>
        </nav>
        <div className="pt-8 mt-auto border-t border-slate-200/20">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 transition-all">
            <span className="material-symbols-outlined mr-3">settings</span>
            <span>Settings</span>
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center px-4 py-3 rounded-xl text-error font-medium hover:bg-error-container/20 transition-all">
            <span className="material-symbols-outlined mr-3">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest focus:shadow-lg transition-all font-body outline-none" placeholder="Search bookings...." type="text" />
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
      <main className="ml-64 pt-24 pb-12 px-12 min-h-screen">
        {/* Header & Editorial Title */}
        <section className="mb-12">
          <h2 className="text-5xl font-headline font-bold tracking-tight text-primary mb-4 leading-none">My Bookings</h2>
          <p className="text-secondary max-w-2xl text-lg font-light">Manage your reserved workspaces and meeting environments with the precision of a digital concierge.</p>
        </section>

        {/* Pill Filters */}
        <div className="flex items-center space-x-2 mb-10">
          <button className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold shadow-[0_10px_20px_rgba(0,9,27,0.2)]">Upcoming</button>
          <button className="px-6 py-2.5 rounded-full bg-surface-container-low text-secondary text-sm font-medium hover:bg-surface-container-high transition-colors">Completed</button>
          <button className="px-6 py-2.5 rounded-full bg-surface-container-low text-secondary text-sm font-medium hover:bg-surface-container-high transition-colors">Cancelled</button>
        </div>

        {/* Bookings Bento Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {/* Booking Card 1 */}
          <div className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-tertiary-fixed shadow-[0_0_10px_#b6efcf]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded">Confirmed</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-2 tracking-tight">Sprint Planning Q2</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">meeting_room</span>
                  <span className="font-medium">Glass Boardroom · Floor 4</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">calendar_today</span>
                  <span className="font-medium">October 24, 2023</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">schedule</span>
                  <span className="font-medium">10:00 AM — 11:30 AM</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">groups</span>
                  <span className="font-medium">12 Participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <button className="text-secondary hover:text-primary font-semibold text-sm transition-all hover:bg-surface-container-high px-4 py-2 rounded-lg">Edit</button>
              <button className="text-error border border-error/20 hover:bg-error-container/10 font-semibold text-sm px-6 py-2 rounded-lg transition-all">Cancel Booking</button>
            </div>
          </div>

          {/* Booking Card 2 */}
          <div className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-tertiary-fixed shadow-[0_0_10px_#b6efcf]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded">Confirmed</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-2 tracking-tight">Executive Review</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">meeting_room</span>
                  <span className="font-medium">The Sanctuary Suite</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">calendar_today</span>
                  <span className="font-medium">October 26, 2023</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">schedule</span>
                  <span className="font-medium">02:00 PM — 03:00 PM</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">groups</span>
                  <span className="font-medium">4 Participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <button className="text-secondary hover:text-primary font-semibold text-sm transition-all hover:bg-surface-container-high px-4 py-2 rounded-lg">Edit</button>
              <button className="text-error border border-error/20 hover:bg-error-container/10 font-semibold text-sm px-6 py-2 rounded-lg transition-all">Cancel Booking</button>
            </div>
          </div>

          {/* Promotion Card / CTA */}
          <div className="bg-primary-container rounded-xl p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-[0_20px_40px_rgba(0,32,69,0.15)] group">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-secondary rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-primary-container mb-4 block">New Experience</span>
              <h3 className="text-3xl font-headline font-bold mb-4 leading-tight">Host your next VIP session at The Observatory.</h3>
              <p className="text-on-primary-container text-sm mb-8 max-w-xs">Premium rooftop amenities now available for booking across all executive tiers.</p>
              <button className="bg-white text-primary px-8 py-3 rounded-xl font-bold text-sm hover:bg-secondary-fixed transition-colors">Book Now</button>
            </div>
          </div>

          {/* Booking Card 3 */}
          <div className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-tertiary-fixed shadow-[0_0_10px_#b6efcf]"></div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded">Confirmed</span>
                </div>
                <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
              </div>
              <h3 className="text-2xl font-headline font-bold text-primary mb-2 tracking-tight">Design Critique</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">meeting_room</span>
                  <span className="font-medium">Pixel Room · Floor 2</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">calendar_today</span>
                  <span className="font-medium">October 30, 2023</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">schedule</span>
                  <span className="font-medium">11:00 AM — 12:00 PM</span>
                </div>
                <div className="flex items-center text-secondary-fixed-variant text-sm">
                  <span className="material-symbols-outlined text-base mr-2">groups</span>
                  <span className="font-medium">8 Participants</span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
              <button className="text-secondary hover:text-primary font-semibold text-sm transition-all hover:bg-surface-container-high px-4 py-2 rounded-lg">Edit</button>
              <button className="text-error border border-error/20 hover:bg-error-container/10 font-semibold text-sm px-6 py-2 rounded-lg transition-all">Cancel Booking</button>
            </div>
          </div>

          {/* Visual Break / Image Section */}
          <div className="bg-surface-container rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] h-full min-h-[320px] relative">
            <img alt="Lounge" className="absolute inset-0 w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBPDDPRYEFTTRmEOWvcfOaRIQPCA6L-nb9Y0O05KE4Badkp_aKYcOyidk2GdYUbn7xgJr8EmmwPnpk6VerK1qmfOe9If_NWffRlJSINg2l-Q9o8XSMAiYyqGB6U2LfPe-BatdmAMOCm7RxuGYBxAWaqxisM1X-rs0JZqdMXzcm92IZ_LT8UDwGQGfu9mUTUFv2RS2ieSrdQQr3oFOX4FAxGI6SsLWi4AixMpo02fbNe8LNqmG8YGB8it4Purmr5Krl9IirjAM3ASs" />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex flex-col justify-end p-8">
              <h4 className="text-white text-xl font-headline font-bold">Premium Lounges</h4>
              <p className="text-white/70 text-sm">Explore our new quiet zones.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for Bookings Page */}
      <button onClick={() => navigate('/bookings/new')} className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_20px_40px_rgba(0,9,27,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center z-50">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>
    </div>
  );
}
