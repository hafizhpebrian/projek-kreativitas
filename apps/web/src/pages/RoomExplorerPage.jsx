import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { fetchApi, API_BASE } from '../lib/api';
import { formatRupiah } from '../lib/formatRupiah';
import TopRightNav from '../components/TopRightNav';
import Sidebar from '../components/Sidebar';
import { useTranslation } from 'react-i18next';

export default function RoomExplorerPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isAddRoomModalOpen, setIsAddRoomModalOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ isOpen: false, roomId: null, roomName: '' });

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterFloor, setFilterFloor] = useState('All Floors');
  const [filterCapacity, setFilterCapacity] = useState('Any Capacity');
  const [filterAmenities, setFilterAmenities] = useState([]);

  // Add Room Form State
  const [newRoomData, setNewRoomData] = useState({
    name: '',
    floor_level: 'Ground Floor',
    capacity: 10,
    hourlyRate: 100000,
    facilities: [], // Will store amenity IDs
    location: '',
    rules: ['Please clean up after use', 'Minimum booking duration: 30 minutes', 'Do not unplug fixed equipment'],
    imageFiles: [],
    imagePreviews: [],
  });

  // Toast Notification State
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });

  const showToast = (message, type = 'info') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const confirmDeleteRoom = (id, name) => {
    setDeleteConfirmation({ isOpen: true, roomId: id, roomName: name });
  };

  const executeDeleteRoom = async () => {
    const { roomId } = deleteConfirmation;
    if (!roomId) return;
    
    try {
      const res = await fetchApi(`/rooms/${roomId}`, { method: 'DELETE' });
      if (res.ok) {
        setRooms((prev) => prev.filter((r) => r.id !== roomId));
        showToast('Room successfully deleted.', 'success');
      } else {
        showToast('Failed to delete room. You might not have permission.', 'error');
      }
    } catch (error) {
      console.error('Failed to delete room:', error);
      showToast('An error occurred while deleting the room.', 'error');
    } finally {
      setDeleteConfirmation({ isOpen: false, roomId: null, roomName: '' });
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [roomsRes, amenitiesRes] = await Promise.all([
        fetchApi('/rooms'),
        fetchApi('/rooms/amenities')
      ]);
      
      if (roomsRes.ok) {
        const result = await roomsRes.json();
        setRooms(result.data || []);
      }
      
      if (amenitiesRes.ok) {
        const result = await amenitiesRes.json();
        setAmenities(result || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRooms = rooms.filter(room => {
    // 1. Search Query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = room.name.toLowerCase().includes(query);
      const matchesFloor = room.floor?.toLowerCase().includes(query);
      if (!matchesName && !matchesFloor) return false;
    }
    
    // 2. Floor Filter
    if (filterFloor !== 'All Floors') {
      if (room.floor !== filterFloor) return false;
    }
    
    // 3. Capacity Filter
    if (filterCapacity !== 'Any Capacity') {
      const cap = room.capacity;
      if (filterCapacity === '1-4 People' && (cap < 1 || cap > 4)) return false;
      if (filterCapacity === '5-10 People' && (cap < 5 || cap > 10)) return false;
      if (filterCapacity === '10-20 People' && (cap < 10 || cap > 20)) return false;
      if (filterCapacity === '20+ People' && cap < 20) return false;
    }
    
    // 4. Amenities Filter
    if (filterAmenities.length > 0) {
      const roomAmenityIcons = room.roomAmenities?.map(ra => ra.amenity?.icon) || [];
      const hasAll = filterAmenities.every(icon => roomAmenityIcons.includes(icon));
      if (!hasAll) return false;
    }
    
    return true;
  });

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!newRoomData.name) {
      showToast("Room name is required.", "error");
      return;
    }

    try {
      const roomPayload = {
        name: newRoomData.name,
        slug: newRoomData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        floor: newRoomData.floor_level,
        location: newRoomData.location || newRoomData.floor_level,
        capacity: parseInt(newRoomData.capacity, 10),
        hourlyRate: newRoomData.hourlyRate.toString(),
        status: 'active',
        rules: newRoomData.rules,
        amenityIds: newRoomData.facilities,
      };

      const res = await fetchApi('/rooms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roomPayload)
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || errorData.message || 'Failed to create room data');
      }

      const createdData = await res.json();
      const roomId = createdData.id; // Fix: API returns room directly, not wrapped in {data: ...}

      // Handle Image Upload if any
      if (newRoomData.imageFiles && newRoomData.imageFiles.length > 0) {
        await Promise.all(newRoomData.imageFiles.map(async (file, index) => {
          const formData = new FormData();
          formData.append('image', file);
          formData.append('order', index);

          const uploadRes = await fetchApi(`/rooms/${roomId}/images`, {
            method: 'POST',
            body: formData,
          });

          if (!uploadRes.ok) {
            console.error('Failed to upload image:', file.name);
            showToast(`Failed to upload image: ${file.name}`, 'error');
          }
        }));
      }

      // Reset form and close modal
      setIsAddRoomModalOpen(false);
      setNewRoomData({ name: '', floor_level: 'Ground Floor', capacity: 10, facilities: ['Gigabit Fiber'], imageFiles: [], imagePreviews: [] });
      
      showToast(t('roomExplorer.roomCreated'), 'success');
      
      // Refresh rooms list
      await loadRooms();

    } catch (error) {
      console.error('Create room error:', error);
      showToast(error.message || 'An error occurred while creating the room.', 'error');
    }
  };

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      {/* SideNavBar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <main className="ml-0 lg:ml-64 min-h-screen">
        {/* TopNavBar */}
        <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] h-16 bg-slate-50/50 dark:bg-slate-950/50 backdrop-blur-md flex items-center justify-between pl-16 pr-4 lg:px-8 z-40">
          <div className="flex items-center flex-1 max-w-xl">
            <div className="relative w-full group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface-container border-none rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-0 focus:bg-surface-container-lowest focus:shadow-lg transition-all font-body outline-none" 
                placeholder="Search rooms, floors, or equipment..." 
                type="text" 
              />
            </div>
          </div>
          <TopRightNav />
      </header>

        {/* Page Content */}
        <div className="pt-24 px-8 pb-12">
          {/* Page Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-5xl font-headline font-extrabold tracking-tight text-primary mb-2">{t('roomExplorer.title')}</h2>
              <p className="text-on-surface-variant font-body">{t('roomExplorer.subtitle')}</p>
            </div>
            {user?.role === 'admin' && (
              <button onClick={() => setIsAddRoomModalOpen(true)} className="bg-gradient-to-br from-primary to-primary-container text-white px-8 py-4 rounded-xl font-bold shadow-[0_20px_40px_rgba(0,9,27,0.15)] hover:scale-105 transition-all flex items-center gap-2">
                <span className="material-symbols-outlined">add</span>
                {t('roomExplorer.addRoom')}
              </button>
            )}
          </div>

          {/* Filter & Search Bar Section */}
          <section className="mb-8 space-y-6">
            <div className="flex flex-wrap items-center gap-4 bg-surface-container-low p-6 rounded-xl">
              <div className="flex-1 min-w-[300px]">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Location / Floor</label>
                <select 
                  value={filterFloor}
                  onChange={(e) => setFilterFloor(e.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 text-sm focus:ring-0 shadow-sm font-body outline-none"
                >
                  {['All Floors', ...new Set(rooms.map(r => r.floor).filter(Boolean))].map(floor => (
                    <option key={floor} value={floor}>{floor}</option>
                  ))}
                </select>
              </div>
              <div className="w-48">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Capacity</label>
                <select 
                  value={filterCapacity}
                  onChange={(e) => setFilterCapacity(e.target.value)}
                  className="w-full bg-surface-container-lowest border-none rounded-lg py-3 px-4 text-sm focus:ring-0 shadow-sm font-body outline-none"
                >
                  <option value="Any Capacity">Any Capacity</option>
                  <option value="1-4 People">1-4 People</option>
                  <option value="5-10 People">5-10 People</option>
                  <option value="10-20 People">10-20 People</option>
                  <option value="20+ People">20+ People</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1">Amenities</label>
                <div className="flex gap-2">
                  {[
                    { icon: 'tv', label: 'TV' },
                    { icon: 'videocam', label: 'Video Camera' },
                    { icon: 'ac_unit', label: 'AC' },
                    { icon: 'wifi', label: 'WiFi' }
                  ].map((amenity) => {
                    const isActive = filterAmenities.includes(amenity.icon);
                    return (
                      <button 
                        key={amenity.icon}
                        onClick={() => {
                          if (isActive) {
                            setFilterAmenities(prev => prev.filter(a => a !== amenity.icon));
                          } else {
                            setFilterAmenities(prev => [...prev, amenity.icon]);
                          }
                        }}
                        className={`${isActive ? 'bg-primary text-white' : 'bg-surface-container-lowest text-on-surface-variant'} p-3 rounded-lg hover:bg-primary/90 hover:text-white transition-all shadow-sm`}
                        title={amenity.label}
                      >
                        <span className="material-symbols-outlined">{amenity.icon}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Room Grid */}
          {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3,4,5,6].map(i => (
                 <div key={i} className="bg-surface-container-highest rounded-xl h-96 animate-pulse"></div>
               ))}
             </div>
          ) : filteredRooms.length === 0 ? (
             <div className="bg-surface-container-lowest p-12 text-center rounded-xl border border-dashed border-slate-200">
               <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">domain_disabled</span>
               <h3 className="text-xl font-bold text-slate-700">{t('roomExplorer.noRooms')}</h3>
               <p className="text-slate-500 mt-2">{t('roomExplorer.clearFilters')}</p>
             </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <div key={room.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-[0_20px_40px_rgba(0,27,60,0.06)] group hover:shadow-[0_30px_60px_rgba(0,27,60,0.12)] transition-all duration-500 flex flex-col">
                  <div className="relative h-64 overflow-hidden cursor-pointer bg-slate-100" onClick={() => navigate(`/rooms/${room.id}`)}>
                    {room.images && room.images.length > 0 ? (
                       <img alt={room.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={`${API_BASE}/${room.images[0].filePath.replace(/\\/g, '/')}`} />
                    ) : (
                       <div className="w-full h-full flex items-center justify-center text-slate-300">
                         <span className="material-symbols-outlined text-6xl">meeting_room</span>
                       </div>
                    )}
                    <div className="absolute top-4 right-4 flex gap-2">
                      {user?.role === 'admin' && (
                        <button
                          onClick={(e) => { e.stopPropagation(); confirmDeleteRoom(room.id, room.name); }}
                          className="bg-white/90 hover:bg-error hover:text-white text-error p-1.5 rounded-full shadow-lg transition-colors flex items-center justify-center w-8 h-8 backdrop-blur-sm"
                          title="Delete Room"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      )}
                      {room.status === 'active' ? (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-tertiary-container text-tertiary-fixed shadow-lg">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-error-container text-on-error-container shadow-lg">
                          Inactive
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 onClick={() => navigate(`/rooms/${room.id}`)} className="text-2xl font-headline font-bold text-primary tracking-tight cursor-pointer hover:underline line-clamp-1" title={room.name}>{room.name}</h3>
                        <p className="text-sm text-on-surface-variant flex flex-wrap items-center gap-3 mt-2">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">layers</span> {room.floor || 'General'}</span>
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">groups</span> {room.capacity} seats</span>
                          {room.hourlyRate && <span className="flex items-center gap-1 font-bold text-primary"><span className="material-symbols-outlined text-[16px]">payments</span> {formatRupiah(room.hourlyRate)}/hr</span>}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{room.description}</p>
                    
                    <div className="flex gap-4 mb-8 text-on-secondary-container mt-auto">
                      {room.roomAmenities && room.roomAmenities.slice(0, 4).map((link, idx) => (
                        <span key={idx} className="material-symbols-outlined" title={link.amenity.name}>
                          {link.amenity.icon || 'star'}
                        </span>
                      ))}
                      {room.roomAmenities && room.roomAmenities.length > 4 && (
                        <span className="text-xs font-bold text-slate-400 self-center">+{room.roomAmenities.length - 4}</span>
                      )}
                    </div>
                    <div className="flex gap-3">
                      <button onClick={() => navigate(`/bookings/new?roomId=${room.id}`)} className="flex-1 primary-gradient text-white py-3 px-4 rounded-lg font-bold text-sm tracking-wide active:scale-95 transition-transform" disabled={room.status !== 'active'}>
                        {room.status === 'active' ? 'Available' : 'Unavailable'}
                      </button>
                      <button onClick={() => navigate(`/calendar?roomId=${room.id}`)} className="px-4 py-3 rounded-lg text-on-surface font-semibold text-sm hover:bg-surface-container-high transition-colors">
                        <span className="material-symbols-outlined">calendar_today</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-surface/95 backdrop-blur-xl rounded-[2rem] shadow-[0_40px_80px_rgba(0,9,27,0.2)] overflow-hidden flex flex-col md:flex-row border border-white/20">
            {/* Left Side: Visual/Context */}
            <div className="md:w-1/3 bg-primary-container p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-secondary-fixed-dim text-[10px] font-bold tracking-[0.3em] uppercase block mb-4">{t('roomExplorer.configLabel')}</span>
                <h2 className="text-3xl font-bold font-headline text-white leading-tight">{t('roomExplorer.designSpace')}</h2>
                <p className="text-on-primary-container text-sm mt-4 leading-relaxed tracking-wide">{t('roomExplorer.ensureDetail')}</p>
              </div>
              <div className="relative z-10 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-tertiary-fixed text-sm">info</span>
                  </div>
                  <p className="text-xs text-on-primary-container font-medium leading-tight">{t('roomExplorer.autoPopulate')}</p>
                </div>
              </div>
              {/* Abstract Decorative Element */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
            </div>
            
            {/* Right Side: Form */}
            <div className="md:w-2/3 p-10 bg-surface-container-lowest overflow-y-auto">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold font-headline text-primary">{t('roomExplorer.addRoom')}</h3>
                <button onClick={() => setIsAddRoomModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>
              </div>
              <form className="space-y-6 font-body" onSubmit={handleCreateRoom}>
                {/* Basic Info Row */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.roomName')}</label>
                    <input 
                      value={newRoomData.name} 
                      onChange={(e) => setNewRoomData({...newRoomData, name: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white focus:ring-1 focus:ring-primary/10 shadow-sm transition-all outline-none text-sm" 
                      placeholder="e.g. Skyline Lounge" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.floorLevel')}</label>
                    <select 
                      value={newRoomData.floor_level}
                      onChange={(e) => setNewRoomData({...newRoomData, floor_level: e.target.value})}
                      className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white shadow-sm transition-all outline-none appearance-none cursor-pointer text-sm"
                    >
                      <option>Ground Floor</option>
                      <option>Executive (04)</option>
                      <option>Penthouse (12)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.locationDetail')}</label>
                  <input 
                    value={newRoomData.location} 
                    onChange={(e) => setNewRoomData({...newRoomData, location: e.target.value})}
                    className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white focus:ring-1 focus:ring-primary/10 shadow-sm transition-all outline-none text-sm" 
                    placeholder="e.g. West Wing, near elevator" 
                    type="text"
                  />
                </div>
                
                {/* Capacity & Hourly Rate */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.seatingCapacity')}</label>
                    <div className="flex items-center gap-4 bg-surface-container rounded-xl p-1 h-12">
                      <button 
                        onClick={() => setNewRoomData({...newRoomData, capacity: Math.max(1, newRoomData.capacity - 1)})}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-95 transition-all text-slate-500" type="button"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <input 
                        value={newRoomData.capacity}
                        onChange={(e) => setNewRoomData({...newRoomData, capacity: parseInt(e.target.value) || 0})}
                        className="flex-1 bg-transparent border-none text-center font-bold text-primary focus:ring-0 outline-none text-lg" 
                        type="number" 
                        min="1"
                      />
                      <button 
                        onClick={() => setNewRoomData({...newRoomData, capacity: newRoomData.capacity + 1})}
                        className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:scale-95 transition-all text-slate-500" type="button"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.hourlyRate')}</label>
                    <div className="flex items-center bg-surface-container rounded-xl p-1 h-12">
                      <span className="text-slate-400 ml-3 font-bold">Rp</span>
                      <input 
                        value={newRoomData.hourlyRate}
                        onChange={(e) => setNewRoomData({...newRoomData, hourlyRate: parseFloat(e.target.value) || 0})}
                        className="flex-1 bg-transparent border-none text-left font-bold text-primary focus:ring-0 outline-none text-lg w-full px-2" 
                        type="number" 
                        min="0"
                        step="10000"
                        placeholder="500000"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Facilities Checkboxes */}
                <div className="space-y-3">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.facilities')}</label>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map(amenity => (
                      <label key={amenity.id} className="group cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="hidden peer"
                          checked={newRoomData.facilities.includes(amenity.id)}
                          onChange={(e) => {
                            const current = newRoomData.facilities;
                            const isSelected = e.target.checked;
                            setNewRoomData({
                              ...newRoomData,
                              facilities: isSelected ? [...current, amenity.id] : current.filter(id => id !== amenity.id)
                            });
                          }}
                        />
                        <div className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-transparent bg-surface-container text-slate-600 font-medium text-sm transition-all peer-checked:bg-primary peer-checked:text-white peer-checked:border-primary/20 hover:scale-95">
                          <span className="material-symbols-outlined text-[18px]">{amenity.icon || 'star'}</span>
                          {amenity.name}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.houseRules')}</label>
                  <textarea 
                    value={newRoomData.rules.join('\n')} 
                    onChange={(e) => setNewRoomData({...newRoomData, rules: e.target.value.split('\n').filter(r => r.trim() !== '')})}
                    className="w-full bg-surface-container border-none rounded-xl px-4 py-3 text-on-surface focus:bg-white focus:ring-1 focus:ring-primary/10 shadow-sm transition-all outline-none text-sm min-h-[100px]" 
                    placeholder="e.g. Please clean up after use" 
                  />
                </div>
                
                {/* Image Uploader */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-1">{t('roomExplorer.roomPhotography')}</label>
                  <label className="border-2 border-dashed border-outline-variant/50 rounded-2xl p-8 flex flex-col items-center justify-center bg-surface-container-low/30 hover:bg-surface-container transition-colors group cursor-pointer relative overflow-hidden min-h-[160px]">
                    <input 
                      type="file" 
                      accept="image/*" 
                      multiple
                      className="hidden" 
                      onChange={(e) => {
                        const files = Array.from(e.target.files).slice(0, 5); // Limit to 5
                        if (files.length > 0) {
                          const previews = files.map(f => URL.createObjectURL(f));
                          setNewRoomData({
                            ...newRoomData,
                            imageFiles: [...newRoomData.imageFiles, ...files].slice(0, 5),
                            imagePreviews: [...newRoomData.imagePreviews, ...previews].slice(0, 5)
                          });
                        }
                      }}
                    />
                    
                    {newRoomData.imagePreviews && newRoomData.imagePreviews.length > 0 ? (
                      <div className="absolute inset-0 p-4 grid grid-cols-3 gap-2 overflow-y-auto bg-surface-container-low z-20" onClick={(e) => e.preventDefault()}>
                        {newRoomData.imagePreviews.map((preview, idx) => (
                          <div key={idx} className="relative h-24 rounded-lg overflow-hidden shadow-sm group/item">
                            <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                            <button 
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const newFiles = [...newRoomData.imageFiles];
                                const newPreviews = [...newRoomData.imagePreviews];
                                newFiles.splice(idx, 1);
                                newPreviews.splice(idx, 1);
                                setNewRoomData({...newRoomData, imageFiles: newFiles, imagePreviews: newPreviews});
                              }}
                              className="absolute top-1 right-1 bg-white/80 backdrop-blur text-error rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity"
                            >
                              <span className="material-symbols-outlined text-[14px]">close</span>
                            </button>
                          </div>
                        ))}
                        {newRoomData.imagePreviews.length < 5 && (
                          <label className="h-24 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center text-primary/50 hover:bg-primary/5 hover:text-primary transition-colors cursor-pointer">
                            <span className="material-symbols-outlined">add</span>
                          </label>
                        )}
                      </div>
                    ) : (
                      <div className="relative z-10 flex flex-col items-center pointer-events-none">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <span className="material-symbols-outlined text-primary">upload_file</span>
                        </div>
                        <p className="text-sm font-semibold text-primary">
                          <span className="text-secondary underline underline-offset-4">{t('roomExplorer.browse')}</span> {t('roomExplorer.orDropImages')}
                        </p>
                        <p className="text-[10px] text-slate-400 mt-2 font-medium">{t('roomExplorer.selectMultiple')}</p>
                      </div>
                    )}
                  </label>
                </div>
                
                {/* Form Actions */}
                <div className="flex items-center justify-end gap-4 pt-6">
                  <button onClick={() => setIsAddRoomModalOpen(false)} className="px-6 py-3 rounded-xl text-sm font-bold text-slate-500 hover:bg-surface-container transition-all" type="button">
                    {t('common.cancel')}
                  </button>
                  <button className="bg-gradient-to-br from-primary to-primary-container text-white px-10 py-3 rounded-xl text-sm font-bold shadow-[0_10px_25px_rgba(0,9,27,0.1)] hover:scale-[1.02] active:scale-95 transition-all" type="submit">
                    {t('roomExplorer.saveRoom')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {/* MODAL OVERLAY: Delete Confirmation */}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setDeleteConfirmation({ isOpen: false, roomId: null, roomName: '' })}></div>
          <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.1)] p-8 text-center border border-slate-100 transform transition-all duration-300 scale-100 opacity-100">
            <div className="w-20 h-20 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-error text-4xl">warning</span>
            </div>
            <h3 className="text-2xl font-bold font-headline text-slate-900 mb-2">{t('roomExplorer.deleteRoomTitle')}</h3>
            <p className="text-slate-500 mb-8 font-body">
              {t('roomExplorer.confirmDeleteMsg')} <strong className="text-slate-700">"{deleteConfirmation.roomName}"</strong>? {t('roomExplorer.thisAction')}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => setDeleteConfirmation({ isOpen: false, roomId: null, roomName: '' })} 
                className="flex-1 px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={executeDeleteRoom} 
                className="flex-1 bg-error hover:bg-error-container hover:text-on-error-container text-white px-6 py-4 rounded-xl font-bold shadow-lg shadow-error/30 hover:shadow-xl transition-all active:scale-95"
              >
                {t('roomExplorer.yesDelete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${toast.visible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-4 opacity-0 scale-95 pointer-events-none'}`}>
        <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.15)] border ${
          toast.type === 'success' ? 'bg-tertiary-container text-tertiary-fixed border-tertiary-fixed/20' : 
          toast.type === 'error' ? 'bg-error-container text-on-error-container border-error/20' : 
          'bg-white text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-white dark:border-slate-700'
        }`}>
          <span className="material-symbols-outlined text-[20px]">
            {toast.type === 'success' ? 'check_circle' : toast.type === 'error' ? 'error' : 'info'}
          </span>
          <p className="font-bold text-sm tracking-wide">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
