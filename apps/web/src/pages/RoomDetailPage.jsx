import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { fetchApi, API_BASE } from '../lib/api';
import { formatRupiah } from '../lib/formatRupiah';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';

export default function RoomDetailPage() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [isCurrentlyBooked, setIsCurrentlyBooked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Poll for date change every minute to auto-refresh Today's Schedule on day change
  useEffect(() => {
    const interval = setInterval(() => {
      const today = new Date().toISOString().split('T')[0];
      if (today !== currentDate) {
        setCurrentDate(today);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [currentDate]);

  const loadRoom = async () => {
    try {
      setLoading(true);
      // Fetch room detail and today's schedule concurrently
      const [roomRes, scheduleRes] = await Promise.all([
        fetchApi(`/rooms/${id}`),
        fetchApi(`/rooms/${id}/schedule?date=${currentDate}`)
      ]);

        if (roomRes.ok) {
          const roomData = await roomRes.json();
          setRoom(roomData);
          setEditData({
            name: roomData.name,
            floor: roomData.floor,
            capacity: roomData.capacity,
            hourlyRate: roomData.hourlyRate || '',
            description: roomData.description || '',
            status: roomData.status
          });
        } else {
          console.error('Room not found');
        }

        if (scheduleRes.ok) {
          const scheduleData = await scheduleRes.json();
          setSchedule(scheduleData);
          
          // Determine if currently booked
          const now = new Date();
          const currentHour = now.getHours().toString().padStart(2, '0');
          const currentMin = now.getMinutes().toString().padStart(2, '0');
          const currentTime = `${currentHour}:${currentMin}:00`;
          
          const isBooked = scheduleData.some(b => currentTime >= b.startTime && currentTime <= b.endTime);
          setIsCurrentlyBooked(isBooked);
        }
      } catch (error) {
        console.error('Failed to load room details:', error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    if (id) loadRoom();
  }, [id, currentDate]);

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: editData.name,
        floor: editData.floor,
        capacity: parseInt(editData.capacity, 10),
        hourlyRate: editData.hourlyRate.toString(),
        description: editData.description,
        status: editData.status
      };
      const res = await fetchApi(`/rooms/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        // Upload new images if selected
        if (imageFiles.length > 0) {
          // Delete all existing images to replace them
          if (room?.images && room.images.length > 0) {
            await Promise.all(
              room.images.map(img => 
                fetchApi(`/rooms/${id}/images/${img.id}`, { method: 'DELETE' })
              )
            );
          }
          
          // Upload all selected images
          for (let i = 0; i < imageFiles.length; i++) {
            const formData = new FormData();
            formData.append('image', imageFiles[i]);
            formData.append('order', i.toString()); // preserve order
            
            const uploadRes = await fetchApi(`/rooms/${id}/images`, {
              method: 'POST',
              body: formData
            });
            
            if (!uploadRes.ok) {
              console.error(`Failed to upload image ${i+1}`);
            }
          }
          
          setImageFiles([]); // Reset after upload
        }

        setIsEditModalOpen(false);
        loadRoom();
        showToast(t('roomDetail.updateSuccess'), 'success');
      } else {
        showToast(t('roomDetail.updateFailed'), 'error');
      }
    } catch (error) {
      console.error('Failed to update room', error);
      showToast(t('roomDetail.updateError'), 'error');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface antialiased min-h-screen flex">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-20 right-8 z-[100] px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3
          ${toast.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 
            'bg-red-50 text-red-800 border border-red-200'}`}
          style={{ animation: 'slideIn 0.3s ease-out' }}
        >
          <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="font-semibold text-sm max-w-xs">{toast.message}</span>
          <button onClick={() => setToast(null)} className="ml-2 opacity-50 hover:opacity-100 transition-opacity">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      )}
      {/* SideNavBar Shell */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="flex-1 ml-0 lg:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar Shell */}
        <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 z-40 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8">
          <div className="flex items-center flex-1">
            <div className="relative w-96">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-lg border-none focus:ring-0 focus:bg-surface-container-lowest transition-all text-sm placeholder:text-slate-400 outline-none" placeholder={t('roomDetail.searchPlaceholder')} type="text"/>
            </div>
          </div>
          <TopRightNav />
      </header>

        {/* Main Content Canvas */}
        <main className="mt-16 p-10 flex-1">
          {/* Breadcrumb & Title Section */}
          <div className="flex flex-col mb-10">
            <nav className="flex items-center gap-2 mb-4 text-[10px] uppercase tracking-widest text-slate-400 font-label">
              <button onClick={() => navigate('/rooms')} className="hover:text-primary transition-colors">{t('roomDetail.rooms')}</button>
              <span className="material-symbols-outlined text-[12px]">chevron_right</span>
              <span className="text-primary font-bold">{t('roomDetail.roomDetailTitle')}</span>
            </nav>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-12 w-64 bg-slate-200 rounded-lg mb-4"></div>
                <div className="flex gap-4">
                  <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                  <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
                </div>
              </div>
            ) : !room ? (
              <div>
                <h2 className="text-3xl font-bold text-slate-500">{t('roomDetail.roomNotFound')}</h2>
              </div>
            ) : (
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-5xl font-bold tracking-tight text-primary font-headline mb-2 leading-tight">{room.name}</h2>
                  <div className="flex items-center gap-4">
                    {room.status === 'active' ? (
                      !isCurrentlyBooked ? (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-tertiary-container text-tertiary-fixed rounded-full text-xs font-bold font-label tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed"></span>
                          {t('roomDetail.available')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-3 py-1 bg-error-container text-error rounded-full text-xs font-bold font-label tracking-wide">
                          <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                          {t('roomDetail.unavailableBooked')}
                        </span>
                      )
                    ) : (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-surface-container-high text-slate-500 rounded-full text-xs font-bold font-label tracking-wide">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        {t('roomDetail.closed')}
                      </span>
                    )}
                    <div className="flex items-center gap-4 text-slate-500 text-sm">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">layers</span>{room.floor || t('roomDetail.general')}</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">groups</span>{room.capacity} {t('roomDetail.seats')}</span>
                      {room.hourlyRate && (
                        <div className="flex items-center gap-1 font-bold text-slate-800 dark:text-slate-200">
                          <span className="material-symbols-outlined text-[16px]">payments</span>{formatRupiah(room.hourlyRate)}{t('roomDetail.hr')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {user?.role === 'admin' && (
                    <button onClick={() => setIsEditModalOpen(true)} className="bg-surface-container-high text-on-surface px-6 py-4 rounded-xl font-bold tracking-tight hover:bg-surface-container-highest transition-all active:scale-95 duration-200">
                      {t('roomDetail.edit')}
                    </button>
                  )}
                  <button onClick={() => navigate(`/bookings/new?roomId=${room.id}`)} disabled={room.status !== 'active'} className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold tracking-tight shadow-[0_20px_40px_rgba(0,27,60,0.15)] hover:shadow-[0_30px_60px_rgba(0,27,60,0.2)] transition-all active:scale-95 duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                    {room.status === 'active' ? t('roomDetail.bookNow') : t('roomDetail.closedBtn')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {!loading && room && (
            <div className="grid grid-cols-12 gap-8">
              {/* Gallery Grid (Bento Style) */}
              <div className="col-span-12 lg:col-span-8 space-y-6">
                <div className="grid grid-cols-4 grid-rows-2 gap-4 h-[500px]">
                  <div className="col-span-3 row-span-2 relative group overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)] bg-slate-100">
                    {room.images && room.images.length > 0 ? (
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={`${API_BASE}/${room.images[0].filePath.replace(/\\/g, '/')}`} alt={room.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <span className="material-symbols-outlined text-6xl">meeting_room</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-xl shadow-sm bg-slate-100">
                    {room.images && room.images.length > 1 ? (
                      <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={`${API_BASE}/${room.images[1].filePath.replace(/\\/g, '/')}`} alt={`${room.name} View 2`}/>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <span className="material-symbols-outlined text-4xl">photo</span>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1 row-span-1 relative group overflow-hidden rounded-xl shadow-sm bg-slate-100">
                    {room.images && room.images.length > 2 ? (
                      <div className="w-full h-full relative cursor-pointer" onClick={() => setLightboxIndex(2)}>
                        <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={`${API_BASE}/${room.images[2].filePath.replace(/\\/g, '/')}`} alt={`${room.name} View 3`}/>
                        {room.images.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center hover:bg-black/40 transition-colors">
                            <span className="text-white font-bold text-lg">+{room.images.length - 3} {t('roomDetail.photos')}</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-200">
                        <span className="material-symbols-outlined text-4xl">photo</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Timeline Section */}
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-primary font-headline">{t('roomDetail.todaysSchedule')}</h3>
                    <div className="flex items-center gap-4 text-xs font-label text-slate-400">
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-surface-container"></span> {t('roomDetail.availableStatus')}</div>
                      <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-primary"></span> {t('roomDetail.bookedStatus')}</div>
                    </div>
                  </div>
                  <div className="relative pt-6">
                    {/* Timeline Labels */}
                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-400 mb-2 font-label">
                      <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span><span>20:00</span>
                    </div>
                    {/* Timeline Bar */}
                    <div className="h-12 w-full bg-surface-container rounded-full overflow-hidden flex relative">
                      {schedule.map((booking, idx) => {
                        const parseTime = (t) => {
                          const [h, m] = t.split(':').map(Number);
                          return h + m / 60;
                        };
                        const start = parseTime(booking.startTime);
                        const end = parseTime(booking.endTime);
                        if (end <= 8 || start >= 20) return null; // Outside display bounds
                        
                        const clampedStart = Math.max(8, start);
                        const clampedEnd = Math.min(20, end);
                        const leftPerc = ((clampedStart - 8) / 12) * 100;
                        const widthPerc = ((clampedEnd - clampedStart) / 12) * 100;
                        
                        return (
                          <div 
                            key={idx} 
                            className="absolute h-full bg-primary border-r border-white/20 last:border-0 hover:bg-primary/90 transition-colors group cursor-help"
                            style={{ left: `${leftPerc}%`, width: `${widthPerc}%` }}
                          >
                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-container-high text-on-surface px-3 py-1.5 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg z-10">
                              {booking.startTime.substring(0, 5)} - {booking.endTime.substring(0, 5)} <span className="font-normal text-slate-500 block text-[10px] mt-0.5">{booking.user?.name || 'Booked'}</span>
                            </div>
                          </div>
                        );
                      })}
                      
                      {/* Current Time Indicator */}
                      {(() => {
                        const now = new Date();
                        const h = now.getHours() + now.getMinutes() / 60;
                        if (h >= 8 && h <= 20) {
                          const leftPerc = ((h - 8) / 12) * 100;
                          return (
                            <div className="absolute top-0 bottom-0 w-0.5 bg-error z-20" style={{ left: `${leftPerc}%` }}>
                              <div className="w-2 h-2 rounded-full bg-error absolute -top-1 -left-[3px]"></div>
                            </div>
                          );
                        }
                        return null;
                      })()}
                    </div>
                  </div>
                </div>
              </div>
  
              {/* Side Info Panel */}
              <div className="col-span-12 lg:col-span-4 space-y-6">
                <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.06)]">
                  <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-label font-bold mb-4">{t('roomDetail.roomFacilities')}</h3>
                  <div className="flex flex-wrap gap-2">
                    {room.roomAmenities && room.roomAmenities.length > 0 ? room.roomAmenities.map((ra) => (
                      <span key={ra.amenity.id} className="flex items-center gap-2 px-3 py-2 bg-surface-container-low rounded-lg text-sm text-slate-600 border border-outline-variant/30 font-medium">
                        <span className="material-symbols-outlined text-[18px]">{ra.amenity.icon || 'star'}</span>
                        {ra.amenity.name}
                      </span>
                    )) : (
                      <span className="text-sm text-slate-400">{t('roomDetail.noFacilities')}</span>
                    )}
                  </div>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-[0_20px_40px_rgba(0,27,60,0.04)] border border-outline-variant/20">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-label font-bold mb-3">{t('roomDetail.aboutRoom')}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {room.description || t('roomDetail.noDescription')}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-label font-bold mb-3">{t('roomDetail.locationDetail')}</h3>
                      <p className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="material-symbols-outlined text-[18px] text-slate-400 mt-0.5">location_on</span>
                        {room.location || room.floor || t('roomDetail.generalFloor')}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[10px] uppercase tracking-widest text-slate-400 font-label font-bold mb-3">{t('roomDetail.houseRules')}</h3>
                      <ul className="space-y-2 text-sm text-slate-600">
                        {room.rules && room.rules.length > 0 ? (
                          room.rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-2 before:content-['•'] before:text-slate-400">{rule}</li>
                          ))
                        ) : (
                          <>
                            <li className="flex items-start gap-2 before:content-['•'] before:text-slate-400">{t('roomDetail.rule1')}</li>
                            <li className="flex items-start gap-2 before:content-['•'] before:text-slate-400">{t('roomDetail.rule2')}</li>
                            <li className="flex items-start gap-2 before:content-['•'] before:text-slate-400">{t('roomDetail.rule3')}</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lightbox Gallery */}
      {lightboxIndex >= 0 && room?.images && room.images.length > 0 && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col">
          <div className="flex justify-between items-center p-6 absolute top-0 w-full z-10">
            <div className="text-white/60 text-sm font-medium tracking-widest uppercase">
              {lightboxIndex + 1} / {room.images.length}
            </div>
            <button 
              onClick={() => setLightboxIndex(-1)}
              className="text-white hover:text-error transition-colors p-2 rounded-full bg-white/10 hover:bg-white/20"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          
          <div className="flex-1 flex items-center justify-center relative px-12">
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev > 0 ? prev - 1 : room.images.length - 1)); }}
              className="absolute left-6 text-white/50 hover:text-white hover:scale-110 transition-all p-4"
            >
              <span className="material-symbols-outlined text-4xl">chevron_left</span>
            </button>
            
            <img 
              src={`${API_BASE}/${room.images[lightboxIndex].filePath.replace(/\\/g, '/')}`} 
              alt="Gallery Preview" 
              className="max-h-[85vh] max-w-[85vw] object-contain rounded-lg shadow-2xl"
            />
            
            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev < room.images.length - 1 ? prev + 1 : 0)); }}
              className="absolute right-6 text-white/50 hover:text-white hover:scale-110 transition-all p-4"
            >
              <span className="material-symbols-outlined text-4xl">chevron_right</span>
            </button>
          </div>
          
          <div className="p-6 flex justify-center gap-2 overflow-x-auto">
            {room.images.map((img, idx) => (
              <button 
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className={`h-16 w-24 rounded-md overflow-hidden transition-all ${idx === lightboxIndex ? 'ring-2 ring-primary scale-105 opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >
                <img src={`${API_BASE}/${img.filePath.replace(/\\/g, '/')}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Floating Action for Mobile (Hidden on Desktop) */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
        <button onClick={() => navigate('/bookings/new')} className="w-full bg-primary text-white py-4 rounded-xl font-bold shadow-2xl backdrop-blur-md flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">bolt</span>
          {t('roomDetail.instantBooking')}
        </button>
      </div>

      {/* Edit Room Modal */}
      {isEditModalOpen && editData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="bg-surface relative z-10 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between bg-surface-container-lowest">
              <div>
                <h3 className="text-2xl font-bold text-primary">{t('roomDetail.editRoom')}</h3>
                <p className="text-sm text-slate-500 mt-1">{t('roomDetail.updateDetails')} {room.name}</p>
              </div>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600 bg-surface-container hover:bg-surface-container-high p-2 rounded-full transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto flex-1">
              <form id="editRoomForm" onSubmit={handleUpdateRoom} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.roomName')}</label>
                    <input 
                      required
                      value={editData.name}
                      onChange={(e) => setEditData({...editData, name: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.locationFloor')}</label>
                    <input 
                      required
                      value={editData.floor}
                      onChange={(e) => setEditData({...editData, floor: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.capacity')}</label>
                    <input 
                      type="number"
                      required min="1"
                      value={editData.capacity}
                      onChange={(e) => setEditData({...editData, capacity: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.hourlyRate')}</label>
                    <input 
                      type="number"
                      min="0" step="10000"
                      value={editData.hourlyRate}
                      onChange={(e) => setEditData({...editData, hourlyRate: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.status')}</label>
                    <select 
                      value={editData.status}
                      onChange={(e) => setEditData({...editData, status: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      <option value="active">{t('roomDetail.statusActive')}</option>
                      <option value="inactive">{t('roomDetail.statusInactive')}</option>
                      <option value="maintenance">{t('roomDetail.statusMaintenance')}</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.description')}</label>
                  <textarea 
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    className="w-full bg-surface-container border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none min-h-[100px]" 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t('roomDetail.roomImages')}</label>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-4">
                      {/* Show existing images if no new files selected */}
                      {room?.images && room.images.length > 0 && imageFiles.length === 0 && (
                        room.images.map((img, idx) => (
                          <img key={img.id || idx} src={`${API_BASE}/${img.filePath.replace(/\\/g, '/')}`} alt={`Current ${idx+1}`} className="w-16 h-16 object-cover rounded-xl border border-surface-container-high" />
                        ))
                      )}
                      
                      {/* Show new selected image previews */}
                      {imageFiles.length > 0 && (
                        imageFiles.map((file, idx) => (
                          <img key={idx} src={URL.createObjectURL(file)} alt={`Preview ${idx+1}`} className="w-16 h-16 object-cover rounded-xl border border-primary" />
                        ))
                      )}
                    </div>
                    
                    <input 
                      type="file" 
                      multiple
                      accept="image/*"
                      onChange={(e) => setImageFiles(Array.from(e.target.files))}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 cursor-pointer"
                    />
                    <p className="text-xs text-slate-400">{t('roomDetail.uploadWarning')}</p>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-surface-container bg-surface-container-lowest flex justify-end gap-3">
              <button onClick={() => setIsEditModalOpen(false)} className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-surface-container transition-colors">
                {t('roomDetail.cancel')}
              </button>
              <button type="submit" form="editRoomForm" className="px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                {t('roomDetail.saveChanges')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
