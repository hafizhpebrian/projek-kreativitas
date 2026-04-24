import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RoomExplorerPage() {
  const navigate = useNavigate();
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 border-r-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] flex flex-col py-8 px-4 z-50">
        <div className="mb-10 px-4">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white font-['Manrope']">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-1">Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          {/* Active Status */}
          <button onClick={() => navigate('/rooms')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-900 dark:text-white font-bold border-r-4 border-slate-900 dark:border-white hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">meeting_room</span>
            <span>Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">bookmark_check</span>
            <span>My Bookings</span>
          </button>
          <button onClick={() => navigate('/admin')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span>Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50 text-left">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reports</span>
          </button>
        </nav>
        <div className="mt-auto space-y-2 border-t border-slate-100 pt-6">
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </button>
          <button onClick={() => navigate('/login')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-slate-500 dark:text-slate-400 font-medium hover:bg-slate-100/50 dark:hover:bg-slate-800/50">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <main className="ml-64 min-h-screen">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest focus:shadow-lg transition-all font-body outline-none" placeholder="Search rooms, floors, or equipment..." type="text" />
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

        {/* Page Content */}
        <div className="pt-24 px-8 pb-12">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-5xl font-headline font-extrabold tracking-tight text-primary mb-2">Room Inventory / Explorer</h2>
              <p className="text-on-surface-variant font-body">Manage your workspace ecosystem with precision.</p>
            </div>
            <button onClick={() => setIsAddRoomModalOpen(true)} className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold shadow-[0_20px_40px_rgba(0,9,27,0.15)] hover:scale-105 transition-all">
              Add New Room
            </button>
          </div>

          {/* Filter & Search Bar Section */}
          <section className="mb-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4 bg-surface-container-low p-6 rounded-xl">
              <div className="flex-1 min-w-[300px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Location / Floor</label>
                <select className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 text-sm focus:ring-0 shadow-sm font-body outline-none">
                  <option>All Floors</option>
                  <option>Floor 1 - Reception & Lobby</option>
                  <option>Floor 2 - Engineering Hub</option>
                  <option>Floor 5 - Executive Suite</option>
                </select>
              </div>
              <div className="w-48">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Capacity</label>
                <select className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 text-sm focus:ring-0 shadow-sm font-body outline-none">
                  <option>Any Capacity</option>
                  <option>1-4 People</option>
                  <option>5-10 People</option>
                  <option>10-20 People</option>
                  <option>20+ People</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Amenities</label>
                <div className="flex gap-2">
                  <button className="bg-surface-container-lowest text-on-surface-variant p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">tv</span>
                  </button>
                  <button className="bg-surface-container-lowest text-on-surface-variant p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">videocam</span>
                  </button>
                  <button className="bg-surface-container-lowest text-on-surface-variant p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">ac_unit</span>
                  </button>
                  <button className="bg-surface-container-lowest text-on-surface-variant p-3 rounded-lg hover:bg-primary hover:text-white transition-all shadow-sm">
                    <span className="material-symbols-outlined">wifi</span>
                  </button>
                </div>
              </div>
              <div className="flex items-end self-stretch pb-0.5">
                <div className="flex bg-surface-container-highest p-1 rounded-lg">
                  <button className="p-2 rounded-md bg-white shadow-sm text-primary">
                    <span className="material-symbols-outlined">grid_view</span>
                  </button>
                  <button className="p-2 rounded-md text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">view_list</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Room Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Room Card 1: Available */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/boardroom-alpha')}>
                <img alt="Boardroom A" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDX5oA3N3uM1AhW5FRcBGWpOSQzEPr75hNwWNWqCMupRR4JDbxANZ-gZxg_ULwaFsahwed6_7h5TuYj6xe1rJ4sb6NqjCKlCq4Yv-JhCvK7yTNTtXrP-_-WI1IMmzHEp6NgfofJISTGkNFGwV1ksv6CCOAZQSLRqeZmPTQa-oRVUghtVQt8UGAwTodSd4j1x73BxIUZdzEohFwn-JN5EiyO_nJcqfWdUaubiaDE0CiY1Oa8FCQ7TKk_-3HpAXDalDrev2wObr39QaA" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/boardroom-alpha')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Boardroom Alpha</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Floor 5 • 24 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="Large TV Screen">tv</span>
                  <span className="material-symbols-outlined" title="HDMI Support">settings_input_hdmi</span>
                  <span className="material-symbols-outlined" title="Air Conditioning">ac_unit</span>
                  <span className="material-symbols-outlined" title="Coffee Service">local_cafe</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/bookings/new')} className="flex-1 primary-gradient text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform">
                    Book Now
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 2: Occupied */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/focus-studio-2')}>
                <img alt="Focus Room 2" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqr287MLsi2oBIz-Q9lDB_ahHk3Hm9eEVnKYz-K1GCGiHSXFjZqutg8TIhrruWiYfmNPSbKboVRxf8AKvu0jVbXrHvI1QokLEniBN4VZMzlhpDzJzWj9rE1d-UnZq4Kd088g5qHSmJNuUr_CbDLexLf5HoTEYLv8mGOFl_6o66gqVHpxdPRYeJUW45nRqwYN-TbYSwBEpXRYKD8pTq7RrXYw1514OYe6fh-7EV5VkGaSl6t83br1HQW3GwDbJ1-kN6xB3LFhDWlaE" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
                    Occupied
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/focus-studio-2')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Focus Studio 2</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Floor 2 • 2 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="High Speed WiFi">wifi</span>
                  <span className="material-symbols-outlined" title="Fast Charging">charging_station</span>
                  <span className="material-symbols-outlined" title="Soundproof">volume_off</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-surface-container-high text-on-surface-variant py-3 px-4 rounded-lg font-bold text-sm tracking-wide cursor-not-allowed">
                    View Schedule
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 3: Available */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/creative-hub')}>
                <img alt="Creative Hub" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD2Ok4FpJom-E3NEDa27-WSkO1nxdG2CLAhiuhxr7qjCDo8joHsuUSakRQw4lmqA9EbmtmOevWY-U5_vL5GIar6_Uz7CExav7XoiQlSoB8LSX9b6TkT1LXeAnCRmAeowhH0MWm0n6qs5OZuRMgc-ku2nDDYzFCb9gj08zNiCabWcnaSLFweKb2qB0HmSGq9vZvc67QrO0DTUv621Sd0KhwHh-QkuNXgl9G7OglwbzeoCimuYcGxCuRq0FVac78S9WTX-yVk1LoOnGQ" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/creative-hub')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Creative Hub</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Floor 2 • 12 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="HD Camera System">videocam</span>
                  <span className="material-symbols-outlined" title="Digital Whiteboard">draw</span>
                  <span className="material-symbols-outlined" title="Air Conditioning">ac_unit</span>
                  <span className="material-symbols-outlined" title="Collaborative Layout">group</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/bookings/new')} className="flex-1 primary-gradient text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform">
                    Book Now
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 4: Available */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/meeting-pod-04')}>
                <img alt="Small Meeting 1" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCe-wu0bjFMA05rbLnyEk5G9pF_VeMwa9m6if6ZIXNk5CGRk3hr69VOkZY9XBIIgkOnQHwoSTkPbyDW15XxcGY_dtdzGWjI85OBGMFIzdqAHcgwOk9A7VjJYWEQS0H9yCXCPA3E1q2nAzmVzo4dAvOnSkykEVyYvH6ScVmjHHvD7OQLTJsqitcipK3q1iPoAYomMYEFbHvOi2ekrjhHmMd1p43tUx0zhJzQgURd1A5Droy-ShExOQbLfJb9D-2T8BmpNfSaJHzZDno" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/meeting-pod-04')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Meeting Pod 04</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Floor 1 • 4 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="High Speed WiFi">wifi</span>
                  <span className="material-symbols-outlined" title="HDMI Support">settings_input_hdmi</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/bookings/new')} className="flex-1 primary-gradient text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform">
                    Book Now
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 5: Occupied */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/academy-hall')}>
                <img alt="Training Center" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6VrS_xEpAgo2NtmXMNA_Natrh456UwTYIxp_hBZzmzGM4GYUSh61F_mvRprI4rlg1gR21yaQ_UG2H5ojn6EKKWYyx0jiq9ZwcylmPyNP9pKh-bkqoUqKrQtYDJzqWhqGqpclokqBPvCjGhzfWetbjbCKCgzPljgPF2Sj5ZGnIteX4ttfWt0BUv0IBvJ_tfe3wM0eolXII2hhq4h6j-UYFzh8icMtmFaGNLJsDwEez_sEIOKW2kmDamy9RO0LhJQhEWL6tEHeX9uQ" />
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container">
                    Occupied
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/academy-hall')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Academy Hall</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Floor 3 • 50 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="Audio System">mic</span>
                  <span className="material-symbols-outlined" title="Triple Display">tv</span>
                  <span className="material-symbols-outlined" title="Air Conditioning">ac_unit</span>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 bg-surface-container-high text-on-surface-variant py-3 px-4 rounded-lg font-bold text-sm tracking-wide cursor-not-allowed">
                    View Schedule
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Room Card 6: Available */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500">
              <div className="relative h-64 overflow-hidden cursor-pointer" onClick={() => navigate('/rooms/sky-lounge')}>
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                <img alt="Terrace Lounge" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqW7HiOVLGUTgue7VOEiTOmBL-xxohrx1iLC1qbPQySj49a0eiXDklkcUXgohZIdV7JzBjGo89NTOzlxu7ME3SvexPa_zdkrr0GNZ2VJ5kFi7CkqRfpI7ZLSt1Gf0gMVLkmUBecMRSPiFlSJ5JJGqNtiE5D_KOJ4Y1b7MXfdLecTLlCKYxmZjLJJGigECpnq4AsnblbzR3UY3zTRcLn5oY4o_fG61goOvCzHxAqtxSr3Hrtwz0ieWAjQqmLj84IyM80NDTIp8tPgs" />
                <div className="absolute top-4 right-4 z-20">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed">
                    Available
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 onClick={() => navigate('/rooms/sky-lounge')} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline">Sky Lounge</h3>
                    <p className="text-sm text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">layers</span> Roof • 15 seats
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 mb-8 text-on-secondary-container">
                  <span className="material-symbols-outlined" title="Outdoor Seating">deck</span>
                  <span className="material-symbols-outlined" title="High Speed WiFi">wifi</span>
                  <span className="material-symbols-outlined" title="Catering Ready">restaurant</span>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => navigate('/bookings/new')} className="flex-1 primary-gradient text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform">
                    Book Now
                  </button>
                  <button className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                    <span className="material-symbols-outlined">calendar_today</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button for quick booking */}
      <button onClick={() => navigate('/bookings/new')} className="fixed bottom-8 right-8 w-14 h-14 primary-gradient text-white rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-90 transition-all z-40">
        <span className="material-symbols-outlined">add</span>
        <span className="absolute right-full mr-4 bg-primary text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none font-bold tracking-wide">Quick Booking</span>
      </button>

      {/* MODAL OVERLAY: Add/Edit Room */}
      {isAddRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-md" onClick={() => setIsAddRoomModalOpen(false)}></div>
          
          {/* Modal Content Card */}
          <div className="relative w-full max-w-3xl bg-surface/95 backdrop-blur-xl rounded-[2rem] shadow-[0_40px_80px_rgba(0,9,27,0.2)] overflow-hidden flex flex-col md:flex-row border border-white/20">
            {/* Left Side: Visual/Context */}
            <div className="md:w-1/3 bg-primary-container p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-secondary-fixed-dim text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">Configuration</span>
                <h2 className="text-3xl font-bold font-headline text-white leading-tight">Design a Space for Success.</h2>
                <p className="text-on-primary-container text-sm mt-4 leading-relaxed tracking-wide">Ensure every detail of your room reflects the premium standards of SI-BOOK.</p>
              </div>
              <div className="relative z-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary-fixed text-sm">info</span>
                  </div>
                  <p className="text-xs text-on-primary-container font-medium leading-tight">Auto-populates to the global calendar upon saving.</p>
                </div>
              </div>
              {/* Abstract Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
            
            {/* Right Side: Form */}
            <div className="md:w-2/3 p-10 bg-surface-container-lowest">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold font-headline text-primary">Room Details</h3>
                <button onClick={() => setIsAddRoomModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <form className="space-y-6 font-body" onSubmit={(e) => { e.preventDefault(); setIsAddRoomModalOpen(false); }}>
                {/* Basic Info Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Room Name</label>
                    <input className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white focus:ring-1 focus:ring-primary/10 shadow-sm transition-all outline-none text-sm" placeholder="e.g. Skyline Lounge" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Floor Level</label>
                    <select className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white shadow-sm transition-all outline-none appearance-none cursor-pointer text-sm">
                      <option>Ground Floor</option>
                      <option>Executive (04)</option>
                      <option>Penthouse (12)</option>
                    </select>
                  </div>
                </div>
                
                {/* Capacity & Assets */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Seating Capacity</label>
                  <div className="flex items-center gap-4 bg-surface-container rounded-xl p-1">
                    <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-95 transition-all text-slate-500" type="button">
                      <span className="material-symbols-outlined text-sm">remove</span>
                    </button>
                    <input className="flex-1 bg-transparent border-none text-center font-bold text-primary focus:ring-0 outline-none text-lg" type="number" defaultValue="10"/>
                    <button className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-95 transition-all text-slate-500" type="button">
                      <span className="material-symbols-outlined text-sm">add</span>
                    </button>
                  </div>
                </div>
                
                {/* Facilities Checkboxes */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Facilities & Equipment</label>
                  <div className="flex flex-wrap gap-2">
                    <label className="group cursor-pointer">
                      <input className="hidden peer" type="checkbox"/>
                      <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-slate-600 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">videocam</span> 4K Video Conf
                      </span>
                    </label>
                    <label className="group cursor-pointer">
                      <input defaultChecked className="hidden peer" type="checkbox"/>
                      <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-slate-600 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">wifi</span> Gigabit Fiber
                      </span>
                    </label>
                    <label className="group cursor-pointer">
                      <input className="hidden peer" type="checkbox"/>
                      <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-slate-600 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">coffee</span> Premium Bar
                      </span>
                    </label>
                    <label className="group cursor-pointer">
                      <input className="hidden peer" type="checkbox"/>
                      <span className="px-4 py-2 rounded-full border border-outline-variant text-xs font-semibold text-slate-600 peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">tv</span> 85" OLED Display
                      </span>
                    </label>
                  </div>
                </div>
                
                {/* Image Uploader */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">Room Photography</label>
                  <div className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-8 flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container transition-colors group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <span className="material-symbols-outlined text-primary">upload_file</span>
                    </div>
                    <p className="text-sm font-semibold text-primary">Drop images here or <span className="text-secondary underline underline-offset-4">browse</span></p>
                    <p className="text-[10px] text-slate-400 mt-2 font-medium">High-resolution JPEG or PNG, max 10MB</p>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6">
                  <button onClick={() => setIsAddRoomModalOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-surface-container transition-all" type="button">
                    Cancel
                  </button>
                  <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-3 rounded-xl text-sm font-bold shadow-[0_10px_25px_rgba(0,9,27,0.1)] hover:scale-[1.02] active:scale-95 transition-all" type="submit">
                    Save Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
