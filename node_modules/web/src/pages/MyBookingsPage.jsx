import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi } from '../lib/api';
import { formatRupiah } from '../lib/formatRupiah';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';

export default function MyBookingsPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('upcoming');
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    async function loadBookings() {
      try {
        setLoading(true);
        // Admin sees ALL bookings from all users to manage/verify them
        // Regular users only see their own bookings
        const endpoint = user?.role === 'admin' ? '/bookings' : '/bookings/my';
        const res = await fetchApi(endpoint);
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (err) {
        console.error('Failed to load bookings', err);
      } finally {
        setLoading(false);
      }
    }
    loadBookings();
  }, []);

  const filteredBookings = bookings.filter(b => {
    if (filter === 'cancelled') return b.status === 'cancelled';
    if (filter === 'completed') return b.status === 'completed';
    return ['pending', 'reserved', 'confirmed', 'awaiting_verification', 'waiting_checkout', 'overdue'].includes(b.status);
  });

  const handleAction = async (bookingId, action) => {
    try {
      const res = await fetchApi(`/bookings/${bookingId}/${action}`, {
        method: 'PATCH',
        body: JSON.stringify({ reason: 'Action triggered via dashboard' })
      });
      if (res.ok) {
        showToast('Action completed successfully!', 'success');
        // Refresh bookings
        const endpoint = user?.role === 'admin' ? '/bookings' : '/bookings/my';
        const dataRes = await fetchApi(endpoint);
        if (dataRes.ok) setBookings(await dataRes.json());
      } else {
        const errData = await res.json();
        showToast(`Action failed: ${errData.error || 'Unknown error'}`, 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Network error. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen font-body">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 transition-all animate-[slideIn_0.3s_ease-out]
          ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 
            toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 
            'bg-blue-50 text-blue-800 border border-blue-200'}`}
          style={{ animation: 'slideIn 0.3s ease-out' }}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
          </span>
          <span className="font-semibold text-sm max-w-xs">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}
      {/* SideNavBar */}
      <Sidebar />

      {/* TopNavBar */}
      <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8 z-40">
        <div className="flex items-center flex-1 max-w-xl">
          <div className="relative w-full group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
            <input className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest focus:shadow-lg transition-all font-body outline-none" placeholder="Search bookings...." type="text" />
          </div>
        </div>
        <TopRightNav />
      </header>

      {/* Main Content Canvas */}
      <main className="ml-0 lg:ml-64 pt-24 pb-12 px-4 md:px-12 min-h-screen">
        {/* Header & Editorial Title */}
        <section className="mb-12">
          <h2 className="text-5xl font-headline font-bold tracking-tight text-primary mb-4 leading-none">My Bookings</h2>
          <p className="text-secondary max-w-2xl text-lg font-light">Manage your reserved workspaces and meeting environments with the precision of a digital concierge.</p>
        </section>

        {/* Pill Filters */}
        <div className="flex items-center space-x-2 mb-10">
          <button onClick={() => setFilter('upcoming')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${filter === 'upcoming' ? 'bg-primary text-white shadow-[0_10px_20px_rgba(0,9,27,0.2)]' : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'}`}>Upcoming</button>
          <button onClick={() => setFilter('completed')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${filter === 'completed' ? 'bg-primary text-white shadow-[0_10px_20px_rgba(0,9,27,0.2)]' : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'}`}>Completed</button>
          <button onClick={() => setFilter('cancelled')} className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-colors ${filter === 'cancelled' ? 'bg-primary text-white shadow-[0_10px_20px_rgba(0,9,27,0.2)]' : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'}`}>Cancelled</button>
        </div>

        {/* Bookings Bento Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium">Loading your bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="col-span-full py-12 text-center text-slate-500 font-medium">No bookings found.</div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="group bg-surface-container-lowest rounded-xl p-6 shadow-[0_20px_40px_rgba(0,27,60,0.06)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center space-x-3">
                      {booking.status === 'pending' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-1 rounded">Pending Payment</span>
                        </>
                      )}
                      {booking.status === 'reserved' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-700 bg-blue-100 px-2 py-1 rounded">Reserved (COD)</span>
                        </>
                      )}
                      {booking.status === 'confirmed' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-tertiary-fixed shadow-[0_0_10px_#b6efcf]"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-on-tertiary-container bg-tertiary-container/10 px-2 py-1 rounded">Confirmed</span>
                        </>
                      )}
                      {booking.status === 'awaiting_verification' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-700 bg-purple-100 px-2 py-1 rounded">Awaiting Verif.</span>
                        </>
                      )}
                      {(booking.status === 'waiting_checkout' || booking.status === 'overdue') && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_#fbd38d]"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-orange-700 bg-orange-100 px-2 py-1 rounded">Overtime</span>
                        </>
                      )}
                      {booking.status === 'completed' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-2 py-1 rounded">Completed</span>
                        </>
                      )}
                      {booking.status === 'cancelled' && (
                        <>
                          <div className="w-3 h-3 rounded-full bg-error"></div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-error bg-error-container/20 px-2 py-1 rounded">Cancelled</span>
                        </>
                      )}
                    </div>
                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors cursor-pointer">more_vert</span>
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-primary mb-2 tracking-tight">{booking.title}</h3>
                  {(booking.user || booking.onBehalfOf) && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {booking.user && (
                        <div className="text-xs font-bold inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-lg">
                          <span className="material-symbols-outlined text-sm text-slate-500">person</span>
                          <span className="text-slate-600">{booking.user.name}</span>
                        </div>
                      )}
                      {booking.onBehalfOf && (
                        <div className="text-xs font-bold inline-flex items-center gap-1.5 bg-blue-50 px-3 py-1.5 rounded-lg">
                          <span className="material-symbols-outlined text-sm text-blue-500">badge</span>
                          <span className="text-blue-600">Atas Nama: {booking.onBehalfOf}</span>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-secondary-fixed-variant text-sm">
                      <span className="material-symbols-outlined text-base mr-2">meeting_room</span>
                      <span className="font-medium">{booking.room?.name || 'Unknown Room'} · Floor {booking.room?.floor || '-'}</span>
                    </div>
                    <div className="flex items-center text-secondary-fixed-variant text-sm">
                      <span className="material-symbols-outlined text-base mr-2">calendar_today</span>
                      <span className="font-medium">{new Date(booking.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center text-secondary-fixed-variant text-sm">
                      <span className="material-symbols-outlined text-base mr-2">schedule</span>
                      <span className="font-medium">{booking.startTime.substring(0, 5)} — {booking.endTime.substring(0, 5)}</span>
                    </div>
                    <div className="flex items-center text-secondary-fixed-variant text-sm">
                      <span className="material-symbols-outlined text-base mr-2">groups</span>
                      <span className="font-medium">{booking.attendees} Participants</span>
                    </div>
                    {booking.totalPrice && (
                      <div className="flex items-center text-secondary-fixed-variant text-sm">
                        <span className="material-symbols-outlined text-base mr-2">payments</span>
                        <span className="font-medium font-bold text-slate-700">{formatRupiah(booking.totalPrice)}</span>
                      </div>
                    )}
                    {Number(booking.penaltyAmount) > 0 && (
                      <div className="flex items-center text-error text-sm font-bold">
                        <span className="material-symbols-outlined text-base mr-2">warning</span>
                        <span>Penalty: {formatRupiah(booking.penaltyAmount)}</span>
                      </div>
                    )}
                  </div>
                </div>
                {['pending', 'reserved', 'confirmed', 'waiting_checkout', 'overdue', 'awaiting_verification'].includes(booking.status) && (
                  <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-slate-50">
                    {booking.status === 'pending' && (
                      <button onClick={() => handleAction(booking.id, 'pay')} className="bg-primary text-white font-semibold text-sm transition-all hover:bg-primary/90 px-6 py-2 rounded-lg shadow-md">Pay Now</button>
                    )}
                    {(booking.status === 'confirmed' || booking.status === 'waiting_checkout' || booking.status === 'overdue') && (
                      <button onClick={() => handleAction(booking.id, 'user-checkout')} className="bg-primary text-white font-semibold text-sm transition-all hover:bg-primary/90 px-6 py-2 rounded-lg shadow-md">Selesai & Keluar</button>
                    )}
                    {user?.role === 'admin' && booking.status === 'reserved' && (
                      <button onClick={() => handleAction(booking.id, 'checkin')} className="bg-tertiary-fixed text-on-tertiary-container font-semibold text-sm transition-all hover:brightness-95 px-6 py-2 rounded-lg shadow-md">Check-in</button>
                    )}
                    {user?.role === 'admin' && booking.status === 'awaiting_verification' && (
                      <button onClick={() => handleAction(booking.id, 'approve-checkout')} className="bg-tertiary-fixed text-on-tertiary-container font-semibold text-sm transition-all hover:brightness-95 px-6 py-2 rounded-lg shadow-md">Approve Checkout</button>
                    )}
                    <button 
                      onClick={() => handleAction(booking.id, 'cancel')}
                      className="text-error ml-auto border border-error/20 hover:bg-error-container/10 font-semibold text-sm px-6 py-2 rounded-lg transition-all"
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))
          )}

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
