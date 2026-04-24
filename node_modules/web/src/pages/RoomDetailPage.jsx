import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function RoomDetailPage() {
  const navigate = useNavigate();
  // We can use the ID from useParams if needed later for dynamic data
  const { id } = useParams();

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex">
      {/* SideNavBar Shell */}
      <aside className="h-screen w-64 fixed left-0 top-0 overflow-y-auto bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col py-8 px-4 space-y-2 z-50 shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
        <div className="px-4 mb-10">
          <h1 className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-slate-50 font-headline">SI-BOOK</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-1 font-label">The Digital Concierge</p>
        </div>
        <nav className="flex-1 space-y-1">
          <button onClick={() => navigate('/dashboard')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </button>
          <button onClick={() => navigate('/rooms')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-900 dark:text-white font-semibold border-r-4 border-slate-900 dark:border-slate-50 bg-slate-200/50 dark:bg-slate-800/50">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>meeting_room</span>
            <span>Rooms</span>
          </button>
          <button onClick={() => navigate('/calendar')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">calendar_month</span>
            <span>Calendar</span>
          </button>
          <button onClick={() => navigate('/bookings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">event_available</span>
            <span>My Bookings</span>
          </button>
          <div className="pt-6 pb-2 px-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-400 font-label">Administration</p>
          </div>
          <button onClick={() => navigate('/admin')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">admin_panel_settings</span>
            <span>Admin Management</span>
          </button>
          <button onClick={() => navigate('/reports')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">bar_chart</span>
            <span>Reports</span>
          </button>
          <button onClick={() => navigate('/settings')} className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl transition-colors duration-300 text-slate-500 dark:text-slate-400 font-medium hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100/50 dark:hover:bg-slate-800/30">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </button>
        </nav>
        <div className="mt-auto px-4">
          <button onClick={() => navigate('/login')} className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-error transition-colors font-medium">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* TopNavBar Shell */}
        <header className="fixed top-0 right-0 w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex items-center flex-1">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest transition-all text-sm placeholder:text-slate-400 outline-none" placeholder="Search for rooms, people, or events..." type="text"/>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-all">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="text-right hidden lg:block">
                <p className="text-sm font-bold text-slate-900 leading-tight">Alexander Wright</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-label">Executive Partner</p>
              </div>
              <img className="w-10 h-10 rounded-full object-cover border-2 border-surface-container-lowest shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCu6Zur4npVnslqiw1ox9fNitbxc_M9qqKioseULdi4737aPrdrw08CWC9F51mEhxevYM-zkTzJXi9NyA1f6YJxOHwCm1_rXYJHyrHtxf6xNxkL7h9Xz9wq7NCTw0Hw16RaMQLE6l9uhmveGVch8z69coiiElQ4bkY8omY2S41UqvHe3CeTpviypXy8uEf5bHfiBUhfMk5plzU7Lpkpoy76FewirUDrJ56GZvHEKgaWdh6NVqWCTzxSOo6_s8xsd3B2P8pmYBsfG-M"/>
            </div>
          </div>
        </header>

        {/* Main Content Canvas */}
        <main className="mt-16 p-10 flex-1">
          {/* Breadcrumb & Title Section */}
          <div className="flex flex-col mb-10">
            <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-slate-400 font-label">
              <button onClick={() => navigate('/rooms')} className="hover:text-primary transition-colors">Rooms</button>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-primary font-bold">Room Detail</span>
            </nav>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-5xl font-bold tracking-tight text-primary font-headline mb-2 leading-tight">The Boardroom East</h2>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-tertiary-fixed rounded-full text-xs font-bold font-label tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
                    AVAILABLE
                  </span>
                  <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">layers</span>Floor 5</span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">groups</span>20 seats</span>
                  </div>
                </div>
              </div>
              <button onClick={() => navigate('/bookings/new')} className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold tracking-tight shadow-[0_20px_40px_rgba(0,27,60,0.15)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.2)] transition-all active:scale-95 duration-200">
                Book Now
              </button>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Gallery Grid (Bento Style) */}
            <div className="col-span-12 lg:col-span-8 space-y-6">
              <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
                <div className="col-span-3 row-span-2 relative group overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHChQpxFk3eOMAad9tXeFcdGraBtyxW7Imxsy0YcAZ3g8sV1eSPBApgQ-RFeV0aftOp21c1T2RUE3coMIas1yA2Pw-uXpPIdBamHIi7obRyzwD5HhkvikGW7uK5QHCX7Zs7UQY9EuqEqHzyWqNXsZMUXkcPBvMS2cni-lqDP1Z8PVbTxfdXGKk5pTE4M_ub0JnxSUu4_SiiqGMDhW2uVweieVCnTfB8tm1GAOAnVDtWgX2n-rFAuNEihZXnyRvILFht0jJELjFOgw"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-xl shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCToTLFiyQY50m3cdJ2IyfDXyCVPMf2Y2vRyw3cYE4sY1rsi-owN6vhEZq0EIaDGZjS1OIMh5TsbliZ03vuBql5EZfrc4C3qBdWIzvSO0e89I5XBFZEsrcOXfsVcQTbrpMhC2d0CX2sUva7t6XXypajMyp4SlHhSfIYpoe4nbuDPQ38ASu4AoGDQ7TcKZ46WO2kGoHUX93Ok9EcHWkY6Ws-GH95jMHwoILbu4SyjrZjbT7NCj-LlIflhkkOO5fBWfAAWymus-wfpjo"/>
                </div>
                <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-xl shadow-sm">
                  <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQmZM0VPq3-j_K9PAvr05YzAppj9zhyqgVue_pLItUiGmvVTvi5mC1YYwo3n3A5Ytuxa9p_HtTIK_mnKrqAqfpogRKifAerwrb3TkWl-vq0d77VE7ys2iYBOn_a0nwhaBUa04Sspp6htqN0oLaTPFtIxAOBLNhYfzeW5LaZsolk9NZHLRI0ZDVJfiVrVQaKm3jqLpebPmxZFp7UmKCiDMY7OJOYeWKGrJQ3sScbZzFlCqO8lflxDL0AuSmXrTmf7c_hH8iUN8eDrg"/>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/40 transition-colors">
                    <span className="text-white font-bold text-lg">+12 Photos</span>
                  </div>
                </div>
              </div>
              
              {/* Timeline Section */}
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold tracking-tight text-primary font-headline">Today's Schedule</h3>
                  <div className="flex items-center gap-4 text-xs font-label text-slate-400">
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-surface-container-high"></span> Available</div>
                    <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span> Booked</div>
                  </div>
                </div>
                <div className="relative pt-6">
                  {/* Timeline Labels */}
                  <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-label">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                    <span>18:00</span>
                    <span>20:00</span>
                  </div>
                  {/* Timeline Bar */}
                  <div className="h-12 w-full bg-surface-container rounded-full overflow-hidden flex relative">
                    <div className="h-full bg-primary-container/20 w-[15%] ml-[10%] group cursor-pointer relative">
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        09:00 - 10:30 Meeting Room Alpha
                      </div>
                    </div>
                    <div className="h-full bg-primary-container w-[25%] ml-[15%] group cursor-pointer relative">
                      <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20">
                        13:00 - 15:30 Strategy Workshop
                      </div>
                    </div>
                    {/* Current Time Indicator */}
                    <div className="absolute top-0 bottom-0 w-0.5 bg-error left-[45%] z-10">
                      <div className="absolute -top-1.5 -left-1 w-2.5 h-2.5 bg-error rounded-full ring-4 ring-error/20"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Side Info Panel */}
            <div className="col-span-12 lg:col-span-4 space-y-8">
              {/* Facility Section */}
              <div className="bg-surface-container-low p-8 rounded-xl">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-label mb-6">Room Facilities</h3>
                <div className="grid grid-cols-2 gap-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">videocam</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">Proyektor</p>
                      <p className="text-[10px] text-slate-500 font-label">4K Ultra HD</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">tv</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">TV</p>
                      <p className="text-[10px] text-slate-500 font-label">85" OLED Screen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">ac_unit</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">AC</p>
                      <p className="text-[10px] text-slate-500 font-label">Climate Control</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">wifi</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">High Speed</p>
                      <p className="text-[10px] text-slate-500 font-label">Fiber Optic</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">mic_external_on</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">Audio</p>
                      <p className="text-[10px] text-slate-500 font-label">Dolby Atmos</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                      <span className="material-symbols-outlined">coffee_maker</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-primary font-headline">Mini Bar</p>
                      <p className="text-[10px] text-slate-500 font-label">Complimentary</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Rules */}
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-label mb-6">Location Detail</h3>
                <div className="flex items-start gap-4 mb-8">
                  <span className="material-symbols-outlined text-slate-400">location_on</span>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    East Wing, Floor 5, Suite 502.<br/>
                    Access via the Executive Elevators.
                  </p>
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 font-label mb-4">House Rules</h3>
                <ul className="space-y-3 text-xs text-slate-500">
                  <li className="flex gap-2 items-start"><span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 shrink-0"></span> <span>No external catering without prior approval</span></li>
                  <li class="flex gap-2 items-start"><span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 shrink-0"></span> <span>Minimum booking duration: 1 hour</span></li>
                  <li className="flex gap-2 items-start"><span className="w-1 h-1 bg-slate-400 rounded-full mt-1.5 shrink-0"></span> <span>Cancellations required 24h in advance</span></li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Sticky Floating Action for Mobile (Hidden on Desktop) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <button onClick={() => navigate('/bookings/new')} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-2xl backdrop-blur-md flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">bolt</span>
          Instant Booking
        </button>
      </div>
    </div>
  );
}
