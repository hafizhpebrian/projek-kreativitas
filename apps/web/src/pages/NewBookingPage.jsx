import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi, API_BASE } from '../lib/api';
import { formatRupiah } from '../lib/formatRupiah';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function NewBookingPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  
  const [rooms, setRooms] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    title: '',
    roomId: '',
    attendees: 1,
    date: new Date().toISOString().split('T')[0],
    startTime: '09:00',
    endTime: '10:00',
    notes: '',
    isPrivate: false,
    paymentMethod: 'online',
    onBehalfOf: ''
  });

  useEffect(() => {
    async function loadRooms() {
      try {
        const res = await fetchApi('/rooms');
        if (res.ok) {
          const resData = await res.json();
          // The API returns { data: [...], pagination: {...} }
          const roomList = Array.isArray(resData) ? resData : (resData.data || []);
          const activeRooms = roomList.filter(r => r.status === 'available' || r.status === 'active');
          setRooms(activeRooms);
          
          // Use roomId from URL query param if present, otherwise default to first room
          const urlRoomId = searchParams.get('roomId');
          const targetRoom = urlRoomId && activeRooms.find(r => r.id === urlRoomId);
          if (targetRoom) {
            setFormData(prev => ({ ...prev, roomId: targetRoom.id }));
          } else if (activeRooms.length > 0) {
            setFormData(prev => ({ ...prev, roomId: activeRooms[0].id }));
          }
        }
      } catch (err) {
        console.error('Failed to load rooms:', err);
      }
    }
    loadRooms();
  }, [searchParams]);

  useEffect(() => {
    if (!formData.roomId || !formData.date) return;
    async function loadSchedule() {
      try {
        const res = await fetchApi(`/rooms/${formData.roomId}/availability?date=${formData.date}`);
        if (res.ok) {
          const data = await res.json();
          setSchedule(data.bookings || []);
        }
      } catch(e) {
        console.error("Failed to load schedule", e);
      }
    }
    loadSchedule();
  }, [formData.roomId, formData.date]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectedRoom = rooms.find(r => r.id === formData.roomId) || null;

  const parseTime = (timeStr) => {
    if (!timeStr) return 0;
    const [h, m] = timeStr.split(':').map(Number);
    return h + (m / 60);
  };
  const startHrs = parseTime(formData.startTime);
  const endHrs = parseTime(formData.endTime);
  const duration = Math.max(0, endHrs - startHrs);
  const leftPct = Math.max(0, Math.min(100, ((startHrs - 8) / 12) * 100));
  const widthPct = Math.max(0, Math.min(100, (duration / 12) * 100));

  let hasConflict = false;
  const occupiedBlocks = schedule.map(b => {
    const bStart = parseTime(b.startTime);
    const bEnd = parseTime(b.endTime);
    if (startHrs < bEnd && endHrs > bStart) {
      hasConflict = true;
    }
    const bLeft = Math.max(0, Math.min(100, ((bStart - 8) / 12) * 100));
    const bWidth = Math.max(0, Math.min(100, ((bEnd - bStart) / 12) * 100));
    return { left: bLeft, width: bWidth, id: b.id };
  });

  const estimatedTotal = selectedRoom?.hourlyRate ? (duration * Number(selectedRoom.hourlyRate)).toFixed(2) : '0.00';
  const badgeStatus = hasConflict ? "Unavailable" : (selectedRoom?.status === 'active' || selectedRoom?.status === 'available' ? 'Available' : selectedRoom?.status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload = {
        ...formData,
        attendees: Number(formData.attendees)
      };

      // Remove empty onBehalfOf
      if (!payload.onBehalfOf) delete payload.onBehalfOf;

      if (selectedRoom && payload.attendees > selectedRoom.capacity) {
        setError(`Attendance exceeds maximum capacity of ${selectedRoom.capacity} for ${selectedRoom.name}.`);
        setLoading(false);
        return;
      }

      if (payload.startTime >= payload.endTime) {
        setError('End time must be after start time.');
        setLoading(false);
        return;
      }

      if (hasConflict) {
        setError('The selected time slot conflicts with an existing booking.');
        setLoading(false);
        return;
      }

      const res = await fetchApi('/bookings', {
        method: 'POST',
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        navigate('/bookings');
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to create booking');
      }
    } catch (err) {
      console.error(err);
      setError('Network error occurred while booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface flex min-h-screen font-body">
      {/* SideNavBar */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="flex-1 ml-0 lg:ml-64 min-h-screen flex flex-col">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md z-40 flex items-center justify-between pl-16 pr-4 lg:px-8 text-on-surface">
          <div className="flex-1 max-w-md">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full bg-surface-container border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest transition-all group-focus-within:shadow-lg outline-none text-on-surface" placeholder="Search rooms or reservations..." type="text"/>
            </div>
          </div>
          <TopRightNav />
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
            <h1 className="text-4xl font-extrabold tracking-tight font-headline text-primary">{t('newBooking.title')}</h1>
            <p className="text-on-surface-variant mt-2 text-lg">{t('newBooking.subtitle')}</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-error font-medium rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              {error}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Panel: Form */}
            <div className="lg:col-span-7 bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] p-8">
              <form id="booking-form" className="space-y-8" onSubmit={handleSubmit}>
                {/* Meeting Title */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.meetingTitle')}</label>
                  <input name="title" value={formData.title} onChange={handleChange} required className="w-full bg-surface-container border-none rounded-xl py-4 px-5 text-on-surface focus:ring-0 focus:bg-white focus:shadow-md transition-all placeholder:text-outline/50 outline-none text-sm" placeholder={t('newBooking.meetingTitlePlaceholder')} type="text"/>
                </div>

                {/* Atas Nama — Admin Only */}
                {user?.role === 'admin' && (
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.onBehalfOf')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">person</span>
                      <input name="onBehalfOf" value={formData.onBehalfOf} onChange={handleChange} className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 focus:bg-white focus:shadow-md transition-all placeholder:text-outline/50 outline-none text-sm" placeholder="e.g. Budi Santoso" type="text"/>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Room Selector */}
                  <div className="relative">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.selectRoom')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">meeting_room</span>
                      <select name="roomId" value={formData.roomId} onChange={handleChange} required className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-10 text-on-surface focus:ring-0 appearance-none cursor-pointer outline-none text-sm">
                        {rooms.length === 0 && <option value="">No rooms available</option>}
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>{room.name}</option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>

                  {/* Capacity Indicator */}
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.attendees')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">groups</span>
                      <input name="attendees" value={formData.attendees} onChange={handleChange} required min="1" className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-20 text-on-surface focus:ring-0 transition-all outline-none text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" placeholder="8" type="number"/>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 px-2 py-1 bg-tertiary-container/10 rounded-md pointer-events-none">
                        <span className="text-[10px] font-bold text-on-tertiary-container uppercase tracking-tight">Max {selectedRoom?.capacity || '-'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.date')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">calendar_today</span>
                      <input name="date" value={formData.date} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} required className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm cursor-pointer" type="date"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.startTime')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">schedule</span>
                      <input name="startTime" value={formData.startTime} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} required className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm cursor-pointer" type="time"/>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.endTime')}</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">schedule</span>
                      <input name="endTime" value={formData.endTime} onChange={handleChange} onClick={(e) => e.target.showPicker && e.target.showPicker()} required className="w-full bg-surface-container border-none rounded-xl py-4 pl-12 pr-5 text-on-surface focus:ring-0 transition-all outline-none text-sm cursor-pointer" type="time"/>
                    </div>
                  </div>
                </div>

                {/* Notes Area */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.notes')}</label>
                  <textarea name="notes" value={formData.notes} onChange={handleChange} className="w-full bg-surface-container border-none rounded-xl py-4 px-5 text-on-surface focus:ring-0 focus:bg-white transition-all placeholder:text-outline/50 resize-none outline-none text-sm" placeholder={t('newBooking.notesPlaceholder')} rows="4"></textarea>
                </div>

                {/* Privacy Mode */}
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl mb-6">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">visibility</span>
                    <div>
                      <div className="text-sm font-bold text-on-surface">Privacy Mode</div>
                      <div className="text-xs text-on-surface-variant">Hide meeting title from public dashboards</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input name="isPrivate" checked={formData.isPrivate} onChange={handleChange} className="sr-only peer" type="checkbox"/>
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
                  </label>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-2 ml-1">{t('newBooking.paymentMethod')}</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className={`relative flex cursor-pointer rounded-xl px-5 py-4 border-2 transition-all ${formData.paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-surface-container bg-surface-container-low'}`}>
                      <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleChange} className="sr-only" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">credit_card</span> Online Transfer</span>
                        <span className="text-xs text-on-surface-variant mt-1">Pay now, 15 min expiry</span>
                      </div>
                    </label>
                    <label className={`relative flex cursor-pointer rounded-xl px-5 py-4 border-2 transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-surface-container bg-surface-container-low'}`}>
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="sr-only" />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-base text-primary">store</span> Pay at Location</span>
                        <span className="text-xs text-on-surface-variant mt-1">Admin verification needed</span>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            </div>

            {/* Right Panel: Preview & Timeline */}
            <div className="lg:col-span-5 space-y-6 flex flex-col">
              {/* Room Preview Card */}
              {selectedRoom ? (
                <div className="bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden">
                  <div className="relative h-56 group">
                    <img alt="Room Preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src={selectedRoom.images?.[0]?.filePath ? `${API_BASE}/${selectedRoom.images[0].filePath.replace(/\\/g, '/')}` : "https://lh3.googleusercontent.com/aida-public/AB6AXuAtW-a4B8AWinhgNVhKGOI0rogdt8_IoVTi0cOVqJw-oyal9dMvJ_kth8TB428Q6WJ5powRx0cMW9q2GpJOnU91o3GEGua3kfrNLdwjplQAO7HCv57EKR7SIk30FPttM7lezn5sqLhrDd7Hw8PVmGDp4PV_6Hv5Aa6UpXVVQc6zZtBRk2u5Q0SLfMFd4KYc9idle8dfjGV58z5EvMCtf3M8qFzkLJPlW1_yppb4Ao9xItr2fb85O-Sox_yQ5UFiCmFrQ0poYbakPpA"}/>
                    <div className="absolute top-4 right-4 bg-tertiary-container text-tertiary-fixed text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                      {badgeStatus}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold font-headline">{selectedRoom.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-white/80 text-sm">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">groups</span> {selectedRoom.capacity} Max</span>
                        {selectedRoom.roomAmenities?.slice(0, 2).map((a, i) => (
                          <span key={i} className="flex items-center gap-1 capitalize">
                            <span className="material-symbols-outlined text-sm">{a.amenity.icon}</span> {a.amenity.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-on-surface-variant font-medium">{t('newBooking.ratePerHour')}</span>
                      <span className="text-primary font-extrabold text-lg">{formatRupiah(selectedRoom.hourlyRate || 0)} / hr</span>
                    </div>
                    <div className="pt-4 border-t border-outline-variant/20 flex flex-col gap-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-on-surface-variant">Estimated Total ({duration.toFixed(1)}h)</span>
                        <span className="text-primary font-bold">{formatRupiah(estimatedTotal)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-lowest rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,27,60,0.06)] overflow-hidden p-12 text-center text-slate-500">
                  Select a room to see details
                </div>
              )}

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
                    {/* Render Occupied Blocks */}
                    {occupiedBlocks.map(block => (
                      <div key={block.id} className="absolute h-full bg-error/30 group z-0" style={{ left: `${block.left}%`, width: `${block.width}%` }}>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-[8px] font-bold text-error">OCCUPIED</span>
                        </div>
                      </div>
                    ))}
                    
                    {/* Render Selected Slot */}
                    <div className={`absolute h-full ${hasConflict ? 'bg-error' : 'bg-primary-container'} group shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] z-10 transition-all`} style={{ left: `${leftPct}%`, width: `${widthPct}%` }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-white tracking-widest">{hasConflict ? 'CONFLICT' : 'SELECTED'}</span>
                      </div>
                    </div>
                  </div>
                  {/* Legend */}
                  <div className="flex gap-4 text-xs font-medium text-on-surface-variant pt-2">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-primary-container"></div>
                      <span>{t('newBooking.yourSlot')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-error/30"></div>
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
              {t('common.cancel')}
            </button>
            <button form="booking-form" type="submit" disabled={loading} className="w-full sm:w-auto px-12 py-4 bg-gradient-to-br from-primary to-primary-container text-white font-bold rounded-xl shadow-[0_10px_20px_rgba(0,9,27,0.2)] hover:shadow-[0_15px_30px_rgba(0,9,27,0.3)] transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[20px]">{loading ? 'hourglass_empty' : 'calendar_add_on'}</span>
              {loading ? t('newBooking.booking') : t('newBooking.confirmBooking')}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
